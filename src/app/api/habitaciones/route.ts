import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Habitacion } from "@/lib/models/habitacion";
import { verifyToken } from "@/lib/auth";
import { processFileUpload } from "@/lib/multer";

// GET /api/habitaciones - Obtener todas las habitaciones
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const habitaciones = await Habitacion.find({}).sort({ createdAt: -1 });
    return NextResponse.json(habitaciones);
  } catch (error) {
    console.error("Error al obtener habitaciones:", error);
    return NextResponse.json(
      { error: "Error al obtener habitaciones" },
      { status: 500 }
    );
  }
}

// POST /api/habitaciones - Crear una nueva habitación (protegido)
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No hay token de autorización");
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      console.log("Token inválido");
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    await connectToDatabase();

    // Procesar el formulario
    const formData = await request.formData();

    const nombre = formData.get("nombre") as string;
    const descripcion = formData.get("descripcion") as string;
    const comodidades = formData.get("comodidades") as string;
    const tarifa = Number(formData.get("tarifa"));
    const capacidad = Number(formData.get("capacidad") || 2);
    const evaluacion = Number(formData.get("evaluacion") || 5);

    // Procesar características si existen
    let caracteristicas: string[] = [];
    const caracteristicasData = formData.get("caracteristicas");
    if (caracteristicasData) {
      try {
        caracteristicas = JSON.parse(caracteristicasData as string);
      } catch (e) {
        // Si no es JSON válido, intentar dividir por comas
        caracteristicas = (caracteristicasData as string)
          .split(",")
          .map((item) => item.trim());
      }
    }

    // Procesar imagen si existe
    const imagen = await processFileUpload(formData, "imagen");

    // Crear nueva habitación
    const nuevaHabitacion = new Habitacion({
      nombre,
      descripcion,
      comodidades,
      imagen,
      tarifa,
      capacidad,
      caracteristicas,
      evaluacion,
    });

    await nuevaHabitacion.save();

    return NextResponse.json(nuevaHabitacion, { status: 201 });
  } catch (error) {
    console.error("Error al crear habitación:", error);
    return NextResponse.json(
      { error: "Error al crear habitación" },
      { status: 500 }
    );
  }
}
