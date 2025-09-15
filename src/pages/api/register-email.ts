import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// Determine the base URL dynamically
const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:4321"; // Default Astro dev server port

// Configurar el transporter de Nodemailer con credenciales de Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_APP_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const POST = async ({ request }) => {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(
        JSON.stringify({ message: "El correo electrónico es requerido." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Comprobar si el correo ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser && existingUser.status !== "email_pending_verification") {
      // Si el usuario ya existe y no está pendiente de verificación (ya verificado, pagado, etc.)
      return new Response(
        JSON.stringify({
          message: "Este correo electrónico ya está registrado.",
        }),
        {
          status: 409, // Conflict
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Generar código de verificación de 6 dígitos
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    // Establecer expiración (ej. 15 minutos desde ahora)
    const verificationExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos en milisegundos

    let user;
    if (existingUser && existingUser.status === "email_pending_verification") {
      // Si el usuario existe y está pendiente de verificación, actualizarlo con el nuevo código y expiración
      user = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          emailVerificationCode: verificationCode,
          emailVerificationExpires: verificationExpires,
          updatedAt: new Date(), // Actualizar la fecha de actualización
        },
      });
    } else {
      // Si el usuario no existe, crear uno nuevo
      user = await prisma.user.create({
        data: {
          email: email,
          status: "email_pending_verification", // Establecer el estado inicial
          emailVerificationCode: verificationCode,
          emailVerificationExpires: verificationExpires,
        },
      });
    }

    // --- Enviar correo electrónico de verificación (LINK DE UN SOLO CLIC) ---
    const mailOptions = {
      from: process.env.GMAIL_APP_USER, // Remitente
      to: user.email, // Destinatario
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
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(
        `Correo de verificación (con link de un solo clic) enviado a ${user.email}`,
      );
    } catch (emailError) {
      console.error(`Error al enviar el correo a ${user.email}:`, emailError);
      return new Response(
        JSON.stringify({
          message:
            "Registro exitoso, pero hubo un problema al enviar el correo de activación. Por favor, intenta de nuevo o contáctanos.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    // --- Fin de envío de correo electrónico ---

    return new Response(
      JSON.stringify({
        message:
          "¡Registro exitoso! Se ha enviado un link de activación a tu correo electrónico. Revisa tu bandeja de entrada y spam.",
        redirectTo: `/verify-email?email=${encodeURIComponent(user.email)}&code=${verificationCode}`, // Sugiere redirigir para autoverificación
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    // Manejo de errores específicos de Prisma y otros
    console.error("Error al registrar el correo:", error);
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return new Response(
        JSON.stringify({
          message: "Este correo electrónico ya está registrado.",
        }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    return new Response(
      JSON.stringify({
        message: "Error interno del servidor al procesar el registro.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
