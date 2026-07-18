import React from 'react';

interface MapaAsientosProps {
  asientosOcupados: string[];
  asientosSeleccionados: string[];
  onToggleAsiento: (id: string) => void;
}

export const MapaAsientos: React.FC<MapaAsientosProps> = ({
  asientosOcupados,
  asientosSeleccionados,
  onToggleAsiento
}) => {
  const filas = ['A', 'B', 'C', 'D', 'E', 'F'];
  const columnas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="bg-white p-4 border border-gray-200 rounded-xl text-center shadow-sm">
      <div className="w-full bg-gray-300 text-[10px] py-1 rounded mb-4 font-bold text-gray-600">PANTALLA</div>
      
      <div className="space-y-2">
        {filas.map((fila) => (
          <div key={fila} className="flex items-center justify-center gap-1.5">
            <span className="text-xs font-bold text-gray-400 w-4">{fila}</span>
            {columnas.map((col) => {
              const id = `${fila}-${col}`;
              const estaOcupado = asientosOcupados.includes(id);
              const estaSeleccionado = asientosSeleccionados.includes(id);

              let claseBtn = "bg-green-100 border-green-400 hover:bg-green-200 text-green-800";
              if (estaOcupado) claseBtn = "bg-red-500 border-red-600 text-white cursor-not-allowed";
              if (estaSeleccionado) claseBtn = "bg-blue-600 border-blue-700 text-white";

              return (
                <button
                  key={id}
                  type="button"
                  disabled={estaOcupado}
                  onClick={() => onToggleAsiento(id)}
                  className={`w-7 h-7 text-[10px] font-bold border rounded ${claseBtn} transition-all`}
                >
                  {col}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      
      <div className="flex justify-center gap-4 mt-4 text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-100 border border-green-400 rounded block" /> Libre</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-600 rounded block" /> Seleccionado</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded block" /> Ocupado</span>
      </div>
    </div>
  );
};