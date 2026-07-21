import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Reserva } from '../../types/reserva';

interface ReservasState {
  ventas: Reserva[];
}

const initialState: ReservasState = {
  ventas: [
    {
      idVenta: '10001',
      funcionId: 'F001',
      cliente: 'Juan Pérez',
      email: 'juan@mail.com',
      telefono: '7766-5544',
      asientos: ['A-1'],
      monto: 13.00,
      estado: 'Completa',
      fechaVenta: '2026-07-19T10:30:00'
    },
    {
      idVenta: '10002',
      funcionId: 'F002',
      cliente: 'María López',
      email: 'maria@mail.com',
      telefono: '7123-4567',
      asientos: ['B-1'],
      monto: 18.00,
      estado: 'Completa',
      fechaVenta: '2026-07-20T14:15:00'
    }
  ]
};

const reservasSlice = createSlice({
  name: 'reservas',
  initialState,
  reducers: {

    agregarNuevaVenta: (
      state,
      action: PayloadAction<Omit<Reserva, 'idVenta'>>
    ) => {

      const nuevoId = String(10000 + state.ventas.length + 1);

      state.ventas.push({
        idVenta: nuevoId,
        ...action.payload
      });

    },

    eliminarVentaExistente: (
      state,
      action: PayloadAction<string>
    ) => {

      state.ventas = state.ventas.filter(
        venta => venta.idVenta !== action.payload
      );

    },

    editarVentaExistente: (
      state,
      action: PayloadAction<Reserva>
    ) => {

      const index = state.ventas.findIndex(
        venta => venta.idVenta === action.payload.idVenta
      );

      if (index !== -1) {
        state.ventas[index] = action.payload;
      }

    }

  }
});

export const {
  agregarNuevaVenta,
  eliminarVentaExistente,
  editarVentaExistente
} = reservasSlice.actions;

export default reservasSlice.reducer;