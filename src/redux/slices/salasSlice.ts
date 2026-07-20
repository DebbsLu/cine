import { createSlice } from '@reduxjs/toolkit';
import { Sala, Asiento } from '../../types/asiento'; // <--- Importamos Asiento

const crearAsientos = (): Asiento[] => { // Usa Asiento[] directamente, es más limpio
  // Le dices a TS: "este array contiene Asientos estrictos"
  const asientos: Asiento[] = []; 

  const filas = ['A','B','C','D','E'];

  for (const fila of filas) {
    for (let i = 1; i <= 12; i++) {
      asientos.push({
        id: `${fila}-${i}`,
        fila,
        numero: i,
        tipo: 'regular',     // Ya no falla: TS sabe que 'regular' es válido para Asiento
        estado: 'disponible' // Ya no falla: coincide exactamente con el tipo
      });
    }
  }

  return asientos;
};

const initialState = {

  lista: [

    {
      id: 'Sala 1',
      asientos: crearAsientos()
    },

    {
      id: 'Sala 2',
      asientos: crearAsientos()
    },

    {
      id: 'Sala 3',
      asientos: crearAsientos()
    }

  ]

};

const salasSlice = createSlice({

  name: 'salas',

  initialState,

  reducers: {}

});

export default salasSlice.reducer;