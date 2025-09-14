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
    // Verificar autenticación del administrador
    const isAuthenticated = cookies.has("admin_session");
    if (!isAuthenticated) {
      return new Response(JSON.stringify({ message: "No autorizado." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { userId } = await request.json();

    if (!userId) {
      return new Response(
        JSON.stringify({ message: "ID de usuario requerido." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Obtener al usuario para acceder al correo y a la cantidad de rifas (por ejemplo, desde un campo en la base de datos)
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Usuario no encontrado." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    // Supongamos que la cantidad de rifas está relacionada con el estado o un campo específico.
    //  Este ejemplo no incluye la cantidad, pero necesitas obtenerla de la base de datos o de otra fuente.
    const cantidadRifas = 2; // Reemplaza con la lógica correcta

    // Actualizar el estado del usuario a payment_confirmed
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        status: "payment_confirmed",
        updatedAt: new Date(),
      },
    });

    // Generar el enlace único (con email, cantidad y token)
    const token = generateToken(); // Genera un token único
    const raffleLink = `${process.env.NODE_ENV === "production" ? "https://" + process.env.VERCEL_URL : "http://localhost:4321"}/seleccionar-rifas?email=${encodeURIComponent(user.email)}&cantidad=${cantidadRifas}&token=${token}`;

    return new Response(
      JSON.stringify({
        message: "Pago confirmado con éxito.  Genera el enlace de rifas.",
        user: updatedUser, // Return updated user data
        raffleLink: raffleLink,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error al confirmar el pago:", error);
    return new Response(
      JSON.stringify({
        message: "Error interno del servidor al confirmar el pago.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
