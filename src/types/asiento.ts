export type EstadoAsiento = 'Disponible' | 'Reservado';

export interface Asiento {
  id: string; // Ej: 'A-1'
  fila: string;
  numero: number;
  tipo: 'regular' | 'preferencial';
  estado: 'disponible' | 'ocupado';
}

export interface Sala {
  id: string; // Ej: "Sala 1"
  asientos: Asiento[];
}