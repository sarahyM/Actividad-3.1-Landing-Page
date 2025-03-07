"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
  };

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/50 dark:bg-[#0a1929]/90 backdrop-blur-md shadow-sm bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link
            href="/"
            className="text-2xl font-bold text-primary dark:text-white"
          >
            Margarita Resort
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/inicio"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white"
            >
              Inicio
            </Link>
            <Link
              href="/habitaciones"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white"
            >
              Habitaciones
            </Link>
            <Link
              href="/spa"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white"
            >
              Spa
            </Link>
            <Link
              href="/actividades"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white"
            >
              Actividades
            </Link>
            <Link
              href="/restaurantes"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white"
            >
              Restaurantes
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {isLoggedIn ? (
              <>
                <Link href="/perfil">
                  <Button className="text-gray-700 dark:text-gray-300">
                    Mi Perfil
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  className="bg-primary text-white"
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Link href="/admin/login">
                  <Button variant="outline">Iniciar Sesión</Button>
                </Link>
                <Link href="/admin/registro">
                  <Button className="bg-primary text-white">Registrarse</Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="mr-2 text-gray-700 dark:text-gray-300"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 dark:text-gray-300"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-white dark:bg-[#0a1929] border-gray-200 dark:border-gray-800"
              >
                <nav className="flex flex-col space-y-4 mt-6">
                  <Link
                    href="/"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white"
                  >
                    Inicio
                  </Link>
                  <Link
                    href="/habitaciones"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white"
                  >
                    Habitaciones
                  </Link>
                  <Link
                    href="/spa"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white"
                  >
                    Spa
                  </Link>
                  <Link
                    href="/contacto"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white"
                  >
                    Contacto
                  </Link>
                  <Link
                    href="/reserva"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white"
                  >
                    Reservar
                  </Link>

                  {isLoggedIn ? (
                    <>
                      <Link href="/perfil">
                        <Button className="text-gray-700 dark:text-gray-300">
                          Mi Perfil
                        </Button>
                      </Link>
                      <Button
                        onClick={handleLogout}
                        className="bg-primary text-white"
                      >
                        Cerrar Sesión
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/admin/login">
                        <Button variant="outline">Iniciar Sesión</Button>
                      </Link>
                      <Link href="/admin/registro">
                        <Button className="bg-primary text-white">
                          Registrarse
                        </Button>
                      </Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
