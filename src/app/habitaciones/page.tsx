"use client";

import { motion } from "framer-motion";

const habitaciones = [
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
    precio: 100,
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
  },
];

export default function HabitacionesPage() {
  return (
    <div className="min-h-screen bg-secondary pt-24">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">
          Nuestras Habitaciones
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {habitaciones.map((habitacion, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={habitacion.imagen || "/placeholder.svg"}
                alt={habitacion.nombre}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-primary mb-2">
                  {habitacion.nombre}
                </h2>
                <p className="text-gray-600 mb-4">{habitacion.descripcion}</p>
                <p className="text-xl font-bold text-primary mb-4">
                  Precio: ${habitacion.precio} / noche
                </p>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Características:
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  {habitacion.caracteristicas.map((caracteristica, idx) => (
                    <li key={idx}>{caracteristica}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
