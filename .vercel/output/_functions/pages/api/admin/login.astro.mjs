export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies }) => {
  try {
    const { username, password } = await request.json();
    const ADMIN_USER = "rifagrisha";
    const ADMIN_PASSWORD = "juntosayudaremos656";
    console.log("Received username:", username);
    console.log(
      "Received password (masked):",
      password ? "********" : "Undefined/Empty"
    );
    console.log("Expected ADMIN_USER:", ADMIN_USER);
    console.log(
      "Expected ADMIN_PASSWORD (masked):",
      ADMIN_PASSWORD ? "********" : "Undefined/Empty"
    );
    if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
      cookies.set("admin_session", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24
        // 1 day
      });
      return new Response(
        JSON.stringify({ success: true, message: "Inicio de sesión exitoso." }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" }
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Usuario o contraseña incorrectos."
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
  } catch (error) {
    console.error("Error en la autenticación del administrador:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error interno del servidor."
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
