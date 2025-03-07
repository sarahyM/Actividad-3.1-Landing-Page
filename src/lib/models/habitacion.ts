import mongoose from "mongoose";

const habitacionSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    comodidades: { type: String, required: true },
    imagen: { type: String },
    tarifa: { type: Number, required: true },
    capacidad: { type: Number, required: true, default: 2 },
    caracteristicas: { type: [String], default: [] },
    evaluacion: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
  },
  { timestamps: true }
);

export const Habitacion =
  mongoose.models.Habitacion || mongoose.model("Habitacion", habitacionSchema);
