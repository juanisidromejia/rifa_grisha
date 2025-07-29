import { PrismaClient } from "@prisma/client";

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

export const POST = async ({ request }) => {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return new Response(
        JSON.stringify({
          message: "Correo electrónico y código son requeridos.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Buscar al usuario por correo electrónico
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Usuario no encontrado." }),
        {
          status: 404, // Not Found
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Verificar el código y la expiración
    if (
      user.emailVerificationCode !== code ||
      !user.emailVerificationExpires ||
      user.emailVerificationExpires < new Date()
    ) {
      return new Response(
        JSON.stringify({
          message: "Código de verificación incorrecto o expirado.",
        }),
        {
          status: 401, // Unauthorized
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Si todo es válido, actualizar el estado del usuario a verificado
    await prisma.user.update({
      where: { id: user.id },
      data: {
        status: "email_verified",
        emailVerificationCode: null, // Limpiar el código después de usarlo
        emailVerificationExpires: null, // Limpiar la expiración
        updatedAt: new Date(),
      },
    });

    return new Response(
      JSON.stringify({
        message:
          "¡Correo verificado con éxito! Ahora puedes proceder con el pago.",
        redirectTo: `/payment-instructions?email=${encodeURIComponent(user.email)}`, // Pass email to payment-instructions page
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error al verificar el correo:", error);
    return new Response(
      JSON.stringify({
        message: "Error interno del servidor al verificar el correo.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
