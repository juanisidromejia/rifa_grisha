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
    if (!userId || !cantidadRifas || isNaN(Number(cantidadRifas)) || Number(cantidadRifas) <= 0 || Number(cantidadRifas) % 2 !== 0) {
      return new Response(JSON.stringify({ message: "Datos inválidos." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.status !== "payment_confirmed") {
      return new Response(
        JSON.stringify({
          message: "Usuario no encontrado o pago no confirmado."
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
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
        status: "raffle_numbers_assigned"
      }
    });
    return new Response(
      JSON.stringify({
        message: "Números de rifa asignados con éxito.",
        user: updatedUser
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error al asignar números de rifa:", error);
    return new Response(
      JSON.stringify({
        message: "Error interno del servidor al asignar números de rifa."
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
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
