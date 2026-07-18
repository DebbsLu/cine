import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Reserva } from '../../types/reserva';

interface ReservasState {
  ventas: Reserva[];
}

const initialState: ReservasState = {
  ventas: [
    {
      idVenta: '10001',
      fechaHoraFuncion: '03/07/2026 03:00 pm',
      peliculaId: '1', // ID de Avengers
      cliente: 'Juan Pérez',
      email: 'juan@mail.com',
      telefono: '7766-5544',
      asientos: ['A-1'],
      monto: 13.00,
      estado: 'Completa'
    },
    {
      idVenta: '10020',
      fechaHoraFuncion: '05/07/2026 05:30 pm',
      peliculaId: '1',
      cliente: 'María López',
      email: 'maria@mail.com',
      telefono: '7123-4567',
      asientos: ['B-1'],
      monto: 18.00,
      estado: 'Completa'
    }
  ]
};

const reservasSlice = createSlice({
  name: 'reservas',
  initialState,
  reducers: {
    agregarNuevaVenta: (state, action: PayloadAction<Omit<Reserva, 'idVenta'>>) => {
      const nuevoId = String(10000 + state.ventas.length + 1);
      state.ventas.push({
        ...action.payload,
        idVenta: nuevoId
      });
    },
    eliminarVentaExistente: (state, action: PayloadAction<string>) => {
      state.ventas = state.ventas.filter(v => v.idVenta !== action.payload);
    },
    editarVentaExistente: (state, action: PayloadAction<Reserva>) => {
      const index = state.ventas.findIndex(v => v.idVenta === action.payload.idVenta);
      if (index !== -1) {
        state.ventas[index] = action.payload;
      }
    }
  }
});

export const { agregarNuevaVenta, eliminarVentaExistente, editarVentaExistente } = reservasSlice.actions;
export default reservasSlice.reducer;