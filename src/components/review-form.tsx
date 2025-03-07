"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface ReviewFormProps {
  roomId: string;
  onReviewSubmitted: () => void;
}

export function ReviewForm({ roomId, onReviewSubmitted }: ReviewFormProps) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, review, rating }),
      });

      if (response.ok) {
        toast({
          title: "Reseña enviada",
          description: "Tu reseña ha sido enviada exitosamente.",
        });
        setReview("");
        setRating(5);
        onReviewSubmitted();
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Ocurrió un error al enviar la reseña. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Escribe tu reseña aquí"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      />
      <div>
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-gray-700"
        >
          Calificación
        </label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value} {value === 1 ? "estrella" : "estrellas"}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit">Enviar Reseña</Button>
    </form>
  );
}
