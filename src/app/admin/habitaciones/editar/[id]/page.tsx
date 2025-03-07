"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface Habitacion {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  capacidad: number;
  imagen: string;
}

export default function HabitacionEditPage() {
  const [habitacion, setHabitacion] = useState<Habitacion | null>(null);
  const { id } = useParams();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    fetchHabitacion();
  }, [id]);

  const fetchHabitacion = async () => {
    try {
      const res = await fetch(`/api/habitaciones/${id}`);
      if (res.ok) {
        const data = await res.json();
        setHabitacion(data);
      } else {
        throw new Error("Error al obtener la habitación");
      }
    } catch (error) {
      console.error("Error al obtener la habitación:", error);
      toast({
        title: "Error",
        description: "No se pudo cargar la información de la habitación",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (habitacion) {
      setHabitacion({ ...habitacion, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitacion) return;

    try {
      const token = localStorage.getItem("adminToken");
      console.log("Token:", token); // Log del token
      const res = await fetch(`/api/habitaciones/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(habitacion),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("API Response:", data); // Log de la respuesta
        toast({
          title: "Habitación actualizada",
          description: "La habitación ha sido actualizada exitosamente",
        });
        router.push("/admin/habitaciones");
      } else {
        const errorData = await res.json();
        console.error("API Error Response:", errorData); // Log del error
        throw new Error("Error al actualizar la habitación");
      }
    } catch (error) {
      console.error("Error al actualizar la habitación:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la habitación",
        variant: "destructive",
      });
    }
  };

  if (!habitacion) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4 pt-24">
      <div className="max-w-2xl mx-auto bg-[#112236] rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Editar Habitación
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Nombre
            </label>
            <Input
              type="text"
              id="nombre"
              name="nombre"
              value={habitacion.nombre}
              onChange={handleInputChange}
              required
              className="bg-[#1a2e46] border-[#2a3e56] text-white"
            />
          </div>
          <div>
            <label
              htmlFor="descripcion"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Descripción
            </label>
            <Textarea
              id="descripcion"
              name="descripcion"
              value={habitacion.descripcion}
              onChange={handleInputChange}
              required
              className="bg-[#1a2e46] border-[#2a3e56] text-white"
            />
          </div>
          <div>
            <label
              htmlFor="precio"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Precio
            </label>
            <Input
              type="number"
              id="precio"
              name="precio"
              value={habitacion.precio}
              onChange={handleInputChange}
              required
              className="bg-[#1a2e46] border-[#2a3e56] text-white"
            />
          </div>
          <div>
            <label
              htmlFor="capacidad"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Capacidad
            </label>
            <Input
              type="number"
              id="capacidad"
              name="capacidad"
              value={habitacion.capacidad}
              onChange={handleInputChange}
              required
              className="bg-[#1a2e46] border-[#2a3e56] text-white"
            />
          </div>
          <div>
            <label
              htmlFor="imagen"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              URL de la Imagen
            </label>
            <Input
              type="text"
              id="imagen"
              name="imagen"
              value={habitacion.imagen}
              onChange={handleInputChange}
              className="bg-[#1a2e46] border-[#2a3e56] text-white"
            />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/habitaciones")}
              className="border-gray-400 text-gray-200 hover:bg-[#1a2e46]"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-white text-[#0a1929] hover:bg-white/90"
            >
              Guardar Cambios
            </Button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
