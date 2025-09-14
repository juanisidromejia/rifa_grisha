import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
export { renderers } from '../../../renderers.mjs';

let prisma;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}
function generateToken(length = 32) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length);
}
const POST = async ({ request, cookies }) => {
  try {
    const isAuthenticated = cookies.has("admin_session");
    if (!isAuthenticated) {
      return new Response(JSON.stringify({ message: "No autorizado." }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { userId } = await request.json();
    if (!userId) {
      return new Response(
        JSON.stringify({ message: "ID de usuario requerido." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    if (!user || user.status !== "payment_confirmed") {
      return new Response(
        JSON.stringify({
          message: "Usuario no encontrado o pago no confirmado."
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const cantidadRifas = 2;
    const token = generateToken();
    const raffleLink = `${process.env.NODE_ENV === "production" ? "https://" + process.env.VERCEL_URL : "http://localhost:4321"}/seleccionar-rifas?email=${encodeURIComponent(user.email)}&cantidad=${cantidadRifas}&token=${token}`;
    const mailOptions = {
      from: process.env.GMAIL_APP_USER,
      to: user.email,
      subject: "¡Tus números de rifa!",
      html: `
            <p>¡Hola!</p>
            <p>Estos son tus números de rifa: <strong>${user.raffleNumbers.join(", ")}</strong></p>
            <p>Para seleccionar tus números de rifa, haz clic en este enlace:</p>
            <p><a href="${raffleLink}">Seleccionar Rifas</a></p>
            <p>¡Mucha suerte!</p>
            <p>Atentamente,<br>El equipo de Rifa Grisha</p>
            `
    };
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_APP_USER,
          pass: process.env.GMAIL_APP_PASSWORD
        }
      });
      await transporter.sendMail(mailOptions);
      console.log(`Email with raffle numbers sent to ${user.email}`);
    } catch (emailError) {
      console.error(`Error sending email:`, emailError);
      return new Response(
        JSON.stringify({
          message: "Error al enviar el correo electrónico con los números de rifa."
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    return new Response(
      JSON.stringify({ message: "Números de rifa enviados con éxito." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error al enviar las rifas:", error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
