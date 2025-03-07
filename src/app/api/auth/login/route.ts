import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Admin } from "@/lib/models/admin";
import { User } from "@/lib/models/user";
import { comparePasswords, generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { email, password, isAdmin = false } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    // Buscar usuario según el tipo (admin o usuario normal)
    const Model = isAdmin ? Admin : User;
    const user = await Model.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    // Verificar contraseña
    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    // Generar token
    const token = generateToken(user._id.toString());

    // Devolver información del usuario y token
    return NextResponse.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
