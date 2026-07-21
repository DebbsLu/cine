import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { eliminarVentaExistente, editarVentaExistente } from '../redux/slices/reservasSlice';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FormularioReserva } from './FormularioReserva';
import { Reserva } from '../types/reserva';

const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const dataGraficoMock = [
  { name: 'Dom', ventas: 30 }, { name: 'Lun', ventas: 45 }, { name: 'Mar', ventas: 25 },
  { name: 'Jue', ventas: 90 }, { name: 'Vie', ventas: 75 }, { name: 'Sáb', ventas: 120 },
];

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const peliculas = useAppSelector((state) => state.peliculas.lista);
  
  const funciones = useAppSelector((state) => state.funciones.lista);
  const ventas = useAppSelector((state) => state.reservas.ventas);

const ventasPorDia: Record<string, number> = {
  Dom: 0,
  Lun: 0,
  Mar: 0,
  Mié: 0,
  Jue: 0,
  Vie: 0,
  Sáb: 0,
};

ventas.forEach((venta: Reserva) => {
  const dia = dias[new Date(venta.fechaVenta).getDay()];
  ventasPorDia[dia] += venta.asientos.length;
});

const dataGrafico = dias.map((dia) => ({
  name: dia,
  ventas: ventasPorDia[dia],
}));

  const [modalAbierto, setModalAbierto] = useState(false);
  const [seccion, setSeccion] = useState<'inicio' | 'ventas'>('inicio');

  // Cálculos Automáticos
  const totalPeliculas = peliculas.length;
  const totalFunciones = funciones.length; 
  const totalBoletos = ventas.reduce((acc, v) => acc + v.asientos.length, 0);
  const ingresos = ventas.reduce((acc, v) => acc + v.monto, 0);

  // Asientos
  const capacidadTotal = totalFunciones * 60;
  const asientosOcupados = totalBoletos;
  const asientosDisponibles = capacidadTotal - asientosOcupados;

  // Película más reservada (Buscando por p.codigo)
const conteoPeliculas: Record<string, number> = {};

ventas.forEach((venta) => {

  const funcion = funciones.find(
    f => f.id === venta.funcionId
  );

  if (!funcion) return;

  conteoPeliculas[funcion.peliculaId] =
    (conteoPeliculas[funcion.peliculaId] || 0) +
    venta.asientos.length;

});

const funcionesDisponibles = funciones.filter((funcion) => {
  const pelicula = peliculas.find(
    p => p.codigo === funcion.peliculaId
  );

  return pelicula?.estado === "Disponible";
});

const codigoMasReservada = Object.keys(conteoPeliculas).reduce(
  (a, b) =>
    conteoPeliculas[a] > conteoPeliculas[b] ? a : b,
  ''
);

const peliculaMasReservada =
  peliculas.find(
    p => p.codigo === codigoMasReservada
  )?.nombre || 'Ninguna';

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-6 text-slate-800">
      
      {/* Header / Tabs */}
      <div className="bg-white p-4 rounded-xl border flex justify-between items-center shadow-sm">
        <div className="flex gap-4 font-bold text-sm">
          <button onClick={() => setSeccion('inicio')} className={`px-3 py-1.5 rounded ${seccion === 'inicio' ? 'bg-slate-900 text-white' : 'text-gray-500'}`}>Inicio</button>
          <button onClick={() => setSeccion('ventas')} className={`px-3 py-1.5 rounded ${seccion === 'ventas' ? 'bg-slate-900 text-white' : 'text-gray-500'}`}>Ventas</button>
        </div>
        <div className="w-7 h-7 bg-gray-200 rounded-full" />
      </div>

      {seccion === 'inicio' ? (
        <>
          {/* Tarjetas KPI */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 border rounded-xl shadow-sm">
              <p className="text-[11px] font-bold text-gray-400 uppercase">Total Películas</p>
              <p className="text-2xl font-black text-gray-800 mt-1">{totalPeliculas}</p>
            </div>
            <div className="bg-white p-4 border rounded-xl shadow-sm">
              <p className="text-[11px] font-bold text-gray-400 uppercase">Boletos Vendidos</p>
              <p className="text-2xl font-black text-gray-800 mt-1">{totalBoletos}</p>
            </div>
            <div className="bg-white p-4 border rounded-xl shadow-sm">
              <p className="text-[11px] font-bold text-gray-400 uppercase">Ingresos Generados</p>
              <p className="text-2xl font-black text-gray-800 mt-1">${ingresos.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 border rounded-xl shadow-sm">
              <p className="text-[11px] font-bold text-gray-400 uppercase">Asientos Libres / Ocupados</p>
              <p className="text-sm font-bold text-gray-700 mt-2">Disp: {asientosDisponibles} | Ocup: {asientosOcupados}</p>
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={() => { console.log("Abriendo modal"); setModalAbierto(true)}} className="bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow uppercase">
              + Nueva Venta
            </button>
          </div>

          {/* Gráfico y Cartelera */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-white p-4 border rounded-xl shadow-sm">
              <h3 className="font-bold text-xs text-gray-500 mb-3 uppercase">Ventas del Día</h3>
              <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dataGrafico}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" fontSize={11} />
                    <YAxis fontSize={11} />
                    <Tooltip />
                    <Line type="monotone" dataKey="ventas" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-4 border rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-xs text-gray-500 mb-3 uppercase">Cartelera Disponible</h3>
                <div className="space-y-2">
                  
  {funcionesDisponibles.map((funcion) => {

  const pelicula = peliculas.find(
    p => p.codigo === funcion.peliculaId
  );

  if (!pelicula) return null;

  return (
    <div
      key={funcion.id}
      className="flex justify-between text-xs border-b pb-2"
    >
      <div>
        <p className="font-bold text-gray-700">
          {pelicula.nombre}
        </p>

        <p className="text-[10px] text-gray-400">
          {funcion.salaId} • {funcion.fecha}
        </p>

        <p className="text-[10px] text-gray-400">
          {funcion.hora}
        </p>
      </div>

      <span className="font-mono bg-slate-100 p-1 rounded font-bold text-[10px]">
        ${funcion.precio.toFixed(2)}
      </span>
    </div>
  );

})}
                </div>
              </div>
              <p className="text-[10px] text-gray-400 uppercase mt-4">Top Reservada: <strong className="text-gray-700">{peliculaMasReservada}</strong></p>
            </div>
          </div>
        </>
      ) : (
        /* Apartado de Ventas */
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b font-bold text-gray-500">
                <th className="p-3">IdVenta</th>
                <th className="p-3">Fecha y Hora</th>
                <th className="p-3">Película</th>
                <th className="p-3">Cliente</th>
                <th className="p-3 text-right">Monto</th>
                <th className="p-3 text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
      {ventas.map((v) => {
          const funcion = funciones.find(
              f => f.id === v.funcionId
          );
          const pelicula = peliculas.find(
              p => p.codigo === funcion?.peliculaId
          );
          return (
                  <tr key={v.idVenta} className="border-b hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-gray-500">{v.idVenta}</td>
                    <td className="p-3 text-gray-500">
                      {funcion ? `${funcion.fecha} ${funcion.hora}` : 'Sin función'}
                    </td>
                    <td className="p-3 font-bold text-gray-800">{pelicula?.nombre}</td> {/* Usando nombre */}
                    <td className="p-3">{v.cliente}</td>
                    <td className="p-3 text-right font-bold">${v.monto.toFixed(2)}</td>
                    <td className="p-3 text-center">
                      <span className="bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded text-[10px]">{v.estado}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {modalAbierto && <FormularioReserva onClose={() => setModalAbierto(false)} />}
    </div>
  );
};