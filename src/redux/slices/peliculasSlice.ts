// src/redux/slices/peliculasSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//Importamos los tipos de datos de Pelicula desde el archivo types/pelicula.ts
import { Pelicula } from '../../types/pelicula';

interface PeliculasState {
  lista: Pelicula[];
  filtros: {
    buscar: string;
    genero: string;
    idioma: string;
  };
}

const initialState: PeliculasState = {
  lista: [
    // Datos semilla basados copiados de imagen de ref
    { codigo: '1', nombre: 'Avengers: Endgame', genero: 'Acción', duracion: '130 min', clasificacion: 'B15', salaAsignada: 'Sala 1', precioEntrada: 5.50, estado: 'Disponible', idioma: 'Español' },
    { codigo: '2', nombre: 'The Lion King', genero: 'Animación', duracion: '120 min', clasificacion: 'A', salaAsignada: 'Sala 2', precioEntrada: 4.50, estado: 'Disponible', idioma: 'Inglés' },
  ],
  filtros: {
    buscar: '',
    genero: '',
    idioma: '',
  }
};

const peliculasSlice = createSlice({
  name: 'peliculas',
  initialState,
  reducers: {
    addPelicula: (state, action: PayloadAction<Pelicula>) => {
      const existe = state.lista.some(p => p.codigo === action.payload.codigo);
      if (!existe) {
        state.lista.push(action.payload);
      } else {
        alert("Error: El código de la película ya existe.");
      }
    },
    deletePelicula: (state, action: PayloadAction<string>) => {
      state.lista = state.lista.filter(p => p.codigo !== action.payload);
    },
    updatePelicula: (state, action: PayloadAction<Pelicula>) => {
      const index = state.lista.findIndex(p => p.codigo === action.payload.codigo);
      if (index !== -1) {
        state.lista[index] = action.payload;
      }
    },
    setFiltros: (state, action: PayloadAction<Partial<PeliculasState['filtros']>>) => {
      state.filtros = { ...state.filtros, ...action.payload };
    }
  }
});

export const { addPelicula, deletePelicula, updatePelicula, setFiltros } = peliculasSlice.actions;
export default peliculasSlice.reducer;