import { connectToDatabase } from "../lib/mongodb";
import { Habitacion } from "../lib/models/habitacion";

const habitacionesPorDefecto = [
  {
    nombre: "Habitación Estándar",
    descripcion:
      "Cómoda y acogedora, perfecta para parejas o viajeros individuales.",
    caracteristicas: [
      "Cama king-size",
      "Baño privado",
      "TV de pantalla plana",
      "Minibar",
    ],
    imagen: "estandar.jpg",
    tarifa: 100,
    capacidad: 2,
  },
  {
    nombre: "Habitación Deluxe",
    descripcion: "Espaciosa y elegante, con vistas parciales al mar.",
    caracteristicas: [
      "Cama king-size",
      "Sala de estar",
      "Balcón privado",
      "Cafetera Nespresso",
    ],
    imagen: "deluxe.jpg",
    precio: 150,
    capacidad: 2,
  },
  {
    nombre: "Suite Vista al Mar",
    descripcion:
      "Lujosa suite con impresionantes vistas panorámicas al mar Caribe.",
    caracteristicas: [
      "Dormitorio separado",
      "Amplio balcón",
      "Bañera de hidromasaje",
      "Servicio de mayordomo",
    ],
    imagen: "suite-mar.jpg",
    precio: 250,
    capacidad: 3,
  },
  {
    nombre: "Suite Presidencial",
    descripcion:
      "La máxima expresión del lujo, con amplios espacios y servicios exclusivos.",
    caracteristicas: [
      "Múltiples dormitorios",
      "Terraza privada",
      "Cocina completa",
      "Acceso al lounge VIP",
    ],
    imagen: "suite-presidencial.jpg",
    precio: 500,
    capacidad: 4,
  },
];

async function seedHabitaciones() {
  try {
    console.log("Conectando a la base de datos...");
    await connectToDatabase();
    console.log("Conexión exitosa, eliminando habitaciones existentes...");
    await Habitacion.deleteMany({});
    console.log("Insertando nuevas habitaciones...");
    const result = await Habitacion.insertMany(habitacionesPorDefecto);
    console.log("Habitaciones añadidas con éxito:", result);
    process.exit(0);
  } catch (error) {
    console.error("Error al añadir habitaciones:", error);
    process.exit(1);
  }
}

seedHabitaciones();
