export interface Reserva {
  idVenta: string; // Automático
  fechaHoraFuncion: string; // Colocada en dashboard / elegida
  peliculaId: string;
  cliente: string;
  email: string;
  telefono: string;
  asientos: string[]; // Ej: ['A-1', 'A-2']
  monto: number;
  estado: 'Completa' | 'Pendiente';
}