// src/components/FormularioPelicula.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Pelicula } from '../types/pelicula';

interface FormularioPeliculaProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pelicula: Pelicula) => void;
  peliculaEdicion?: Pelicula | null;
}

export default function FormularioPelicula({ isOpen, onClose, onSave, peliculaEdicion }: FormularioPeliculaProps) {
  const [form, setForm] = useState<Pelicula>({
    codigo: '', nombre: '', genero: '', duracion: '',
    clasificacion: 'A', salaAsignada: '', precioEntrada: 0, estado: 'Disponible', idioma: ''
  });

  useEffect(() => {
    if (peliculaEdicion) {
      setForm(peliculaEdicion);
    } else {
      setForm({
        codigo: '', nombre: '', genero: '', duracion: '',
        clasificacion: 'A', salaAsignada: '', precioEntrada: 0, estado: 'Disponible', idioma: ''
      });
    }
  }, [peliculaEdicion, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim()) return alert("El nombre de la película es obligatorio");
    if (!form.codigo.trim()) return alert("El código es obligatorio");
    
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 text-black">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-gray-100 p-4 flex justify-between items-center border-b">
          <h3 className="font-bold text-lg text-gray-800">
            {peliculaEdicion ? 'EDITAR PELÍCULA' : 'AGREGAR PELÍCULA'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Código único</label>
              <input
                type="text"
                disabled={!!peliculaEdicion}
                value={form.codigo}
                onChange={e => setForm({...form, codigo: e.target.value})}
                className="w-full border p-2 rounded disabled:bg-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Título / Nombre</label>
              <input
                type="text"
                value={form.nombre}
                onChange={e => setForm({...form, nombre: e.target.value})}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Género</label>
              <input
                type="text"
                value={form.genero}
                onChange={e => setForm({...form, genero: e.target.value})}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Duración</label>
              <input
                type="text"
                placeholder="Ej: 120 min"
                value={form.duracion}
                onChange={e => setForm({...form, duracion: e.target.value})}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Clasificación</label>
              <select value={form.clasificacion} onChange={e => setForm({...form, clasificacion: e.target.value})} className="w-full border p-2 rounded bg-white">
                <option value="A">A (Todo público)</option>
                <option value="B15">B15 (+15 años)</option>
                <option value="C">C (Adultos)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Idioma</label>
              <input
                type="text"
                value={form.idioma}
                onChange={e => setForm({...form, idioma: e.target.value})}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Sala Asignada</label>
              <input
                type="text"
                value={form.salaAsignada}
                onChange={e => setForm({...form, salaAsignada: e.target.value})}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Precio de Entrada</label>
              <input
                type="number"
                step="0.01"
                value={form.precioEntrada}
                onChange={e => setForm({...form, precioEntrada: parseFloat(e.target.value) || 0})}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Estado</label>
            <select value={form.estado} onChange={e => setForm({...form, estado: e.target.value as any})} className="w-full border p-2 rounded bg-white">
              <option value="Disponible">Disponible (Activa)</option>
              <option value="No disponible">No disponible (Inactiva)</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">Cancelar</button>
            <button type="submit" className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}