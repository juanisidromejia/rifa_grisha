import { PrismaClient } from '@prisma/client';
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
const prerender = false;
const POST = async ({ request, cookies }) => {
  try {
    const isAuthenticated = cookies.has("admin_session");
    if (!isAuthenticated) {
      return new Response(JSON.stringify({ message: "No autorizado." }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { userId, cantidadRifas } = await request.json();
    if (!userId || !cantidadRifas || isNaN(Number(cantidadRifas)) || Number(cantidadRifas) <= 0) {
      return new Response(JSON.stringify({ message: "Datos inválidos." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
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
    const allRaffleNumbers = Array.from(
      { length: 999 },
      (_, i) => String(i + 1).padStart(3, "0")
    );
    const existingRaffleNumbers = (await prisma.user.findMany({
      where: { raffleNumbers: { not: { equals: [] } } },
      select: { raffleNumbers: true }
    })).flatMap((user2) => user2.raffleNumbers);
    const availableRaffleNumbers = allRaffleNumbers.filter(
      (number) => !existingRaffleNumbers.includes(number)
    );
    if (availableRaffleNumbers.length < cantidadRifas) {
      return new Response(
        JSON.stringify({
          message: "No hay suficientes números de rifa disponibles."
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const selectedRaffleNumbers = [];
    for (let i = 0; i < cantidadRifas; i++) {
      const randomIndex = Math.floor(
        Math.random() * availableRaffleNumbers.length
      );
      const selectedNumber = availableRaffleNumbers.splice(randomIndex, 1)[0];
      selectedRaffleNumbers.push(selectedNumber);
    }
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        raffleNumbers: selectedRaffleNumbers,
        status: "raffle_link_sent"
        // Updated to 'raffle_link_sent'
      }
    });
    const mailOptions = {
      from: process.env.GMAIL_APP_USER,
      to: user.email,
      subject: "¡Tus números de rifa!",
      html: `
            <p>¡Hola!</p>
            <p>Estos son tus números de rifa: <strong>${selectedRaffleNumbers.join(", ")}</strong></p>
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
      JSON.stringify({
        message: "Números de rifa enviados con éxito.",
        user: updatedUser
      }),
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
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
