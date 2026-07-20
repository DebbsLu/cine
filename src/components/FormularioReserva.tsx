import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { agregarNuevaVenta } from '../redux/slices/reservasSlice';
import { Pelicula } from '../types/pelicula';
import { Funcion } from '../types/funcion';
import Filtros from './Filtros';
import { MapaAsientos } from './MapaAsientos';

interface FormularioReservaProps {
  onClose: () => void;
}

export const FormularioReserva: React.FC<FormularioReservaProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const peliculas = useAppSelector((state) => state.peliculas.lista);
  const ventas = useAppSelector((state) => state.reservas.ventas);
  const funciones = useAppSelector(
    state => state.funciones.lista
);
  
  // 1. Traemos los filtros globales de Redux para usarlos en el filtrado lógico
  const filtros = useAppSelector((state) => state.peliculas.filtros);

  // Estados del Flujo Interno
  const [paso, setPaso] = useState<1 | 2 | 3>(1);
  const [peliculaSel, setPeliculaSel] = useState<Pelicula | null>(null);
  const [asientosSel, setAsientosSel] = useState<string[]>([]);

  const [funcionSel, setFuncionSel] =useState<Funcion | null>(null);

  // Info Cliente
  const [cliente, setCliente] = useState({ nombre: '', email: '', telefono: '' });

  // 2. Filtrado Lógico usando los campos exactos de tu Redux (buscar, genero, idioma)
  const peliculasFiltradas = peliculas.filter((p) => {
    const cumpleNombre = p.nombre.toLowerCase().includes((filtros.buscar || '').toLowerCase());
    const cumpleGenero = filtros.genero === '' || p.genero === filtros.genero;
    const cumpleIdioma = filtros.idioma === '' || p.idioma === filtros.idioma;
    
    return cumpleNombre && cumpleGenero && cumpleIdioma;
  });

  const funcionesDisponibles = funciones.filter(
    f =>
    f.peliculaId === peliculaSel?.codigo
  );

  const asientosOcupados = ventas
    .filter(
    v=>v.funcionId===funcionSel?.id
    )
    .flatMap(
    v=>v.asientos 
    );

  const handleToggleAsiento = (id: string) => {
    if (asientosSel.includes(id)) {
      setAsientosSel(asientosSel.filter((a) => a !== id));
    } else {
      setAsientosSel([...asientosSel, id]);
    }
  };

  const precio =
  peliculaSel?.precioEntrada ?? 0;

  const totalPagar =
  precio * asientosSel.length;

const handleConfirmarPago = (e: React.FormEvent) => {
    e.preventDefault();

    if (!peliculaSel || !funcionSel || asientosSel.length === 0)
        return;

    dispatch(
        agregarNuevaVenta({
            funcionId: funcionSel.id,
            cliente: cliente.nombre,
            email: cliente.email,
            telefono: cliente.telefono,
            asientos: asientosSel,
            monto: totalPagar,
            estado: 'Completa'
        })
    );

    onClose();
};

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-50 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-bold text-gray-800 text-lg">Nueva Venta de Entradas</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {paso === 1 && (
            <div className="space-y-4">
              {/* 3. Ahora Filtros se renderiza limpio, sin pasarle ninguna prop */}
              <Filtros />
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                {peliculasFiltradas.map((p) => (
                  <div
                    key={p.codigo}
                    onClick={() => { setPeliculaSel(p); setPaso(2); }}
                    className="p-4 border border-gray-200 rounded-xl bg-white hover:border-blue-500 cursor-pointer shadow-sm text-center"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 text-lg">🎬</div>
                    <h4 className="font-bold text-sm text-gray-800">{p.nombre}</h4>
                    <p className="text-xs text-gray-400 mt-1">{p.genero} • {p.salaAsignada}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

{paso === 2 && peliculaSel && (
<div className="space-y-6">
    <div>
        <h2 className="text-2xl font-bold">
            {peliculaSel.nombre}
        </h2>
        <p className="text-gray-500">
            Seleccione un horario disponible
        </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {funcionesDisponibles.map(funcion => (
            <div
                key={funcion.id}
                className="bg-white rounded-xl border p-5 shadow-sm"
            >
                <p>
                    <strong>Sala:</strong>
                    {funcion.salaId}
                </p>
                <p>
                    <strong>Fecha:</strong>
                    {funcion.fecha}
                </p>
                <p>
                    <strong>Hora:</strong>
                    {funcion.hora}
                </p>
                <p>
                    <strong>Precio:</strong>
                    ${funcion.precio.toFixed(2)}
                </p>
                <button onClick={() => {
                        setFuncionSel(funcion);
                     setPaso(3);
                    }}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
                >
                    Seleccionar Función
                </button>
            </div>
        ))}
    </div>
    <button
        onClick={() => setPaso(1)}
        className="text-sm underline"
    >
        Volver
    </button>
</div>
)}

{paso === 3 && peliculaSel && funcionSel && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
    {/* Columna izquierda: resumen */}
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        {peliculaSel.nombre}
      </h3>

      <div className="bg-slate-50 p-4 rounded-lg text-sm space-y-2 text-gray-700">
        <p><strong>Sala:</strong> {funcionSel.salaId}</p>
        <p><strong>Fecha:</strong> {funcionSel.fecha}</p>
        <p><strong>Hora:</strong> {funcionSel.hora}</p>
        <p><strong>Idioma:</strong> {peliculaSel.idioma}</p>
        <p><strong>Clasificación:</strong> {peliculaSel.clasificacion}</p>
        <p><strong>Precio por boleto:</strong> ${funcionSel.precio.toFixed(2)}</p>
        <p><strong>Boletos:</strong> {asientosSel.length}</p>
        <p><strong>Asientos:</strong> {asientosSel.join(', ') || 'Ninguno'}</p>
      </div>

      <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
        <p className="text-lg font-bold text-emerald-700">
          Total a pagar: ${totalPagar.toFixed(2)}
        </p>
      </div>
    </div>

    {/* Columna derecha: mapa de asientos */}
    <div>
      <MapaAsientos
        asientosOcupados={asientosOcupados}
        asientosSeleccionados={asientosSel}
        onToggleAsiento={handleToggleAsiento}
      />
    </div>

    {/* Formulario cliente */}
    <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-800 border-b pb-2 mb-4">
        Datos del Cliente
      </h3>

      <form onSubmit={handleConfirmarPago} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            required
            placeholder="Nombre del cliente"
            value={cliente.nombre}
            onChange={(e) =>
              setCliente({ ...cliente, nombre: e.target.value })
            }
            className="w-full border p-2 text-sm rounded-lg"
          />

          <input
            type="email"
            required
            placeholder="Correo electrónico"
            value={cliente.email}
            onChange={(e) =>
              setCliente({ ...cliente, email: e.target.value })
            }
            className="w-full border p-2 text-sm rounded-lg"
          />

          <input
            type="text"
            required
            placeholder="Teléfono"
            value={cliente.telefono}
            onChange={(e) =>
              setCliente({ ...cliente, telefono: e.target.value })
            }
            className="w-full border p-2 text-sm rounded-lg"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => setPaso(2)}
            className="w-1/3 bg-gray-100 text-gray-700 py-3 rounded-lg font-bold text-sm hover:bg-gray-200"
          >
            Atrás
          </button>

          <button
            type="submit"
            disabled={asientosSel.length === 0 || !funcionSel}
            className="w-2/3 bg-emerald-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed uppercase tracking-wide"
          >
            Confirmar y Pagar
          </button>
        </div>
      </form>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
};