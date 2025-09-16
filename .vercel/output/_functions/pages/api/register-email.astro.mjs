import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
export { renderers } from '../../renderers.mjs';

const baseUrl = process.env.NODE_ENV === "production" ? `https://${process.env.VERCEL_URL}` : "http://localhost:4321";
const prerender = false;
const POST = async ({ request }) => {
  try {
    console.log("API called: register-email");
    console.log("Request method:", request.method);
    console.log("Request headers:", Object.fromEntries(request.headers.entries()));
    let prisma;
    try {
      if (!global.prisma) {
        global.prisma = new PrismaClient();
        console.log("Prisma client created");
      }
      prisma = global.prisma;
    } catch (dbError) {
      console.error("Error creating Prisma client:", dbError);
      return new Response(
        JSON.stringify({
          message: "Error de conexión a la base de datos. Inténtalo de nuevo más tarde."
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const { email } = await request.json();
    console.log("Email received:", email);
    if (!email) {
      return new Response(
        JSON.stringify({ message: "El correo electrónico es requerido." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    console.log("Environment check:");
    console.log("NODE_ENV:", process.env.NODE_ENV);
    console.log("GMAIL_APP_USER:", process.env.GMAIL_APP_USER ? "Set" : "Not set");
    console.log("GMAIL_APP_PASSWORD:", process.env.GMAIL_APP_PASSWORD ? "Set" : "Not set");
    console.log("PRISMA_DATABASE_URL:", process.env.PRISMA_DATABASE_URL ? "Set" : "Not set");
    console.log("VERCEL_URL:", process.env.VERCEL_URL);
    console.log("Checking for existing user...");
    let existingUser;
    try {
      existingUser = await prisma.user.findUnique({
        where: { email }
      });
      console.log("Existing user found:", !!existingUser);
    } catch (dbError) {
      console.error("Database error finding user:", dbError);
      return new Response(
        JSON.stringify({
          message: "Error de conexión a la base de datos. Inténtalo de nuevo más tarde."
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    if (existingUser && existingUser.status !== "email_pending_verification") {
      return new Response(
        JSON.stringify({
          message: "Este correo electrónico ya está registrado."
        }),
        {
          status: 409,
          // Conflict
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const verificationCode = Math.floor(
      1e5 + Math.random() * 9e5
    ).toString();
    const verificationExpires = new Date(Date.now() + 15 * 60 * 1e3);
    let user;
    try {
      if (existingUser && existingUser.status === "email_pending_verification") {
        user = await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            emailVerificationCode: verificationCode,
            emailVerificationExpires: verificationExpires,
            updatedAt: /* @__PURE__ */ new Date()
            // Actualizar la fecha de actualización
          }
        });
      } else {
        user = await prisma.user.create({
          data: {
            email,
            status: "email_pending_verification",
            // Establecer el estado inicial
            emailVerificationCode: verificationCode,
            emailVerificationExpires: verificationExpires
          }
        });
      }
      console.log("User created/updated:", user.id);
    } catch (dbError) {
      console.error("Database error creating/updating user:", dbError);
      return new Response(
        JSON.stringify({
          message: "Error al guardar el usuario. Inténtalo de nuevo más tarde."
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_APP_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });
    console.log("Transporter created");
    try {
      console.log("About to send email");
      const mailOptions = {
        from: process.env.GMAIL_APP_USER,
        // Remitente
        to: user.email,
        // Destinatario
        subject: "Rifa por Grisha: ¡Activa tu cuenta con este link!",
        html: `
          <p>Hola,</p>
          <p>Gracias por registrarte para la <strong>Rifa por Grisha</strong>.</p>
          <p>Para activar tu cuenta y proceder con tu participación, por favor haz clic en el siguiente enlace:</p>
          <p style="font-size: 1.1em; font-weight: bold;">
            <a href="${baseUrl}/verify-email?email=${encodeURIComponent(user.email)}&code=${verificationCode}" style="color: #007bff; text-decoration: none;">Activar mi cuenta ahora</a>
          </p>
          <p>Este enlace es válido por 15 minutos. Si el enlace no funciona, copia el enlace y pégalo en tu navegador.</p>
          <p>Si no te registraste para la rifa, por favor, ignora este correo.</p>
          <p>Atentamente,<br>El equipo de Rifa por Grisha</p>
        `
      };
      await transporter.sendMail(mailOptions);
      console.log(
        `Correo de verificación (con link de un solo clic) enviado a ${user.email}`
      );
    } catch (emailError) {
      console.error(`Error al enviar el correo a ${user.email}:`, emailError);
      return new Response(
        JSON.stringify({
          message: "Registro exitoso, pero hubo un problema al enviar el correo de activación. Por favor, intenta de nuevo o contáctanos."
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    return new Response(
      JSON.stringify({
        message: "¡Registro exitoso! Se ha enviado un link de activación a tu correo electrónico. Revisa tu bandeja de entrada y spam.",
        redirectTo: `/verify-email?email=${encodeURIComponent(user.email)}&code=${verificationCode}`
        // Sugiere redirigir para autoverificación
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error al registrar el correo:", error);
    if (error && typeof error === "object" && "code" in error && error.code === "P2002" && error.meta?.target?.includes("email")) {
      return new Response(
        JSON.stringify({
          message: "Este correo electrónico ya está registrado."
        }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    return new Response(
      JSON.stringify({
        message: "Error interno del servidor al procesar el registro."
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
