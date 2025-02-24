"use client";

import { motion } from "framer-motion";

const actividades = [
  {
    nombre: "Excursión en Catamarán",
    descripcion:
      "Navega por las cristalinas aguas del Caribe y visita hermosas playas cercanas.",
    duracion: "4 horas",
    imagen: "catamarran.jpg",
  },
  {
    nombre: "Clases de Buceo",
    descripcion:
      "Descubre el fascinante mundo submarino con nuestras clases de buceo para principiantes.",
    duracion: "2 horas",
    imagen: "buceo.jpg",
  },
  {
    nombre: "Tour de Senderismo",
    descripcion:
      "Explora la belleza natural de la isla con nuestro tour guiado de senderismo.",
    duracion: "3 horas",
    imagen: "senderismo.jpg",
  },
  {
    nombre: "Clases de Cocina Venezolana",
    descripcion:
      "Aprende a preparar deliciosos platos tradicionales venezolanos con nuestro chef.",
    duracion: "2 horas",
    imagen:
      "cocina.jpg",
  },
];

export default function ActividadesPage() {
  return (
    <div className="min-h-screen bg-secondary pt-24">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">
          Actividades
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {actividades.map((actividad, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={actividad.imagen || "/placeholder.svg"}
                alt={actividad.nombre}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-primary mb-2">
                  {actividad.nombre}
                </h2>
                <p className="text-gray-600 mb-4">{actividad.descripcion}</p>
                <p className="text-sm text-primary-light">
                  Duración: {actividad.duracion}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
