// src/components/TablaPeliculas.tsx
'use client';
import React from 'react';
import { Pelicula } from '../types/pelicula';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { deletePelicula } from '../redux/slices/peliculasSlice';

interface TablaPeliculasProps {
  onEditar: (pelicula: Pelicula) => void;
}

export default function TablaPeliculas({ onEditar }: TablaPeliculasProps) {
  const dispatch = useAppDispatch();
  const { lista, filtros } = useAppSelector((state) => state.peliculas);

  // Lógica de filtrado combinada
  const peliculasFiltradas = lista.filter((p) => {
    const cumpleBusqueda = p.nombre.toLowerCase().includes(filtros.buscar.toLowerCase());
    const cumpleGenero = filtros.genero === '' || p.genero === filtros.genero;
    const cumpleIdioma = filtros.idioma === '' || p.idioma === filtros.idioma;
    return cumpleBusqueda && cumpleGenero && cumpleIdioma;
  });

  return (
    <div className="overflow-x-auto border rounded-xl shadow-sm bg-white text-black">
      <table className="w-full border-collapse text-left text-sm text-gray-600">
        <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-700 border-b">
          <tr>
            <th className="px-6 py-4">Código</th>
            <th className="px-6 py-4">Título</th>
            <th className="px-6 py-4">Género / Idioma</th>
            <th className="px-6 py-4">Duración</th>
            <th className="px-6 py-4">Clasif.</th>
            <th className="px-6 py-4">Sala/Precio</th>
            <th className="px-6 py-4">Estado</th>
            <th className="px-6 py-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {peliculasFiltradas.map((p) => (
            <tr key={p.codigo} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-mono text-xs">{p.codigo}</td>
              <td className="px-6 py-4 font-semibold text-gray-900">{p.nombre}</td>
              <td className="px-6 py-4">{p.genero} <span className="text-xs text-gray-400">({p.idioma})</span></td>
              <td className="px-6 py-4">{p.duracion}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded text-xs font-bold ${p.clasificacion === 'A' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                  {p.clasificacion}
                </span>
              </td>
              <td className="px-6 py-4">{p.salaAsignada} — ${p.precioEntrada.toFixed(2)}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.estado === 'Disponible' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                  {p.estado === 'Disponible' ? 'Activa' : 'Inactiva'}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                  <button onClick={() => onEditar(p)} className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-xs font-semibold">
                    Editar
                  </button>
                  <button onClick={() => dispatch(deletePelicula(p.codigo))} className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-semibold">
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {peliculasFiltradas.length === 0 && (
            <tr>
              <td colSpan={8} className="text-center py-8 text-gray-400">No se encontraron películas.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}