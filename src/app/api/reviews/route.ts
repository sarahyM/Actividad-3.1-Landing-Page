import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get("roomId");

  try {
    const client = await connectToDatabase();
    const db = client.db();
    const reviews = await db
      .collection("reviews")
      .find({ roomId: new ObjectId(roomId) })
      .toArray();
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Error fetching reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { roomId, review, rating, userId } = await request.json();
    const client = await connectToDatabase();
    const db = client.db();

    const result = await db.collection("reviews").insertOne({
      roomId: new ObjectId(roomId),
      userId: new ObjectId(userId),
      review,
      rating,
      createdAt: new Date(),
    });

    return NextResponse.json({
      message: "Review submitted successfully",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { error: "Error submitting review" },
      { status: 500 }
    );
  }
}
