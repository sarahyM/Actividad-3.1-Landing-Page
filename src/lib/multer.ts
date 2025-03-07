import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

// Asegurarse de que el directorio de uploads exista
const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Función para procesar la subida de archivos
export async function processFileUpload(
  formData: FormData,
  fieldName: string
): Promise<string | null> {
  const file = formData.get(fieldName) as File;

  if (!file || !(file instanceof File)) return null;

  // Verificar que es una imagen
  if (!file.type.startsWith("image/")) {
    throw new Error("Solo se permiten archivos de imagen");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Crear un nombre de archivo único
  const uniqueFilename = `${uuidv4()}${path.extname(file.name)}`;
  const filePath = path.join(uploadDir, uniqueFilename);

  // Guardar el archivo
  fs.writeFileSync(filePath, buffer);

  // Devolver la ruta relativa para acceder al archivo
  return `/uploads/${uniqueFilename}`;
}
