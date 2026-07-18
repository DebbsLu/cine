// src/types/pelicula.ts
export interface Pelicula {
  codigo: string;          // Único
  nombre: string;          // Obligatorio
  genero: string;
  duracion: string;        // Ej: "130 min"
  clasificacion: string;   // Ej: "A", "B15"
  salaAsignada: string;
  precioEntrada: number;
  estado: 'Disponible' | 'No disponible'; 
  idioma: string;          // Requerido según filtros 
}