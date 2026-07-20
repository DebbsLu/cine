import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Funcion } from '../../types/funcion';

interface FuncionesState {
  lista: Funcion[];
}

const initialState: FuncionesState = {
  lista: [
    {
      id: 'F001',
      peliculaId: '1',
      salaId: 'Sala 1',
      fecha: '2026-07-20',
      hora: '14:00',
      precio: 5.50
    },
    {
      id: 'F002',
      peliculaId: '2',
      salaId: 'Sala 2',
      fecha: '2026-07-20',
      hora: '15:00',
      precio: 4.50
    }
  ]
};

const funcionesSlice = createSlice({
  name: 'funciones',
  initialState,
  reducers: {

    addFuncion: (state, action: PayloadAction<Funcion>) => {

      const existe = state.lista.some(
        f =>
          f.salaId === action.payload.salaId &&
          f.fecha === action.payload.fecha &&
          f.hora === action.payload.hora
      );

      if (existe) {
        alert('Ya existe una función en esa sala, fecha y horario.');
        return;
      }

      state.lista.push(action.payload);

    },

    updateFuncion: (state, action: PayloadAction<Funcion>) => {

      const conflicto = state.lista.some(
        f =>
          f.id !== action.payload.id &&
          f.salaId === action.payload.salaId &&
          f.fecha === action.payload.fecha &&
          f.hora === action.payload.hora
      );

      if (conflicto) {
        alert('La sala ya tiene otra función asignada en ese horario.');
        return;
      }

      const index = state.lista.findIndex(
        f => f.id === action.payload.id
      );

      if (index !== -1) {
        state.lista[index] = action.payload;
      }

    },

    deleteFuncion: (state, action: PayloadAction<string>) => {
      state.lista = state.lista.filter(
        f => f.id !== action.payload
      );
    }

  }
});

export const {
  addFuncion,
  updateFuncion,
  deleteFuncion
} = funcionesSlice.actions;

export default funcionesSlice.reducer;