import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PromocionLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center px-4">
      <div className="max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src="/images/promo-suite.jpg"
              alt="Suite de lujo"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 dark:text-indigo-400 font-semibold">
              Oferta Especial
            </div>
            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Escapada de Lujo en Suite
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300">
              Disfruta de 3 noches en nuestra Suite Vista al Mar con un 30% de
              descuento. Incluye desayuno buffet y acceso al spa.
            </p>
            <div className="mt-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white">
                    30%
                  </span>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Descuento
                  </dt>
                  <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Aplicado automáticamente al reservar
                  </dd>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/reserva?promo=suite-lujo">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                  Reservar Ahora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
