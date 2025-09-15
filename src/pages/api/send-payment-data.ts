import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

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

// Configurar el transporter de Nodemailer con credenciales de Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_APP_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Función para convertir imagen a base64
function imageToBase64(imagePath: string): string {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    return imageBuffer.toString('base64');
  } catch (error) {
    console.error(`Error reading image ${imagePath}:`, error);
    return '';
  }
}

export const POST = async ({ request }) => {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(
        JSON.stringify({ message: "El correo electrónico es requerido." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Verificar que el usuario existe
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Usuario no encontrado." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Convertir imágenes QR a base64
    const publicPath = path.join(process.cwd(), 'public', 'img');
    const deunaQR = imageToBase64(path.join(publicPath, 'deuna.jpeg'));
    const peigoQR = imageToBase64(path.join(publicPath, 'peigo.jpeg'));
    const payphoneQR = imageToBase64(path.join(publicPath, 'payphone.jpeg'));

    // Enviar correo electrónico con datos de pago
    const mailOptions = {
      from: process.env.GMAIL_APP_USER,
      to: user.email,
      subject: "Datos de Pago - Rifa por Grisha",
      html: `
        <p>Hola,</p>
        <p>Aquí tienes los datos de pago para participar en la <strong>Rifa por Grisha</strong>:</p>

        <h3>Opciones de Pago:</h3>
        <ul>
          <li><strong>Banco Pichincha (Ahorros):</strong><br>
            Cuenta No.: 2201988107<br>
            A nombre de: Juan Isidro Mejía<br>
            C.I.: 0919315218<br>
            Email: juanisidromejia@gmail.com
          </li>
          <li><strong>Banco Produbanco (Ahorros):</strong><br>
            Cuenta No.: 12179042454<br>
            A nombre de: Nadiia Pavliuk<br>
            C.I.: 0952061414<br>
            Email: juanisidromejia@gmail.com
          </li>
          <li><strong>Banco Guayaquil (Ahorros):</strong><br>
            Cuenta No.: 0132383827<br>
            A nombre de: Juan Isidro Mejia Peña<br>
            C.I.: 0919315218<br>
            Email: juanisidromejia@gmail.com
          </li>
          <li><strong>PayPal:</strong><br>
            Enlace: <a href="https://paypal.me/juanisidroguitar">https://paypal.me/juanisidroguitar</a>
          </li>
          <li><strong>PayPhone:</strong><br>
            Link de Pago: <a href="https://ppls.me/Iz6DkdH4Zb7AdhE74Te6NA">https://ppls.me/Iz6DkdH4Zb7AdhE74Te6NA</a><br>
          </li>
          <li><strong>Deuna:</strong> Escanea el código QR en la página de instrucciones</li>
          <li><strong>Peigo:</strong> Escanea el código QR en la página de instrucciones</li>
        </ul>

        <p>Una vez realizado el pago, por favor envía el comprobante por WhatsApp:</p>
        <p style="font-size: 1.1em; font-weight: bold;">
          <a href="https://wa.me/+593981985015?text=Hola!%20Ya%20realic%C3%A9%20el%20pago%20para%20la%20rifa,%20ahora%20enviar%C3%A9%20el%20comprobante.%20Mi%20correo%20es%20${encodeURIComponent(user.email)}" style="color: #25d366; text-decoration: none; background-color: #25d366; color: white; padding: 10px 20px; border-radius: 5px; display: inline-block;">Enviar Comprobante por WhatsApp</a>
        </p>

        <p>Si necesitas más información, puedes volver a la página de instrucciones de pago:</p>
        <p style="font-size: 1.1em; font-weight: bold;">
          <a href="${process.env.NODE_ENV === "production" ? `https://${process.env.VERCEL_URL}` : "http://localhost:4321"}/payment-instructions?email=${encodeURIComponent(user.email)}" style="color: #007bff; text-decoration: none; background-color: #007bff; color: white; padding: 10px 20px; border-radius: 5px; display: inline-block;">Ver Instrucciones de Pago</a>
        </p>

        <p>¡Gracias por participar!</p>
        <p>Atentamente,<br>El equipo de Rifa por Grisha</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Datos de pago enviados a ${user.email}`);
    } catch (emailError) {
      console.error(`Error al enviar el correo a ${user.email}:`, emailError);
      return new Response(
        JSON.stringify({
          message: "Error al enviar el correo con los datos de pago.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({
        message: "Datos de pago enviados exitosamente.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error al enviar datos de pago:", error);
    return new Response(
      JSON.stringify({
        message: "Error interno del servidor.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};