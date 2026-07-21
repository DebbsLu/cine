export type EstadoAsiento = 'disponible' | 'ocupado'; // Ponlo igual a como lo uses

export interface Asiento {
  id: string;
  fila: string;
  numero: number;
  tipo: 'regular' | 'preferencial';
  estado: EstadoAsiento; // <--- Usa el tipo aquí para que esté conectado
}

export interface Sala {
  id: string; // Ej: "Sala 1"
  asientos: Asiento[];
}