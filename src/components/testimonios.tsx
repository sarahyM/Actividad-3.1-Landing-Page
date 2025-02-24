"use client";

import { motion } from "framer-motion";

const testimonios = [
  {
    nombre: "María Rodríguez",
    comentario:
      "Nuestra estancia en el Margarita Resort fue increíble. El servicio es de primera clase y las vistas son espectaculares.",
    imagen: "maria.png",
  },
  {
    nombre: "Juan Pérez",
    comentario:
      "Las instalaciones del spa son de otro mundo. Salí completamente renovado y relajado. ¡Definitivamente volveré!",
    imagen: "juan.jpg",
  },
  {
    nombre: "Ana García",
    comentario:
      "La comida en los restaurantes es exquisita. Los chefs realmente saben cómo resaltar los sabores locales.",
    imagen: "ana.jpg",
  },
];

export function Testimonios() {
  return (
    <section className="py-24 bg-primary text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Lo que dicen nuestros huéspedes
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonios.map((testimonio, index) => (
            <motion.div
              key={index}
              className="bg-primary-light p-6 rounded-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={testimonio.imagen || "/placeholder.svg"}
                alt={testimonio.nombre}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <p className="text-center mb-4">{testimonio.comentario}</p>
              <p className="text-center font-bold">{testimonio.nombre}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
