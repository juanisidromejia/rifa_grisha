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
const GET = async ({ request, cookies }) => {
  try {
    const isAuthenticated = cookies.has("admin_session");
    if (!isAuthenticated) {
      return new Response(JSON.stringify({ message: "No autorizado." }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "asc"
        // Order by creation date
      },
      select: {
        id: true,
        email: true,
        status: true,
        raffleNumbers: true,
        createdAt: true
      }
      // Select only the necessary fields
    });
    console.log("Fetched users for admin panel:", users);
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error(
      "Error al obtener usuarios para el panel de administración:",
      error
    );
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
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
