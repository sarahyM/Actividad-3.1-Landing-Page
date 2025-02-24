"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ReservaExitoPage() {
  return (
    <div className="min-h-screen bg-secondary pt-24">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            </motion.div>
            <h1 className="mt-4 text-3xl font-bold text-primary">
              ¡Reserva Exitosa!
            </h1>
            <p className="mt-2 text-xl text-gray-600">
              Gracias por elegir Margarita Resort para tu estancia.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Próximos pasos:
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                Recibirás un correo electrónico con los detalles de tu reserva.
              </li>
              <li>
                Realiza el pago del 50% del monto total para confirmar tu
                reserva.
              </li>
              <li>Envía el comprobante de pago a pagos@margaritaresort.com.</li>
              <li>
                Te enviaremos un correo de confirmación una vez verificado el
                pago.
              </li>
            </ul>
          </div>

          <div className="mt-8 space-y-4">
            <p className="text-gray-600">
              Si tienes alguna pregunta o necesitas asistencia adicional, no
              dudes en contactarnos:
            </p>
            <ul className="text-gray-600">
              <li>Teléfono: +58 295 123 4567</li>
              <li>WhatsApp: +58 424 123 4567</li>
              <li>Email: reservas@margaritaresort.com</li>
            </ul>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <Link
              href="/"
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Volver al Inicio
            </Link>
            <Link
              href="/habitaciones"
              className="bg-secondary hover:bg-secondary-dark text-primary font-bold py-2 px-4 rounded transition duration-300"
            >
              Ver Habitaciones
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
