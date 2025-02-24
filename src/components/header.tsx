"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-primary">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif text-white">
            Margarita Resort
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8 text-white">
            <Link href="/" className="hover:text-teal-200 transition-colors">
              Inicio
            </Link>
            <Link
              href="/habitaciones"
              className="hover:text-teal-200 transition-colors"
            >
              Habitaciones
            </Link>
            <Link
              href="/restaurantes"
              className="hover:text-teal-200 transition-colors"
            >
              Restaurantes
            </Link>
            <Link href="/spa" className="hover:text-teal-200 transition-colors">
              Spa
            </Link>
            <Link
              href="/actividades"
              className="hover:text-teal-200 transition-colors"
            >
              Actividades
            </Link>
            <Link
              href="/reserva"
              className="bg-white text-primary px-6 py-2 rounded-full hover:bg-teal-50 transition-colors"
            >
              Reservar Ahora
            </Link>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-primary p-4 md:hidden">
              <div className="flex flex-col space-y-4 text-white">
                <Link
                  href="/"
                  className="hover:text-teal-200 transition-colors"
                >
                  Inicio
                </Link>
                <Link
                  href="/habitaciones"
                  className="hover:text-teal-200 transition-colors"
                >
                  Habitaciones
                </Link>
                <Link
                  href="/restaurantes"
                  className="hover:text-teal-200 transition-colors"
                >
                  Restaurantes
                </Link>
                <Link
                  href="/spa"
                  className="hover:text-teal-200 transition-colors"
                >
                  Spa
                </Link>
                <Link
                  href="/actividades"
                  className="hover:text-teal-200 transition-colors"
                >
                  Actividades
                </Link>
                <Link
                  href="/reserva"
                  className="bg-white text-primary px-6 py-2 rounded-full hover:bg-teal-50 transition-colors text-center"
                >
                  Reservar Ahora
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
