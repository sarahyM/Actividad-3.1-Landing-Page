import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import nodemailer from "nodemailer";

// Configurar el transporter de Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tipo, destinatarios, asunto, contenido } = body;

    const db = await getDatabase();

    // Guardar la notificación en la base de datos
    await db.collection("notificaciones").insertOne({
      tipo,
      destinatarios,
      asunto,
      contenido,
      fechaEnvio: new Date(),
      estado: "enviado",
    });

    // Enviar el correo
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: destinatarios,
      subject: asunto,
      html: contenido,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Notificación enviada exitosamente");
    } catch (error) {
      console.error("Error al enviar la notificación:", error);
      return NextResponse.json(
        { error: "Error al enviar la notificación" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Notificación enviada exitosamente",
    });
  } catch (error) {
    console.error("Error al enviar notificación:", error);
    return NextResponse.json(
      { error: "Error al enviar notificación" },
      { status: 500 }
    );
  }
}

// Obtener notificaciones pendientes
export async function GET() {
  try {
    const db = await getDatabase();

    const notificaciones = await db
      .collection("notificaciones")
      .find({ estado: "pendiente" })
      .toArray();

    return NextResponse.json(notificaciones);
  } catch (error) {
    console.error("Error al obtener notificaciones:", error);
    return NextResponse.json(
      { error: "Error al obtener notificaciones" },
      { status: 500 }
    );
  }
}
