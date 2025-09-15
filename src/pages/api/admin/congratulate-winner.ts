import { PrismaClient } from "@prisma/client";
import type { APIContext } from "astro";
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

export const POST = async ({ request, cookies }: APIContext) => {
  try {
    // 1. Verify Admin Authentication
    const isAuthenticated = cookies.has("admin_session");
    if (!isAuthenticated) {
      return new Response(JSON.stringify({ message: "No autorizado." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2. Parse Request Body
    const { winningNumber, publicationLink } = await request.json();

    if (!winningNumber || !publicationLink) {
      return new Response(JSON.stringify({ message: "Número ganador y enlace requeridos." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 3. Extract the last three digits of the winning number
    const winningRaffleNumber = winningNumber.slice(-3).padStart(3, '0');

    // 4. Find the user with the matching raffle number
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
        headers: { "Content-Type": "application/json" },
      });
    }

    // 5. Build the Email Body
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
      `,
    };

    // 6. Send the email using Nodemailer
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_APP_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
      await transporter.sendMail(mailOptions);
      console.log(`Congratulations email sent to ${winner.email}`);
    } catch (emailError) {
      console.error(`Error sending email:`, emailError);
      return new Response(
        JSON.stringify({
          message: "Error al enviar el correo electrónico de felicitación.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({ message: "Ganador felicitado con éxito." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error congratulating winner:", error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};