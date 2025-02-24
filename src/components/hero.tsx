"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src="isla.jpeg"
          alt="Playa de Isla Margarita"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-teal-900/30" />
      </div>
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Descubre la paz y tranquilidad en Isla Margarita
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
          Experimenta la perfecta combinación de lujo y naturaleza en el mejor
          resort de playa de Margarita
        </p>
        <motion.a
          href="/reserva"
          className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full text-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reserva Ahora
        </motion.a>
      </motion.div>
    </section>
  );
}
