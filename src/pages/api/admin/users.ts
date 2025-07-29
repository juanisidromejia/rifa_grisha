import { PrismaClient } from "@prisma/client";
import type { APIContext } from "astro"; // Import APIContext for type hinting

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

export const GET = async ({ request, cookies }: APIContext) => {
  try {
    // Verificar autenticación del administrador
    const isAuthenticated = cookies.has("admin_session");
    if (!isAuthenticated) {
      return new Response(JSON.stringify({ message: "No autorizado." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "asc", // Order by creation date
      },
      select: {
        id: true,
        email: true,
        status: true,
        raffleNumbers: true,
        createdAt: true,
      }, // Select only the necessary fields
    });

    // --- Debugging Log (REMOVE BEFORE PRODUCTION) ---
    console.log("Fetched users for admin panel:", users);
    // --- End Debugging Log ---

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(
      "Error al obtener usuarios para el panel de administración:",
      error,
    );
    return new Response(
      JSON.stringify({ message: "Error interno del servidor." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
