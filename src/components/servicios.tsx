"use client";

import { motion } from "framer-motion";
import { Wifi, Utensils, Dumbbell, Waves, Sunset, Coffee } from "lucide-react";

const servicios = [
  {
    icon: Wifi,
    title: "Wi-Fi Gratuito",
    description: "Conexión de alta velocidad en todas las áreas del hotel",
  },
  {
    icon: Utensils,
    title: "Restaurantes Gourmet",
    description: "Variedad de cocina internacional y local",
  },
  {
    icon: Dumbbell,
    title: "Gimnasio Completo",
    description: "Equipamiento moderno y clases dirigidas",
  },
  {
    icon: Waves,
    title: "Piscina Infinita",
    description: "Con vista panorámica al mar Caribe",
  },
  {
    icon: Sunset,
    title: "Spa de Lujo",
    description: "Tratamientos relajantes y rejuvenecedores",
  },
  {
    icon: Coffee,
    title: "Bar en la Playa",
    description: "Cócteles tropicales y aperitivos",
  },
];

export function Servicios() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-primary"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Nuestros Servicios
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((servicio, index) => (
            <motion.div
              key={index}
              className="bg-secondary p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <servicio.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{servicio.title}</h3>
              <p className="text-gray-600">{servicio.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
