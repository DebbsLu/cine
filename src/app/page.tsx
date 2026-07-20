// src/app/page.tsx
'use client';
import React, { useState } from 'react';
import Filtros from '../components/Filtros';
import TablaPeliculas from '../components/TablaPeliculas';
import FormularioPelicula from '../components/FormularioPelicula';
//import { useAppDispatch } from '../redux/hooks';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addPelicula, updatePelicula } from '../redux/slices/peliculasSlice';
import { Pelicula } from '../types/pelicula';
import { Dashboard } from '../components/Dashboard';
import TablaCartelera from '../components/TablaCartelera';
import FormularioFuncion from '../components/FormularioFuncion';

import { Funcion } from '../types/funcion';

import {
  addFuncion,
  updateFuncion
} from '../redux/slices/funcionesSlice';

// Definimos las pestañas de la aplicación
type Tab = 'Inicio' | 'Peliculas' | 'Cartelera';

export default function Home() {
  // 1. Configuramos 'Inicio' por defecto para que muestre el Dashboard de entrada
  const [activeTab, setActiveTab] = useState<Tab>('Inicio'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPelicula, setSelectedPelicula] = useState<Pelicula | null>(null);
  const [isFuncionModalOpen, setIsFuncionModalOpen] = useState(false);

const [selectedFuncion, setSelectedFuncion] =
useState<Funcion | null>(null);
  
  const dispatch = useAppDispatch();
  const peliculas = useAppSelector((state) => state.peliculas.lista);

  const handleOpenCrear = () => {
    setSelectedPelicula(null);
    setIsModalOpen(true);
  };

  const handleOpenEditar = (pelicula: Pelicula) => {
    setSelectedPelicula(pelicula);
    setIsModalOpen(true);
  };

  const handleSavePelicula = (pelicula: Pelicula) => {
    if (selectedPelicula) {
      dispatch(updatePelicula(pelicula));
    } else {
      dispatch(addPelicula(pelicula));
    }
  };

  const handleOpenCrearFuncion = () => {

  setSelectedFuncion(null);

  setIsFuncionModalOpen(true);

};

const handleOpenEditarFuncion = (funcion: Funcion) => {

  setSelectedFuncion(funcion);

  setIsFuncionModalOpen(true);

};

const handleSaveFuncion = (funcion: Funcion) => {

  if (selectedFuncion) {

    dispatch(updateFuncion(funcion));

  } else {

    dispatch(addFuncion(funcion));

  }

};

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      {/* NAVBAR */}
      <nav className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="font-black text-xl text-emerald-600 tracking-wider">CINE APP</span>
            <div className="flex gap-4 h-16">
              {/* Cambiado para ciclar solo por las 2 pestañas core */}
              {(['Inicio', 'Peliculas', 'Cartelera'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 h-full border-b-2 font-semibold text-sm transition-all ${
                    activeTab === tab
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-black'
                  }`}
                >
                  {tab === 'Inicio'
    ? 'Inicio / Dashboard'
    : tab === 'Peliculas'
    ? 'Películas'
    : 'Cartelera'}
                </button>
              ))}
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200" />
        </div>
      </nav>

      {/* CONTENIDO DINÁMICO */}
      <div className="max-w-7xl mx-auto p-6">
        {/* 2. Renderizamos el Dashboard en la pestaña por defecto */}
        {activeTab === 'Inicio' && (
          <Dashboard />
        )}

        {activeTab === 'Peliculas' && (
          <div>
            {/* Header del módulo */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">GESTIÓN DE PELÍCULAS</h1>
              <button
                onClick={handleOpenCrear}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm tracking-wide shadow-sm transition-all flex items-center gap-2"
              >
                + AGREGAR
              </button>
            </div>

            {/* Filtros e Historial */}
            <Filtros />
            <TablaPeliculas onEditar={handleOpenEditar} />
          </div>
        )}

        {activeTab === 'Cartelera' && (

<div>

<div className="flex justify-between items-center mb-6">

<h1 className="text-2xl font-extrabold text-gray-800">

GESTIÓN DE CARTELERA

</h1>

<button

onClick={handleOpenCrearFuncion}

className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-bold"

>

+ AGREGAR FUNCIÓN

</button>

</div>

<TablaCartelera

onEditar={handleOpenEditarFuncion}

/>

</div>

)}
      </div>

      {/* MODAL GLOBAL DE EDICIÓN/CREACIÓN DE PELÍCULAS */}
      <FormularioPelicula
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePelicula}
        peliculaEdicion={selectedPelicula}
        peliculas={peliculas}
      />

      <FormularioFuncion
        isOpen={isFuncionModalOpen}
        onClose={() => setIsFuncionModalOpen(false)}
        onSave={handleSaveFuncion}
        funcionEdicion={selectedFuncion}
      />
    </main>
  );
}