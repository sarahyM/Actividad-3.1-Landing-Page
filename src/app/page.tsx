import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Servicios } from "@/components/servicios";
import { Weather } from "@/components/weather";
import { Blog } from "@/components/blog";
import { Testimonios } from "@/components/testimonios";
import { Newsletter } from "@/components/newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Servicios />
      <Weather />
      <Blog />
      <Testimonios />
      <Newsletter />
    </>
  );
}
