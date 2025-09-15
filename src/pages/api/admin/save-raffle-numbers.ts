import { PrismaClient } from "@prisma/client";
import type { APIContext } from "astro";
import crypto from "crypto";

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

// Function to generate a unique token (replace with a more robust solution in production)
function generateToken(length = 32) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
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
    const { userId, cantidadRifas } = await request.json();

    if (
      !userId ||
      !cantidadRifas ||
      isNaN(Number(cantidadRifas)) ||
      Number(cantidadRifas) <= 0
    ) {
      return new Response(JSON.stringify({ message: "Datos inválidos." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 3. Fetch user data from DB
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.status !== "payment_confirmed") {
      return new Response(
        JSON.stringify({
          message: "Usuario no encontrado o pago no confirmado.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // 4. Generate Raffle Numbers
    const allRaffleNumbers = Array.from({ length: 999 }, (_, i) =>
      String(i + 1).padStart(3, "0"),
    );
    const existingRaffleNumbers = (
      await prisma.user.findMany({
        where: { raffleNumbers: { not: { equals: [] } } },
        select: { raffleNumbers: true },
      })
    ).flatMap((user) => user.raffleNumbers);
    const availableRaffleNumbers = allRaffleNumbers.filter(
      (number) => !existingRaffleNumbers.includes(number),
    );

    if (availableRaffleNumbers.length < cantidadRifas) {
      return new Response(
        JSON.stringify({
          message: "No hay suficientes números de rifa disponibles.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const selectedRaffleNumbers = [];
    for (let i = 0; i < cantidadRifas; i++) {
      const randomIndex = Math.floor(
        Math.random() * availableRaffleNumbers.length,
      );
      const selectedNumber = availableRaffleNumbers.splice(randomIndex, 1)[0];
      selectedRaffleNumbers.push(selectedNumber);
    }

    // 5. Update User with Raffle Numbers and Status
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        raffleNumbers: selectedRaffleNumbers,
        status: "raffle_link_sent", // Updated to 'raffle_link_sent'
      },
    });

    // 6. Build the Email Body
    const mailOptions = {
      from: process.env.GMAIL_APP_USER,
      to: user.email,
      subject: "¡Tus números de rifa!",
      html: `
            <p>¡Hola!</p>
            <p>Estos son tus números de rifa: <strong>${selectedRaffleNumbers.join(", ")}</strong></p>
            <p>¡Mucha suerte!</p>
            <p>Atentamente,<br>El equipo de Rifa Grisha</p>
            `,
    };

    // 7. Send the email using Nodemailer
    try {
      // Configure Nodemailer transporter (reuse the existing one)
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_APP_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
      await transporter.sendMail(mailOptions);
      console.log(`Email with raffle numbers sent to ${user.email}`);
    } catch (emailError) {
      console.error(`Error sending email:`, emailError);
      return new Response(
        JSON.stringify({
          message:
            "Error al enviar el correo electrónico con los números de rifa.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({
        message: "Números de rifa enviados con éxito.",
        user: updatedUser,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error al enviar las rifas:", error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
