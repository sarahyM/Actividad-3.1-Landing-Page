import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {Footer, footer} from "@/components/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a1929]">
      <div className="relative rounded-3xl overflow-hidden mx-4 mt-4">
        <div className="relative h-[500px]">
          <Image
            src="/caribe-r.jpg"
            alt="Margarita Resort"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Descubre el paraíso en Margarita
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-xl">
              Disfruta de unas vacaciones inolvidables con nuestra oferta
              especial: 7 noches al precio de 5
            </p>
            <div>
              <Link href="/reserva">
                <Button className="pulse bg-white text-[#0a1929] hover:bg-white/90 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 text-lg px-8 py-6 rounded-full">
                  Reserva ahora y ahorra
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16">
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            ¿Por qué elegir Margarita Resort?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-[#112236] p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Ubicación privilegiada
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Disfruta de las mejores playas de Margarita a pocos pasos de tu
                habitación.
              </p>
            </div>
            <div className="bg-white dark:bg-[#112236] p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Lujo y confort
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nuestras habitaciones están diseñadas para ofrecerte la máxima
                comodidad durante tu estancia.
              </p>
            </div>
            <div className="bg-white dark:bg-[#112236] p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Gastronomía exquisita
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Descubre los sabores del Caribe en nuestros restaurantes de
                clase mundial.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Lo que dicen nuestros huéspedes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-[#112236] p-6 rounded-xl shadow-lg">
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                "Una experiencia inolvidable. El personal es increíblemente
                atento y las instalaciones son de primera clase."
              </p>
              <p className="font-bold text-gray-900 dark:text-white">
                - María R.
              </p>
            </div>
            <div className="bg-white dark:bg-[#112236] p-6 rounded-xl shadow-lg">
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                "Las mejores vacaciones de mi vida. La playa es hermosa y el
                resort tiene todo lo que puedas necesitar."
              </p>
              <p className="font-bold text-gray-900 dark:text-white">
                - Juan C.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            ¿Listo para vivir la experiencia Margarita Resort?
          </h2>
          <Link href="/reserva">
            <Button className="bg-primary text-white hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700 text-lg px-8 py-6 rounded-full">
              Reserva ahora y obtén un 20% de descuento
            </Button>
          </Link>
        </section>
        <Footer />
      </main>
    </div>
  );
}
