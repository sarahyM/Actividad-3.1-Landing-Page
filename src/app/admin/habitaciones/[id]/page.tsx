"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function HabitacionDetallePage() {
  const params = useParams();
  const id = params.id;

  const [habitacion, setHabitacion] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: "5",
    comment: "",
    userName: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);

    fetchHabitacion();
    fetchReviews();
  }, []);

  const fetchHabitacion = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/habitaciones/${id}`);
      if (!res.ok) {
        throw new Error("Error al obtener la habitación");
      }
      const data = await res.json();
      setHabitacion(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?habitacionId=${id}`);
      if (!res.ok) {
        throw new Error("Error al obtener reviews");
      }
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleRatingChange = (value) => {
    setReviewData({ ...reviewData, rating: value });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("Debes iniciar sesión para dejar una review");
      return;
    }

    if (!reviewData.comment || !reviewData.userName) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      setReviewLoading(true);
      const token = localStorage.getItem("userToken");

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...reviewData,
          habitacionId: id,
        }),
      });

      if (!res.ok) {
        throw new Error("Error al enviar la review");
      }

      // Limpiar formulario y recargar reviews
      setReviewData({
        rating: "5",
        comment: "",
        userName: "",
      });

      fetchReviews();
      fetchHabitacion(); // Para actualizar la evaluación
    } catch (error) {
      console.error("Error:", error);
      alert("Error al enviar la review");
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-16 w-16 animate-spin" />
      </div>
    );
  }

  if (!habitacion) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-center">
          Habitación no encontrada
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={habitacion.imagen || "/placeholder.svg"}
              alt={habitacion.nombre}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary mb-4">
              {habitacion.nombre}
            </h1>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(habitacion.evaluacion)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-600 dark:text-gray-400">
                ({habitacion.evaluacion}/5)
              </span>
            </div>
            <div
              className="prose dark:prose-invert mb-6"
              dangerouslySetInnerHTML={{ __html: habitacion.descripcion }}
            />
            <p className="text-2xl font-bold text-primary mb-6">
              ${habitacion.tarifa} / noche
            </p>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Comodidades:</h2>
              <div
                className="prose dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: habitacion.comodidades }}
              />
            </div>
            <Button className="w-full">Reservar Ahora</Button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>

          {isLoggedIn && (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmitReview}>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Tu nombre
                      </label>
                      <input
                        type="text"
                        name="userName"
                        value={reviewData.userName}
                        onChange={handleReviewChange}
                        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Calificación
                      </label>
                      <Select
                        value={reviewData.rating}
                        onValueChange={handleRatingChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una calificación" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 - Pobre</SelectItem>
                          <SelectItem value="2">2 - Regular</SelectItem>
                          <SelectItem value="3">3 - Bueno</SelectItem>
                          <SelectItem value="4">4 - Muy Bueno</SelectItem>
                          <SelectItem value="5">5 - Excelente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Tu comentario
                      </label>
                      <Textarea
                        name="comment"
                        value={reviewData.comment}
                        onChange={handleReviewChange}
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={reviewLoading}>
                      {reviewLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        "Enviar Review"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {reviews.length > 0 ? (
            <div className="grid gap-4">
              {reviews.map((review) => (
                <Card key={review._id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{review.userName}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No hay reviews para esta habitación. ¡Sé el primero en dejar una!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
