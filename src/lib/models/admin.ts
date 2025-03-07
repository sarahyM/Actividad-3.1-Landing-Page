import mongoose from "mongoose";
import { hashPassword } from "@/lib/auth";

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

// Middleware para hashear la contraseña antes de guardar
adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

export const Admin =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);
