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
    const { nombre, email, checkIn, checkOut, huespedes, tipoHabitacion } =
      body;

    const db = await getDatabase();

    // Validar disponibilidad
    const habitacionesOcupadas = await db
      .collection("reservas")
      .countDocuments({
        tipoHabitacion,
        $or: [
          {
            checkIn: { $lte: new Date(checkOut) },
            checkOut: { $gte: new Date(checkIn) },
          },
        ],
        status: { $ne: "cancelada" },
      });

    if (habitacionesOcupadas >= getMaxHabitacionesPorTipo(tipoHabitacion)) {
      return NextResponse.json(
        { error: "No hay disponibilidad para las fechas seleccionadas" },
        { status: 400 }
      );
    }

    // Crear la reserva
    const reserva = await db.collection("reservas").insertOne({
      nombre,
      email,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      huespedes,
      tipoHabitacion,
      createdAt: new Date(),
      status: "pendiente",
      metodoPago: null,
      montoTotal: calcularMontoTotal(tipoHabitacion, checkIn, checkOut),
      confirmacionPago: false,
    });

    // Enviar correo de confirmación
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Confirmación de Reserva - Margarita Resort",
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmación de Reserva - Margarita Resort</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            h1, h2 {
              color: #2A9D8F;
            }
            .header {
              background-color: #2A9D8F;
              color: #ffffff;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .info {
              background-color: #F5F0E8;
              padding: 15px;
              border-radius: 5px;
              margin-bottom: 20px;
            }
            .info p {
              margin: 5px 0;
            }
            .cta-button {
              display: inline-block;
              background-color:rgb(134, 200, 192);
              color: white;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              color: #777;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Margarita Resort</h1>
            </div>
            <h2>¡Gracias por tu reserva, ${nombre}!</h2>
            <p>Nos complace confirmar tu reserva en Margarita Resort. A continuación, encontrarás los detalles de tu reserva:</p>
            <div class="info">
              <p><strong>Número de reserva:</strong> ${reserva.insertedId}</p>
              <p><strong>Fecha de llegada:</strong> ${formatDate(checkIn)}</p>
              <p><strong>Fecha de salida:</strong> ${formatDate(checkOut)}</p>
              <p><strong>Tipo de habitación:</strong> ${getTipoHabitacionNombre(
                tipoHabitacion
              )}</p>
              <p><strong>Número de huéspedes:</strong> ${huespedes}</p>
              <p><strong>Monto total:</strong> ${formatCurrency(
                calcularMontoTotal(tipoHabitacion, checkIn, checkOut)
              )}</p>
            </div>
            <h3>Próximos pasos:</h3>
            <ol>
              <li>Realizar el pago del 50% del monto total para confirmar tu reserva</li>
              <li>Enviar el comprobante de pago a pagos@margaritaresort.com</li>
              <li>Recibirás un correo de confirmación una vez verificado el pago</li>
            </ol>
            <p><strong>Datos bancarios para el pago:</strong></p>
            <ul>
              <li>Banco: Banco de Venezuela</li>
              <li>Titular: Margarita Resort C.A.</li>
              <li>Cuenta: 0102-0123-45-6789012345</li>
              <li>RIF: J-12345678-9</li>
            </ul>
            <p>Si tienes alguna pregunta, no dudes en contactarnos:</p>
            <ul>
              <li>Teléfono: +58 295 123 4567</li>
              <li>WhatsApp: +58 424 123 4567</li>
              <li>Email: reservas@margaritaresort.com</li>
            </ul>
            <p>¡Esperamos darte la bienvenida pronto!</p>
            <a href="http://localhost:3000/" class="cta-button">Visita nuestro sitio web</a>
            <div class="footer">
              <p>Atentamente,<br>El equipo de Margarita Resort</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Correo enviado exitosamente");
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      return NextResponse.json(
        { error: "Error al enviar el correo de confirmación" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Reserva creada exitosamente",
      reservaId: reserva.insertedId,
      emailSent: true,
    });
  } catch (error) {
    console.error("Error de reserva:", error);
    return NextResponse.json(
      { error: "Error al crear la reserva" },
      { status: 500 }
    );
  }
}

// Funciones auxiliares (sin cambios)
function getMaxHabitacionesPorTipo(tipo: string): number {
  const limites = {
    estandar: 20,
    deluxe: 15,
    suite: 10,
    presidencial: 2,
  };
  return limites[tipo as keyof typeof limites] || 0;
}

function getTipoHabitacionNombre(tipo: string): string {
  const nombres = {
    estandar: "Habitación Estándar",
    deluxe: "Habitación Deluxe",
    suite: "Suite Vista al Mar",
    presidencial: "Suite Presidencial",
  };
  return nombres[tipo as keyof typeof nombres] || tipo;
}

function calcularMontoTotal(
  tipo: string,
  checkIn: string,
  checkOut: string
): number {
  const precios = {
    estandar: 100,
    deluxe: 150,
    suite: 250,
    presidencial: 500,
  };
  const precioBase = precios[tipo as keyof typeof precios] || 0;
  const dias = Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return precioBase * dias;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("es-VE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-VE", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
