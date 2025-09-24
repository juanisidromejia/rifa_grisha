// src/utils/imageUtils.ts
import { readdir } from "fs/promises";
import { join } from "path";

export async function getImageFiles(folder: string): Promise<string[]> {
  try {
    const publicDir = join(process.cwd(), "public", "img", folder);
    const files = await readdir(publicDir);

    // Filtrar solo archivos de imagen
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    const imageFiles = files
      .filter((file) => {
        const ext = file.toLowerCase().substring(file.lastIndexOf("."));
        return imageExtensions.includes(ext);
      })
      .sort() // Ordenar alfabéticamente
      .map((file) => `/img/${folder}/${file}`);

    return imageFiles;
  } catch (error) {
    console.warn(`No se pudo leer la carpeta ${folder}:`, error);
    return [];
  }
}
