export const POST = async ({ request, cookies }) => {
  try {
    const { username, password } = await request.json();

    const ADMIN_USER = import.meta.env.ADMIN_USER;
    const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD;

    // --- Debugging Logs (REMOVE BEFORE PRODUCTION) ---
    console.log("Received username:", username);
    console.log(
      "Received password (masked):",
      password ? "********" : "Undefined/Empty",
    );
    console.log("Expected ADMIN_USER:", ADMIN_USER);
    console.log(
      "Expected ADMIN_PASSWORD (masked):",
      ADMIN_PASSWORD ? "********" : "Undefined/Empty",
    );
    // --- End Debugging Logs ---

    if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
      // Set a simple session cookie
      cookies.set("admin_session", "true", {
        httpOnly: true,
        secure: import.meta.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });

      return new Response(
        JSON.stringify({ success: true, message: "Inicio de sesión exitoso." }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Usuario o contraseña incorrectos.",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } catch (error) {
    console.error("Error en la autenticación del administrador:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error interno del servidor.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
