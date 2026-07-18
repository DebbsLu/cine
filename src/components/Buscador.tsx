import React from 'react';

interface BuscadorProps {
  valor: string;
  onChange: (txt: string) => void;
}

export const Buscador: React.FC<BuscadorProps> = ({ valor, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Buscar película por nombre..."
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
    />
  );
};