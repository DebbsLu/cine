// src/components/Filtros.tsx
'use client';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setFiltros } from '../redux/slices/peliculasSlice';
import { GENEROS } from '../data/generos';
import { IDIOMAS } from '../data/idiomas';

export default function Filtros() {
  const dispatch = useAppDispatch();
  const filtros = useAppSelector((state) => state.peliculas.filtros);

  return (
    <div className="flex flex-wrap gap-3 items-center mb-6">
      <input
        type="text"
        placeholder="🔍 Buscar por nombre..."
        value={filtros.buscar}
        onChange={(e) => dispatch(setFiltros({ buscar: e.target.value }))}
        className="border p-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
      />
      
<select
  value={filtros.genero}
  onChange={(e) =>
    dispatch(setFiltros({ genero: e.target.value }))
  }
  className="border p-2 rounded-lg text-black bg-white"
>
  <option value="">Género (Todos)</option>

  {GENEROS.map((genero) => (
    <option key={genero} value={genero}>
      {genero}
    </option>
  ))}
</select>

      <select
        value={filtros.idioma}
        onChange={(e) => dispatch(setFiltros({ idioma: e.target.value }))}
        className="border p-2 rounded-lg text-black bg-white"
      >
<option value="">Idioma (Todos)</option>

{IDIOMAS.map((idioma) => (
  <option
    key={idioma}
    value={idioma}
  >
    {idioma}
  </option>
))}
      </select>
    </div>
  );
}