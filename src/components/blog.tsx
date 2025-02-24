"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const articulos = [
  {
    title: "Los 5 mejores restaurantes de Isla Margarita",
    excerpt:
      "Descubre la rica gastronomía de la isla con nuestra selección de los mejores lugares para comer.",
    image: "restaurante.jpg",
    slug: "mejores-restaurantes-isla-margarita",
  },
  {
    title: "Guía de playas imperdibles en Margarita",
    excerpt:
      "Conoce las playas más hermosas y menos conocidas de la isla para tu próxima visita.",
    image: "playas.jpg",
    slug: "guia-playas-margarita",
  },
  {
    title: "Actividades de aventura en Isla Margarita",
    excerpt:
      "Desde windsurf hasta senderismo, descubre las mejores actividades para los amantes de la adrenalina.",
    image: "actividad.jpg",
    slug: "actividades-aventura-margarita",
  },
];

export function Blog() {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-primary"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Blog de Viajes
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articulos.map((articulo, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={articulo.image || "/placeholder.svg"}
                alt={articulo.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{articulo.title}</h3>
                <p className="text-gray-600 mb-4">{articulo.excerpt}</p>
                <Link
                  href={`/blog/${articulo.slug}`}
                  className="text-primary-light font-semibold hover:underline"
                >
                  Leer más
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
