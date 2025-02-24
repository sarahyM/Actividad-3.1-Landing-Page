"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedSection } from "./animated-section";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Subscribed:", email);
    setEmail("");
    alert("¡Gracias por suscribirte!");
  };

  return (
    <section className="bg-secondary py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-primary mb-4">
              Suscríbase a nuestro boletín
            </h2>
            <p className="text-gray-600 mb-8">
              Manténgase al día de nuestras últimas ofertas y noticias
            </p>
          </AnimatedSection>
          <AnimatedSection>
            <form onSubmit={handleSubmit} className="flex gap-4">
              <Input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow"
              />
              <Button type="submit">¡Suscribete!</Button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
