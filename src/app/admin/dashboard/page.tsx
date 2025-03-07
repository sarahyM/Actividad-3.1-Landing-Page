"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminNav } from "@/components/admin-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Hotel, Users, Star } from "lucide-react";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    habitaciones: 0,
    usuarios: 0,
    reviews: 0,
  });
  const router = useRouter();

  useEffect(() => {
    // Verificar si el admin está autenticado
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    // Simular carga de estadísticas
    const timer = setTimeout(() => {
      setStats({
        habitaciones: 5,
        usuarios: 12,
        reviews: 8,
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-16 w-16 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
    
      <div className="pt-20 px-4">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8">Panel de Administrador</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Habitaciones
                </CardTitle>
                <Hotel className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.habitaciones}</div>
                <p className="text-xs text-muted-foreground">
                  Habitaciones activas
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.usuarios}</div>
                <p className="text-xs text-muted-foreground">
                  Usuarios registrados
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Reviews</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.reviews}</div>
                <p className="text-xs text-muted-foreground">
                  Reviews de clientes
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button
                  onClick={() => router.push("/admin/habitaciones")}
                  className="w-full"
                >
                  Gestionar Habitaciones
                </Button>
                <Button
                  onClick={() => router.push("/admin/usuarios")}
                  className="w-full"
                >
                  Gestionar Usuarios
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No hay actividad reciente para mostrar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
