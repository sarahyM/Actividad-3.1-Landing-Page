"use client";

import { motion } from "framer-motion";

const serviciosSpa = [
  {
    nombre: "Masaje Relajante",
    descripcion:
      "Un masaje suave que alivia la tensión y promueve la relajación total.",
    duracion: "60 minutos",
    imagen: "masaje.jpg",
  },
  {
    nombre: "Tratamiento Facial Rejuvenecedor",
    descripcion:
      "Revitaliza y rejuvenece tu piel con nuestro tratamiento facial de lujo.",
    duracion: "90 minutos",
    imagen: "facial.jpg",
  },
  {
    nombre: "Terapia de Piedras Calientes",
    descripcion:
      "Experimenta una profunda relajación con nuestra terapia de piedras calientes.",
    duracion: "75 minutos",
    imagen: "piedras.jpg",
  },
  {
    nombre: "Envoltura Corporal Detox",
    descripcion:
      "Elimina toxinas y mejora la textura de tu piel con nuestra envoltura corporal.",
    duracion: "60 minutos",
    imagen: "detox.jpg",
  },
];

export default function SpaPage() {
  return (
    <div className="min-h-screen bg-secondary pt-24">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">
          Nuestro Spa
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviciosSpa.map((servicio, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={servicio.imagen || "/placeholder.svg"}
                alt={servicio.nombre}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-primary mb-2">
                  {servicio.nombre}
                </h2>
                <p className="text-gray-600 mb-4">{servicio.descripcion}</p>
                <p className="text-sm text-primary-light">
                  Duración: {servicio.duracion}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
