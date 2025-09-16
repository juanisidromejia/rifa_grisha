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
    const { email, code } = await request.json();
    if (!email || !code) {
      return new Response(
        JSON.stringify({
          message: "Correo electrónico y código son requeridos."
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Usuario no encontrado." }),
        {
          status: 404,
          // Not Found
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    if (user.emailVerificationCode !== code || !user.emailVerificationExpires || user.emailVerificationExpires < /* @__PURE__ */ new Date()) {
      return new Response(
        JSON.stringify({
          message: "Código de verificación incorrecto o expirado."
        }),
        {
          status: 401,
          // Unauthorized
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    await prisma.user.update({
      where: { id: user.id },
      data: {
        status: "email_verified",
        emailVerificationCode: null,
        // Limpiar el código después de usarlo
        emailVerificationExpires: null,
        // Limpiar la expiración
        updatedAt: /* @__PURE__ */ new Date()
      }
    });
    return new Response(
      JSON.stringify({
        message: "¡Correo verificado con éxito! Ahora puedes proceder con el pago.",
        redirectTo: `/payment-instructions?email=${encodeURIComponent(user.email)}`
        // Pass email to payment-instructions page
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error al verificar el correo:", error);
    return new Response(
      JSON.stringify({
        message: "Error interno del servidor al verificar el correo."
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
