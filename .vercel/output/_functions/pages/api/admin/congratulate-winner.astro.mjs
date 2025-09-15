import { PrismaClient } from '@prisma/client';
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
const POST = async ({ request, cookies }) => {
  try {
    const isAuthenticated = cookies.has("admin_session");
    if (!isAuthenticated) {
      return new Response(JSON.stringify({ message: "No autorizado." }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { winningNumber, publicationLink } = await request.json();
    if (!winningNumber || !publicationLink) {
      return new Response(JSON.stringify({ message: "Número ganador y enlace requeridos." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const winningRaffleNumber = winningNumber.slice(-3).padStart(3, "0");
    const winner = await prisma.user.findFirst({
      where: {
        raffleNumbers: {
          has: winningRaffleNumber
        }
      }
    });
    if (!winner) {
      return new Response(JSON.stringify({ message: "No se encontró un ganador con ese número." }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    const mailOptions = {
      from: process.env.GMAIL_APP_USER,
      to: winner.email,
      subject: "¡Felicidades! Has ganado la rifa!",
      html: `
        <p>¡Felicidades ${winner.email}!</p>
        <p>Tu número de rifa <strong>${winningRaffleNumber}</strong> coincide con los últimos tres dígitos del boleto ganador de la Lotería Nacional: <strong>${winningNumber}</strong></p>
        <p>Puedes verificar el resultado en: <a href="${publicationLink}">${publicationLink}</a></p>
        <p>¡Enhorabuena!</p>
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
      console.log(`Congratulations email sent to ${winner.email}`);
    } catch (emailError) {
      console.error(`Error sending email:`, emailError);
      return new Response(
        JSON.stringify({
          message: "Error al enviar el correo electrónico de felicitación."
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    return new Response(
      JSON.stringify({ message: "Ganador felicitado con éxito." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error congratulating winner:", error);
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
