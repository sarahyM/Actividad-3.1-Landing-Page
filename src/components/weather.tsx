"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  city: string;
}

const fallbackWeather: WeatherData = {
  temperature: 25,
  humidity: 70,
  description: "parcialmente nublado",
  city: "Trujillo",
};

export function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/weather?city=Trujillo,ve&lang=es`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setWeather({
          temperature: data.main.temp,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          city: data.name,
        });
      } catch (err) {
        console.error("Error fetching weather:", err);
        setWeather(fallbackWeather);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12 bg-gradient-to-br from-blue-400 to-teal-500 text-white">
        <p className="text-xl">Cargando datos del clima...</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="flex justify-center items-center py-12 bg-gradient-to-br from-blue-400 to-teal-500 text-white">
        <p className="text-xl">No hay datos del clima disponibles.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 bg-gradient-to-br from-blue-400 to-teal-500 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-4">Clima en {weather.city}</h2>
      <motion.p
        className="text-5xl font-bold mb-2"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
      >
        {Math.round(weather.temperature)}°C
      </motion.p>
      <p className="text-xl capitalize mb-2">{weather.description}</p>
      <p className="text-lg">Humedad: {weather.humidity}%</p>
    </motion.div>
  );
}
