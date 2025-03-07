"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function HabitacionesPage() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [filteredHabitaciones, setFilteredHabitaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [capacidad, setCapacidad] = useState("");

  useEffect(() => {
    fetchHabitaciones();
  }, []);

  const fetchHabitaciones = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/habitaciones");
      if (!res.ok) {
        throw new Error("Error al obtener habitaciones");
      }
      const data = await res.json();
      console.log("Habitaciones obtenidas:", data);
      setHabitaciones(data);
      setFilteredHabitaciones(data);
    } catch (error) {
      console.error("Error al obtener habitaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (capacidad === "") {
      setFilteredHabitaciones(habitaciones);
    } else {
      const filtered = habitaciones.filter(
        (h) => h.capacidad >= Number.parseInt(capacidad)
      );
      setFilteredHabitaciones(filtered);
    }
  }, [capacidad, habitaciones]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-16 w-16 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary pt-24">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">
          Nuestras Habitaciones
        </h1>
        <div className="mb-6 flex gap-4">
          <Input
            type="number"
            placeholder="Capacidad mínima"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
          />
          <Button onClick={() => setCapacidad("")}>Mostrar todas</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredHabitaciones.map((habitacion, index) => (
            <motion.div
              key={habitacion._id}
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
                  Precio: ${habitacion.tarifa} / noche
                </p>
                <p className="text-lg font-semibold text-primary mb-2">
                  Capacidad: {habitacion.capacidad} personas
                </p>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Características:
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  {habitacion.caracteristicas.map((caracteristica, idx) => (
                    <li key={idx}>{caracteristica}</li>
                  ))}
                </ul>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Evaluación:
                </h3>
                <div className="flex items-center mb-2">
                  {[...Array(habitacion.evaluacion)].map((_, i) => (
                    <span key={i} className="text-yellow-500">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600">
                  {habitacion.evaluacion} de 5 estrellas
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
