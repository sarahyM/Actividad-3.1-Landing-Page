"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function CrearHabitacionPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    comodidades: "",
    tarifa: "",
    capacidad: "2",
    caracteristicas: "",
  });
  const [imagen, setImagen] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagen(file);

      // Crear URL para previsualización
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Obtener el token de administrador
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setError("No estás autenticado como administrador");
        setLoading(false);
        return;
      }

      // Crear FormData para enviar los datos incluyendo la imagen
      const data = new FormData();
      data.append("nombre", formData.nombre);
      data.append("descripcion", formData.descripcion);
      data.append("comodidades", formData.comodidades);
      data.append("tarifa", formData.tarifa);
      data.append("capacidad", formData.capacidad);

      // Convertir características a array si es necesario
      if (formData.caracteristicas) {
        const caracteristicasArray = formData.caracteristicas
          .split(",")
          .map((item) => item.trim());
        data.append("caracteristicas", JSON.stringify(caracteristicasArray));
      }

      // Añadir imagen si existe
      if (imagen) {
        data.append("imagen", imagen);
      }

      console.log("Token:", token); // Para depuración

      const res = await fetch("/api/habitaciones", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // No incluir Content-Type aquí, FormData lo establece automáticamente
        },
        body: data,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al crear la habitación");
      }

      // Redireccionar a la lista de habitaciones
      router.push("/admin/habitaciones");
    } catch (error) {
      console.error("Error al crear la habitación", error);
      setError(
        error instanceof Error ? error.message : "Error al crear la habitación"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 pt-24">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Crear Nueva Habitación</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium mb-1"
              >
                Nombre
              </label>
              <Input
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="descripcion"
                className="block text-sm font-medium mb-1"
              >
                Descripción
              </label>
              <Textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            <div>
              <label
                htmlFor="comodidades"
                className="block text-sm font-medium mb-1"
              >
                Comodidades
              </label>
              <Textarea
                id="comodidades"
                name="comodidades"
                value={formData.comodidades}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="tarifa"
                  className="block text-sm font-medium mb-1"
                >
                  Tarifa por noche ($)
                </label>
                <Input
                  id="tarifa"
                  name="tarifa"
                  type="number"
                  value={formData.tarifa}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="capacidad"
                  className="block text-sm font-medium mb-1"
                >
                  Capacidad (personas)
                </label>
                <Input
                  id="capacidad"
                  name="capacidad"
                  type="number"
                  value={formData.capacidad}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="caracteristicas"
                className="block text-sm font-medium mb-1"
              >
                Características (separadas por comas)
              </label>
              <Input
                id="caracteristicas"
                name="caracteristicas"
                value={formData.caracteristicas}
                onChange={handleChange}
                placeholder="WiFi, TV, Aire acondicionado"
              />
            </div>

            <div>
              <label
                htmlFor="imagen"
                className="block text-sm font-medium mb-1"
              >
                Imagen
              </label>
              <Input
                id="imagen"
                name="imagen"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              {previewUrl && (
                <div className="mt-2">
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Vista previa"
                    className="w-full max-h-64 object-cover rounded-md"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/habitaciones")}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando...
                  </>
                ) : (
                  "Crear Habitación"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
