"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";

const articulos = [
  {
    slug: "mejores-restaurantes-isla-margarita",
    title: "Los 5 mejores restaurantes de Isla Margarita",
    content: `
      <p>Isla Margarita es conocida no solo por sus hermosas playas, sino también por su deliciosa gastronomía. Aquí te presentamos los 5 mejores restaurantes que no puedes dejar de visitar:</p>
      <br>
      <ol>
        <li><strong>La Casa del Pescador:</strong> Ubicado frente al mar, este restaurante ofrece los mejores pescados y mariscos frescos de la isla.</li>
        <li><strong>El Rancho de Pablo:</strong> Famoso por sus platos tradicionales venezolanos, especialmente por su pabellón criollo.</li>
        <li><strong>Bistro Mar y Tierra:</strong> Una fusión perfecta de cocina internacional y local, con una vista impresionante del atardecer.</li>
        <li><strong>La Fogata:</strong> Especializado en carnes a la parrilla, es el lugar ideal para los amantes del buen asado.</li>
        <li><strong>Agua y Sal:</strong> Un restaurante gourmet que ofrece una experiencia culinaria única, combinando sabores locales con técnicas modernas.</li>
      </ol>
      <br>
      <p>No importa cuál elijas, estos restaurantes te garantizan una experiencia gastronómica inolvidable en Isla Margarita.</p>
    `,
    image: "/restaurante.jpg",
  },
  {
    slug: "guia-playas-margarita",
    title: "Guía de playas imperdibles en Margarita",
    content: `
      <p>Isla Margarita es un paraíso para los amantes de la playa. Aquí te presentamos una guía de las playas más hermosas y menos conocidas de la isla:</p>
      <br>
      <ul>
        <li><strong>Playa El Agua:</strong> Una de las más populares, con arena dorada y aguas cristalinas.</li>
        <li><strong>Playa Parguito:</strong> Ideal para los surfistas, con olas perfectas para practicar este deporte.</li>
        <li><strong>Playa El Yaque:</strong> Conocida mundialmente por ser excelente para el windsurf y el kitesurf.</li>
        <li><strong>Playa La Restinga:</strong> Una playa tranquila dentro del Parque Nacional La Restinga, perfecta para relajarse.</li>
        <li><strong>Playa Punta Arenas:</strong> Una joya escondida con aguas tranquilas y poca afluencia de turistas.</li>
      </ul>
      <br>
      <p>Cada una de estas playas ofrece una experiencia única, desde deportes acuáticos hasta relajación total. ¡No te las pierdas en tu próxima visita a Isla Margarita!</p>
    `,
    image: "/playas.jpg",
  },
  {
    slug: "actividades-aventura-margarita",
    title: "Actividades de aventura en Isla Margarita",
    content: `
      <p>Isla Margarita no es solo sol y playa, también es un destino perfecto para los amantes de la aventura. Aquí te presentamos las mejores actividades para los más atrevidos:</p>
      <br>
      <ul>
        <li><strong>Windsurf y Kitesurf:</strong> Playa El Yaque es reconocida mundialmente como uno de los mejores lugares para practicar estos deportes.</li>
        <li><strong>Buceo:</strong> Explora los arrecifes de coral y la vida marina en lugares como Los Frailes o Cubagua.</li>
        <li><strong>Senderismo:</strong> Explora el Parque Nacional Cerro El Copey, con senderos que te llevan a impresionantes vistas de la isla.</li>
        <li><strong>Parapente:</strong> Disfruta de vistas panorámicas de la isla desde el aire, con despegues desde el Cerro Guayamurí.</li>
        <li><strong>Pesca deportiva:</strong> Participa en excursiones de pesca en alta mar y atrapa especies como el pez vela o el atún.</li>
      </ul>
      <br>
      <p>Estas actividades te garantizan una dosis de adrenalina y aventura durante tu estancia en Isla Margarita. ¡Atrévete a probarlas todas!</p>
    `,
    image: "/actividad.jpg",
  },
];

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const articulo = articulos.find((a) => a.slug === slug);

  if (!articulo) {
    return <div>Artículo no encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-secondary pt-24">
      <div className="container mx-auto px-4 py-12">
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden"
        >
          <img
            src={articulo.image || "/placeholder.svg"}
            alt={articulo.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-primary mb-4">
              {articulo.title}
            </h1>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: articulo.content }}
            />
          </div>
        </motion.article>
      </div>
    </div>
  );
}
