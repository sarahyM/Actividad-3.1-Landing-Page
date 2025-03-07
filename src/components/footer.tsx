import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="mt-12 w-full bg-primary text-white rounded-t-3xl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-serif mb-4">Margarita Resort</h3>
            <p className="text-teal-100">
              Playa El Agua, Isla de Margarita
              <br />
              Nueva Esparta, Venezuela
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Contacto</h4>
            <p className="text-teal-100">Teléfono: +58 295 123 4567</p>
            <p className="text-teal-100">Email: info@margaritaresort.com</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/habitaciones"
                  className="text-teal-100 hover:text-white transition-colors"
                >
                  Habitaciones y Suites
                </Link>
              </li>
              <li>
                <Link
                  href="/spa"
                  className="text-teal-100 hover:text-white transition-colors"
                >
                  Servicios de Spa
                </Link>
              </li>
              <li>
                <Link
                  href="/restaurantes"
                  className="text-teal-100 hover:text-white transition-colors"
                >
                  Restaurantes
                </Link>
              </li>
              <li>
                <Link
                  href="/actividades"
                  className="text-teal-100 hover:text-white transition-colors"
                >
                  Actividades
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-teal-100 hover:text-white transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-teal-100 hover:text-white transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="text-teal-100 hover:text-white transition-colors"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="text-teal-100 hover:text-white transition-colors"
              >
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-teal-800 mt-8 pt-8 text-center text-teal-100">
          <p>
            &copy; {new Date().getFullYear()} Margarita Resort. Todos los
            derechos reservados.
          </p>
          <div className="mt-4 flex flex-col items-center">
            <Image
              src="/logo-uni.png"
              alt="Logo de la Universidad"
              width={100}
              height={50}
            />
            <p className="mt-2">
              Universidad Valle del Momboy <br /> Facultad de Ingeniería
              (Computación)
            </p>
            <p className="mt-2">Integrantes:</p>
            <p className="mt-1">
              Ocanto Sarahy C.I: 30.140.127 <br /> Norlys Castañeda C.I:
              20.597.586
            </p>
            <p>Profesor: Yerson González</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
