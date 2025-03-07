import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
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
    const { nombre, email, checkIn, checkOut, huespedes, tipoHabitacion } =
      body;

    // Conectar a la base de datos
    await connectToDatabase();

    // Crear la reserva directamente usando Mongoose
    // Importamos el modelo de Reserva
    const { Reservation } = await import("@/lib/models/reservas");

    const newReservation = new Reservation({
      fullName: nombre,
      email,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests: Number(huespedes),
      roomType: tipoHabitacion,
      status: "pending",
      createdAt: new Date(),
    });

    await newReservation.save();

    // Enviar correo de confirmación si están configuradas las variables de entorno
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      try {
        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: email,
          subject: "Confirmación de Reserva - Margarita Resort",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
              <h1 style="color: #2A9D8F;">Margarita Resort</h1>
              <h2>¡Gracias por tu reserva, ${nombre}!</h2>
              <p>Nos complace confirmar tu reserva en Margarita Resort.</p>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <p><strong>Número de reserva:</strong> ${newReservation._id}</p>
                <p><strong>Fecha de llegada:</strong> ${new Date(
                  checkIn
                ).toLocaleDateString()}</p>
                <p><strong>Fecha de salida:</strong> ${new Date(
                  checkOut
                ).toLocaleDateString()}</p>
                <p><strong>Tipo de habitación:</strong> ${tipoHabitacion}</p>
                <p><strong>Número de huéspedes:</strong> ${huespedes}</p>
                <p><strong>Monto total:</strong> $${calcularMontoTotal(
                  tipoHabitacion,
                  checkIn,
                  checkOut
                )}</p>
              </div>
              <p>¡Esperamos darte la bienvenida pronto!</p>
              <p>Atentamente,<br>El equipo de Margarita Resort</p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log("Correo enviado exitosamente");
      } catch (emailError) {
        console.error("Error al enviar el correo:", emailError);
        // Continuamos aunque falle el envío del correo
      }
    }

    return NextResponse.json({
      message: "Reserva creada exitosamente",
      reservaId: newReservation._id,
    });
  } catch (error) {
    console.error("Error de reserva:", error);
    return NextResponse.json(
      { error: "Error al crear la reserva" },
      { status: 500 }
    );
  }
}

// Función simple para calcular el monto total
function calcularMontoTotal(
  tipo: string,
  checkIn: string,
  checkOut: string
): number {
  const precios: Record<string, number> = {
    estandar: 100,
    deluxe: 150,
    suite: 250,
    presidencial: 500,
  };
  const precioBase = precios[tipo] || 100;
  const dias = Math.max(
    1,
    Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );
  return precioBase * dias;
}
