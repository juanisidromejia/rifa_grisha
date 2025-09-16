import { PrismaClient } from '@prisma/client';
export { renderers } from '../../renderers.mjs';

let prisma;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}
const POST = async ({ request }) => {
  try {
    const { email, token, raffleNumbers, cantidad } = await request.json();
    if (!email || !token || !raffleNumbers || !Array.isArray(raffleNumbers) || raffleNumbers.length !== Number(cantidad) / 2) {
      return new Response(JSON.stringify({ message: "Datos inválidos." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user || user.status !== "email_verified") {
      return new Response(
        JSON.stringify({ message: "Usuario no verificado o no encontrado." }),
        {
          status: 401,
          // Unauthorized
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    if (!token || !user.emailVerificationCode) {
      return new Response(JSON.stringify({ message: "Token inválido" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const validNumbers = [];
    for (const raffleNumber of raffleNumbers) {
      if (typeof raffleNumber !== "string" || !/^[0-9]{3}$/.test(raffleNumber)) {
        return new Response(
          JSON.stringify({ message: "Números de rifa inválidos." }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      const existingNumber = await prisma.user.findFirst({
        where: {
          raffleNumbers: { has: raffleNumber },
          NOT: { id: user.id }
          // Exclude current user from the check
        }
      });
      if (existingNumber) {
        return new Response(
          JSON.stringify({
            message: `El número ${raffleNumber} ya está asignado.`
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      validNumbers.push(raffleNumber);
    }
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        raffleNumbers: validNumbers
      }
    });
    return new Response(
      JSON.stringify({
        message: "Números de rifa guardados con éxito.",
        user: updatedUser,
        redirectTo: "/gracias-por-participar"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error al guardar los números de rifa:", error);
    return new Response(
      JSON.stringify({
        message: "Error interno del servidor al guardar los números de rifa."
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
