import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, checkIn, checkOut, guests, roomType } = body

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("margarita-resort")

    // Save booking to database
    const booking = await db.collection("bookings").insertOne({
      name,
      email,
      checkIn,
      checkOut,
      guests,
      roomType,
      createdAt: new Date(),
      status: "pending",
    })

    // Send confirmation email
    await resend.emails.send({
      from: "Margarita Resort <reservations@margaritaresort.com>",
      to: email,
      subject: "Booking Confirmation - Margarita Resort",
      html: `
        <h1>Thank you for your reservation!</h1>
        <p>Dear ${name},</p>
        <p>We are pleased to confirm your booking at Margarita Resort:</p>
        <ul>
          <li>Check-in: ${checkIn}</li>
          <li>Check-out: ${checkOut}</li>
          <li>Room Type: ${roomType}</li>
          <li>Guests: ${guests}</li>
        </ul>
        <p>Our team will contact you shortly with payment instructions.</p>
        <p>Best regards,<br>Margarita Resort Team</p>
      `,
    })

    return NextResponse.json({
      message: "Booking created successfully",
      bookingId: booking.insertedId,
    })
  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}

