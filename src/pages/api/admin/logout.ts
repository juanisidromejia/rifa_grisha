import type { APIContext } from "astro";

export const POST = async ({ cookies }: APIContext) => {
  try {
    cookies.delete("admin_session", {
      path: "/", // Ensure the path matches where the cookie was set
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Sesión cerrada exitosamente.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error interno del servidor al cerrar sesión.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
