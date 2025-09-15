export const prerender = false;

export const POST = async ({ request }) => {
  try {
    console.log("Test API called successfully");

    const { message } = await request.json();
    console.log("Received message:", message);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Test API working!",
        received: message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Test API error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};

export const GET = async () => {
  console.log("Test GET API called");

  return new Response(
    JSON.stringify({
      success: true,
      message: "Test GET API working!",
      timestamp: new Date().toISOString()
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
};