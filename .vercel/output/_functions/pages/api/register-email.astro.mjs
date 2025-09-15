import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
export { renderers } from '../../renderers.mjs';

if (process.env.NODE_ENV === "production") {
  new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
}
process.env.NODE_ENV === "production" ? `https://${process.env.VERCEL_URL}` : "http://localhost:4321";
nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_APP_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});
const prerender = false;
const POST = async ({ request }) => {
  try {
    console.log("API called: register-email");
    const { email } = await request.json();
    console.log("Email received:", email);
    if (!email) {
      return new Response(
        JSON.stringify({ message: "El correo electrónico es requerido." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    console.log("Environment check:");
    console.log("NODE_ENV:", process.env.NODE_ENV);
    console.log("GMAIL_APP_USER:", process.env.GMAIL_APP_USER ? "Set" : "Not set");
    console.log("GMAIL_APP_PASSWORD:", process.env.GMAIL_APP_PASSWORD ? "Set" : "Not set");
    console.log("Skipping database and email operations for testing...");
    const verificationCode = "TEST123";
    return new Response(
      JSON.stringify({
        message: "¡Registro exitoso! Se ha enviado un link de activación a tu correo electrónico. Revisa tu bandeja de entrada y spam.",
        redirectTo: `/verify-email?email=${encodeURIComponent(email)}&code=${verificationCode}`
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error al registrar el correo:", error);
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return new Response(
        JSON.stringify({
          message: "Este correo electrónico ya está registrado."
        }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    return new Response(
      JSON.stringify({
        message: "Error interno del servidor al procesar el registro."
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
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
