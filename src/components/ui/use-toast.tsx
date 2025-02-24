"use client";

import { useState, useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
}

export function useToast() {
  const [toast, setToast] = useState<ToastProps | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, toast.duration || 3000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (props: ToastProps) => {
    setToast(props);
  };

  return { toast, showToast };
}

export function Toast({ message, type }: ToastProps) {
  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md text-white ${bgColor}`}
    >
      {message}
    </div>
  );
}
