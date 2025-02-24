import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || "Trujillo,ve";
  const lang = searchParams.get("lang") || "es";

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${lang}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`OpenWeather API error: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching weather:", error);
    // Devolver datos estáticos para Trujillo
    return NextResponse.json({
      name: "Trujillo",
      main: {
        temp: 25,
        humidity: 70,
      },
      weather: [
        {
          description: "parcialmente nublado",
        },
      ],
    });
  }
}
