import Image from "next/image";

export function About() {
  return (
    <section className="bg-secondary py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Tu viaje es nuestro camino
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Con servicios de hospitalidad de 5 estrellas durante más de 15
              años en la Isla de Margarita, ofrecemos una experiencia
              excepcional que combina el lujo con la belleza natural del Mar
              Caribe.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-white">
                  <span className="text-2xl">✦</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Alojamientos de Lujo
                  </h3>
                  <p className="text-gray-700">
                    Habitaciones y suites espaciosas con impresionantes vistas
                    al océano
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-white">
                  <span className="text-2xl">✦</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Gastronomía de Clase Mundial
                  </h3>
                  <p className="text-gray-700">
                    Experimenta lo mejor de la cocina venezolana e internacional
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[600px] rounded-lg overflow-hidden">
            <Image
              src="/resort.jpg"
              alt="Vista del resort de lujo"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
