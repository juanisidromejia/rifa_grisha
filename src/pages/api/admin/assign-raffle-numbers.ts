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

    const { userId, cantidadRifas } = await request.json();

    if (
      !userId ||
      !cantidadRifas ||
      isNaN(Number(cantidadRifas)) ||
      Number(cantidadRifas) <= 0 ||
      Number(cantidadRifas) % 2 !== 0
    ) {
      return new Response(JSON.stringify({ message: "Datos inválidos." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch user data
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.status !== "payment_confirmed") {
      return new Response(
        JSON.stringify({
          message: "Usuario no encontrado o pago no confirmado.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Generate a pool of available raffle numbers (001-999)
    const allRaffleNumbers = Array.from({ length: 999 }, (_, i) =>
      String(i + 1).padStart(3, "0"),
    );

    // Get the raffle numbers already assigned
    const existingRaffleNumbers = (
      await prisma.user.findMany({
        where: { raffleNumbers: { not: { equals: [] } } },
        select: { raffleNumbers: true },
      })
    ).flatMap((user) => user.raffleNumbers);

    // Filter out assigned numbers
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

    // Select random raffle numbers
    const selectedRaffleNumbers = [];
    for (let i = 0; i < cantidadRifas; i++) {
      const randomIndex = Math.floor(
        Math.random() * availableRaffleNumbers.length,
      );
      const selectedNumber = availableRaffleNumbers.splice(randomIndex, 1)[0]; // Remove selected number
      selectedRaffleNumbers.push(selectedNumber);
    }

    // Update the user with the selected raffle numbers and the status to raffle_numbers_assigned
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        raffleNumbers: selectedRaffleNumbers,
        status: "raffle_numbers_assigned",
      },
    });

    return new Response(
      JSON.stringify({
        message: "Números de rifa asignados con éxito.",
        user: updatedUser,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error al asignar números de rifa:", error);
    return new Response(
      JSON.stringify({
        message: "Error interno del servidor al asignar números de rifa.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
