import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Habitacion } from "@/lib/models/habitacion";
import { verifyToken } from "@/lib/auth";
import { processFileUpload } from "@/lib/multer";

// GET /api/habitaciones/[id] - Obtener una habitación por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const id = params.id;

    const habitacion = await Habitacion.findById(id);

    if (!habitacion) {
      return NextResponse.json(
        { error: "Habitación no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(habitacion);
  } catch (error) {
    console.error("Error al obtener habitación:", error);
    return NextResponse.json(
      { error: "Error al obtener habitación" },
      { status: 500 }
    );
  }
}

// PUT /api/habitaciones/[id] - Actualizar una habitación (protegido)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticación (igual que antes)
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    await connectToDatabase();
    const id = params.id;

    // Obtener la habitación existente (igual que antes)
    const habitacion = await Habitacion.findById(id);

    if (!habitacion) {
      return NextResponse.json(
        { error: "Habitación no encontrada" },
        { status: 404 }
      );
    }

    // Procesar datos JSON
    const body = await request.json();

    // Actualizar campos
    if (body.nombre) habitacion.nombre = body.nombre;
    if (body.descripcion) habitacion.descripcion = body.descripcion;
    if (body.comodidades) habitacion.comodidades = body.comodidades;
    if (body.tarifa) habitacion.tarifa = body.tarifa;
    if (body.capacidad) habitacion.capacidad = body.capacidad;
    if (body.evaluacion) habitacion.evaluacion = body.evaluacion;

    // Procesar características si existen
    if (body.caracteristicas) {
      habitacion.caracteristicas = body.caracteristicas;
    }

    // Procesar imagen si existe
    if (body.imagen) {
      habitacion.imagen = body.imagen;
    }

    await habitacion.save();

    return NextResponse.json(habitacion);
  } catch (error) {
    console.error("Error al actualizar habitación:", error);
    return NextResponse.json(
      { error: "Error al actualizar habitación" },
      { status: 500 }
    );
  }
}

// DELETE /api/habitaciones/[id] - Eliminar una habitación (protegido)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticación
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    await connectToDatabase();
    const id = params.id;

    const resultado = await Habitacion.findByIdAndDelete(id);

    if (!resultado) {
      return NextResponse.json(
        { error: "Habitación no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Habitación eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar habitación:", error);
    return NextResponse.json(
      { error: "Error al eliminar habitación" },
      { status: 500 }
    );
  }
}
