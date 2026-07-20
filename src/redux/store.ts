// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import peliculasReducer from './slices/peliculasSlice';
import reservasReducer from './slices/reservasSlice';
import funcionesReducer from './slices/funcionesSlice';
import salasReducer from './slices/salasSlice';

export const store = configureStore({
  reducer: {
    peliculas: peliculasReducer,
    reservas: reservasReducer,
    funciones: funcionesReducer,
    salas: salasReducer
    // Agrega aquí otros reducers si los tienes
    // Aquí podrás agregar los reducers de reservas o salas más adelante
  },
});

// Estos tipos son CRUCIALES para TypeScript. 
// Le dicen a Redux cómo luce exactamente tu estado global y tus acciones.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;