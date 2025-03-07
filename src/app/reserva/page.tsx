"use client";

import type React from "react";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function ReservaPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    checkIn: "",
    checkOut: "",
    huespedes: "2",
    tipoHabitacion: "estandar",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar formulario
    if (
      !formData.nombre ||
      !formData.email ||
      !formData.checkIn ||
      !formData.checkOut
    ) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/reserva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Reserva recibida",
          description:
            "Tu solicitud de reserva ha sido enviada con éxito. Revisa tu correo para más detalles.",
        });

        // Limpiar formulario
        setFormData({
          nombre: "",
          email: "",
          checkIn: "",
          checkOut: "",
          huespedes: "2",
          tipoHabitacion: "estandar",
        });
      } else {
        throw new Error(data.error || "Error al procesar la reserva");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Hubo un problema al procesar tu reserva",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1929] pt-32 px-4">
      <div className="max-w-lg mx-auto bg-[#112236] text-white border-[#2a3e56] rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Reserva tu Estancia
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">
                Nombre Completo
              </label>
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Juan Pérez"
                className="w-full p-2 rounded-md bg-[#1a2e46] border border-[#2a3e56] text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="juan@ejemplo.com"
                className="w-full p-2 rounded-md bg-[#1a2e46] border border-[#2a3e56] text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">
                Fecha de Llegada
              </label>
              <input
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                type="date"
                className="w-full p-2 rounded-md bg-[#1a2e46] border border-[#2a3e56] text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">
                Fecha de Salida
              </label>
              <input
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                type="date"
                className="w-full p-2 rounded-md bg-[#1a2e46] border border-[#2a3e56] text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">
                Número de Huéspedes
              </label>
              <select
                name="huespedes"
                value={formData.huespedes}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-[#1a2e46] border border-[#2a3e56] text-white"
              >
                <option value="1">1 Persona</option>
                <option value="2">2 Personas</option>
                <option value="3">3 Personas</option>
                <option value="4">4 Personas</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">
                Tipo de Habitación
              </label>
              <select
                name="tipoHabitacion"
                value={formData.tipoHabitacion}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-[#1a2e46] border border-[#2a3e56] text-white"
              >
                <option value="estandar">Estándar</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
                <option value="presidencial">Presidencial</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-md bg-white text-[#0a1929] hover:bg-white/90 font-medium"
          >
            {loading ? "Procesando..." : "Reservar Ahora"}
          </button>
        </form>
      </div>
    </div>
  );
}
