"use client";

import { motion } from "framer-motion";

const restaurantes = [
  {
    nombre: "El Caribe Gourmet",
    descripcion: "Disfrute de la mejor cocina caribeña con un toque gourmet.",
    horario: "Abierto para cena de 18:00 a 23:00",
    imagen: "caribe-r.jpg",
  },
  {
    nombre: "Sabores de Venezuela",
    descripcion: "Explore los sabores auténticos de la cocina venezolana.",
    horario: "Abierto para almuerzo y cena de 12:00 a 22:00",
    imagen: "sabores-r.jpg",
  },
  {
    nombre: "Mediterráneo",
    descripcion: "Deléitese con los sabores frescos de la cocina mediterránea.",
    horario: "Abierto para cena de 19:00 a 23:00",
    imagen: "mediterraneo-r.jpg",
  },
  {
    nombre: "Sushi Fusion",
    descripcion:
      "Una experiencia única que combina sushi tradicional con sabores locales.",
    horario: "Abierto para cena de 18:00 a 22:00",
    imagen: "sushi.jpg",
  },
];

export default function RestaurantesPage() {
  return (
    <div className="min-h-screen bg-secondary pt-24">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">
          Nuestros Restaurantes
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {restaurantes.map((restaurante, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={restaurante.imagen || "/placeholder.svg"}
                alt={restaurante.nombre}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-primary mb-2">
                  {restaurante.nombre}
                </h2>
                <p className="text-gray-600 mb-4">{restaurante.descripcion}</p>
                <p className="text-sm text-primary-light">
                  {restaurante.horario}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
