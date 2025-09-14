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

export const POST = async ({ request }: APIContext) => {
  try {
    const { email, token, raffleNumbers, cantidad } = await request.json();
    // TODO: Change to import the `APIContext`
    if (
      !email ||
      !token ||
      !raffleNumbers ||
      !Array.isArray(raffleNumbers) ||
      raffleNumbers.length !== Number(cantidad) / 2
    ) {
      return new Response(JSON.stringify({ message: "Datos inválidos." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate the user
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user || user.status !== "email_verified") {
      return new Response(
        JSON.stringify({ message: "Usuario no verificado o no encontrado." }),
        {
          status: 401, // Unauthorized
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    // Validate the token (VERY IMPORTANT: Replace with your actual token validation)
    if (!token || !user.emailVerificationCode) {
      return new Response(JSON.stringify({ message: "Token inválido" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Ensure all raffle numbers are valid, and are not already assigned to others
    const validNumbers = [];
    for (const raffleNumber of raffleNumbers) {
      if (
        typeof raffleNumber !== "string" ||
        !/^[0-9]{3}$/.test(raffleNumber)
      ) {
        return new Response(
          JSON.stringify({ message: "Números de rifa inválidos." }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      // Check if the number is already taken by other users.
      const existingNumber = await prisma.user.findFirst({
        where: {
          raffleNumbers: { has: raffleNumber },
          NOT: { id: user.id }, // Exclude current user from the check
        },
      });
      if (existingNumber) {
        return new Response(
          JSON.stringify({
            message: `El número ${raffleNumber} ya está asignado.`,
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      validNumbers.push(raffleNumber);
    }

    // Update the user with the raffle numbers
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        raffleNumbers: validNumbers,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Números de rifa guardados con éxito.",
        user: updatedUser,
        redirectTo: "/gracias-por-participar",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error al guardar los números de rifa:", error);
    return new Response(
      JSON.stringify({
        message: "Error interno del servidor al guardar los números de rifa.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
