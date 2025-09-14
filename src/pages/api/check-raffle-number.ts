import { PrismaClient } from "@prisma/client";
import type { APIContext } from "astro";

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

export const POST = async ({ request }: APIContext) => {
  try {
    const { raffleNumber } = await request.json();

    if (
      !raffleNumber ||
      isNaN(Number(raffleNumber)) ||
      Number(raffleNumber) < 1 ||
      Number(raffleNumber) > 999
    ) {
      return new Response(
        JSON.stringify({ message: "Número de rifa inválido." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const numberString = String(raffleNumber).padStart(3, "0"); // Format to 3 digits

    // Check if the number is already taken
    const user = await prisma.user.findFirst({
      where: {
        raffleNumbers: { has: numberString },
      },
    });

    const isAvailable = !user;

    return new Response(JSON.stringify({ available: isAvailable }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al verificar el número de rifa:", error);
    return new Response(
      JSON.stringify({
        message: "Error interno del servidor al verificar el número de rifa.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
