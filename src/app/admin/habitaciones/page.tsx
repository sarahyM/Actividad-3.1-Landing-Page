"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Plus, Edit, Trash2, Star } from "lucide-react";

export default function AdminHabitacionesPage() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Verificar si el admin está autenticado
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetchHabitaciones();
  }, [router]);

  const fetchHabitaciones = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/habitaciones");
      if (!res.ok) {
        throw new Error("Error al obtener habitaciones");
      }
      const data = await res.json();
      setHabitaciones(data);
    } catch (error) {
      console.error("Error al obtener habitaciones:", error);
      setError("Error al cargar las habitaciones");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta habitación?")) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/habitaciones/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Error al eliminar la habitación");
      }

      // Actualizar la lista de habitaciones
      fetchHabitaciones();
    } catch (error) {
      console.error("Error al eliminar habitación:", error);
      setError("Error al eliminar la habitación");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-16 w-16 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 pt-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Habitaciones</h1>
        <Button onClick={() => router.push("/admin/habitaciones/crear")}>
          <Plus className="mr-2 h-4 w-4" /> Nueva Habitación
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {habitaciones.length > 0 ? (
          habitaciones.map((habitacion) => (
            <Card key={habitacion._id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/4">
                  <img
                    src={habitacion.imagen || "/placeholder.svg"}
                    alt={habitacion.nombre}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-3/4 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {habitacion.nombre}
                      </h2>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(habitacion.evaluacion)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                          ({habitacion.evaluacion}/5)
                        </span>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-primary">
                      ${habitacion.tarifa} / noche
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Capacidad: {habitacion.capacidad} personas
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                  Evaluación:
                </h3>
                <div className="flex items-center mb-2">
                  {[...Array(habitacion.evaluacion)].map((_, i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                </div>
                <p className="text-gray-600">
                  {habitacion.evaluacion} de 5 estrellas
                </p>
                  <div
                    className="mt-4 text-gray-600 dark:text-gray-300 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: habitacion.descripcion }}
                  />
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(
                          `/admin/habitaciones/editar/${habitacion._id}`
                        )
                      }
                    >
                      <Edit className="mr-2 h-4 w-4" /> Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(habitacion._id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No hay habitaciones disponibles.
            </p>
            <Button onClick={() => router.push("/admin/habitaciones/crear")}>
              <Plus className="mr-2 h-4 w-4" /> Crear Primera Habitación
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
