"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  MoonIcon,
  SunIcon,
  LogOut,
  Home,
  Hotel,
  Users,
  Settings,
  Calendar,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function AdminNav() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className="bg-gradient-to-r from-primary to-blue-600 text-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold hover:text-gray-200 transition-colors"
            >
              Hotel Admin
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/dashboard"
              className="hover:text-gray-200 transition-colors"
            >
              <Home className="h-5 w-5" />
            </Link>
            <Link
              href="/admin/habitaciones"
              className="hover:text-gray-200 transition-colors"
            >
              <Hotel className="h-5 w-5" />
            </Link>
            <Link
              href="/admin/reservas"
              className="hover:text-gray-200 transition-colors"
            >
              <Calendar className="h-5 w-5" />
            </Link>
            <Link
              href="/admin/usuarios"
              className="hover:text-gray-200 transition-colors"
            >
              <Users className="h-5 w-5" />
            </Link>
            <Link
              href="/admin/configuracion"
              className="hover:text-gray-200 transition-colors"
            >
              <Settings className="h-5 w-5" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:text-gray-200 transition-colors"
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="hover:text-gray-200 transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
