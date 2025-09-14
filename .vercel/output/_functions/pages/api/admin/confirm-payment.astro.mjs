import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
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
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Usuario no encontrado." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const cantidadRifas = 2;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        status: "payment_confirmed",
        updatedAt: /* @__PURE__ */ new Date()
      }
    });
    const token = generateToken();
    const raffleLink = `${process.env.NODE_ENV === "production" ? "https://" + process.env.VERCEL_URL : "http://localhost:4321"}/seleccionar-rifas?email=${encodeURIComponent(user.email)}&cantidad=${cantidadRifas}&token=${token}`;
    return new Response(
      JSON.stringify({
        message: "Pago confirmado con éxito.  Genera el enlace de rifas.",
        user: updatedUser,
        // Return updated user data
        raffleLink
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error al confirmar el pago:", error);
    return new Response(
      JSON.stringify({
        message: "Error interno del servidor al confirmar el pago."
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
