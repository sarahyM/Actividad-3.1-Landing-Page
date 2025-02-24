"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast, Toast } from "@/components/ui/use-toast";

export default function ReservaPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { toast, showToast } = useToast();

  const validateForm = (formData: FormData) => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.get("nombre")) newErrors.nombre = "El nombre es requerido";
    if (!formData.get("email")) newErrors.email = "El email es requerido";
    if (!/^\S+@\S+\.\S+$/.test(formData.get("email") as string))
      newErrors.email = "Email inválido";
    if (!formData.get("checkIn"))
      newErrors.checkIn = "La fecha de llegada es requerida";
    if (!formData.get("checkOut"))
      newErrors.checkOut = "La fecha de salida es requerida";
    if (
      new Date(formData.get("checkOut") as string) <=
      new Date(formData.get("checkIn") as string)
    )
      newErrors.checkOut =
        "La fecha de salida debe ser posterior a la fecha de llegada";
    if (!formData.get("huespedes"))
      newErrors.huespedes = "El número de huéspedes es requerido";
    if (!formData.get("tipoHabitacion"))
      newErrors.tipoHabitacion = "El tipo de habitación es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    if (!validateForm(formData)) {
      setIsLoading(false);
      return;
    }

    const data = {
      nombre: formData.get("nombre"),
      email: formData.get("email"),
      checkIn: formData.get("checkIn"),
      checkOut: formData.get("checkOut"),
      huespedes: formData.get("huespedes"),
      tipoHabitacion: formData.get("tipoHabitacion"),
    };

    try {
      const response = await fetch("/api/reserva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al crear la reserva");
      }

      showToast({
        message:
          "¡Reserva Confirmada! Revisa tu email para los detalles de la reserva.",
        type: "success",
      });

      router.push("/reserva/exito");
    } catch (error) {
      showToast({
        message:
          "Hubo un problema al procesar tu reserva. Por favor, intenta de nuevo.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-200 pt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-primary mb-8 text-center">
            Reserva tu Estancia
          </h1>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-primary">
                  Nombre Completo
                </Label>
                <Input
                  id="nombre"
                  name="nombre"
                  required
                  className="border-primary-light"
                />
                {errors.nombre && (
                  <p className="text-red-500 text-sm">{errors.nombre}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="border-primary-light"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkIn" className="text-primary">
                  Fecha de Llegada
                </Label>
                <Input
                  id="checkIn"
                  name="checkIn"
                  type="date"
                  required
                  className="border-primary-light"
                />
                {errors.checkIn && (
                  <p className="text-red-500 text-sm">{errors.checkIn}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkOut" className="text-primary">
                  Fecha de Salida
                </Label>
                <Input
                  id="checkOut"
                  name="checkOut"
                  type="date"
                  required
                  className="border-primary-light"
                />
                {errors.checkOut && (
                  <p className="text-red-500 text-sm">{errors.checkOut}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="huespedes" className="text-primary">
                  Número de Huéspedes
                </Label>
                <Select name="huespedes" required>
                  <SelectTrigger className="border-primary-light">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Huésped</SelectItem>
                    <SelectItem value="2">2 Huéspedes</SelectItem>
                    <SelectItem value="3">3 Huéspedes</SelectItem>
                    <SelectItem value="4">4 Huéspedes</SelectItem>
                  </SelectContent>
                </Select>
                {errors.huespedes && (
                  <p className="text-red-500 text-sm">{errors.huespedes}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipoHabitacion" className="text-primary">
                  Tipo de Habitación
                </Label>
                <Select name="tipoHabitacion" required>
                  <SelectTrigger className="border-primary-light">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="estandar">
                      Habitación Estándar
                    </SelectItem>
                    <SelectItem value="deluxe">Habitación Deluxe</SelectItem>
                    <SelectItem value="suite">Suite Vista al Mar</SelectItem>
                    <SelectItem value="presidencial">
                      Suite Presidencial
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.tipoHabitacion && (
                  <p className="text-red-500 text-sm">
                    {errors.tipoHabitacion}
                  </p>
                )}
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white"
              disabled={isLoading}
            >
              {isLoading ? "Procesando..." : "Reservar Ahora"}
            </Button>
          </form>
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </motion.div>
  );
}
