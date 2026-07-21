import React from 'react';
import { Funcion } from '../types/funcion';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { deleteFuncion } from '../redux/slices/funcionesSlice';

interface Props {
    onEditar: (funcion: Funcion) => void;
}

export default function TablaCartelera({ onEditar }: Props) {

    const dispatch = useAppDispatch();

    const funciones = useAppSelector(
        state => state.funciones.lista
    );

    const peliculas = useAppSelector(
        state => state.peliculas.lista
    );

    const eliminar = (id: string) => {

        if (confirm('¿Eliminar esta función?')) {

            dispatch(deleteFuncion(id));

        }

    };

    return (

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

            <table className="w-full text-sm">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="text-left p-3">Película</th>

                        <th className="text-left p-3">Sala</th>

                        <th className="text-left p-3">Fecha</th>

                        <th className="text-left p-3">Hora</th>

                        <th className="text-right p-3">Precio</th>

                        

                    </tr>

                </thead>

                <tbody>

                    {funciones.length === 0 && (

                        <tr>

                            <td
                                colSpan={6}
                                className="text-center text-gray-500 p-8"
                            >

                                No hay funciones registradas.

                            </td>

                        </tr>

                    )}

                    {funciones.map(funcion => {

                        const pelicula = peliculas.find(

                            p => p.codigo === funcion.peliculaId

                        );

                        return (

                            <tr
                                key={funcion.id}
                                className="border-t hover:bg-slate-50"
                            >

                                <td className="p-3 font-semibold">

                                    {pelicula?.nombre}

                                </td>

                                <td className="p-3">

                                    {funcion.salaId}

                                </td>

                                <td className="p-3">

                                    {funcion.fecha}

                                </td>

                                <td className="p-3">

                                    {funcion.hora}

                                </td>

                                <td className="p-3 text-right">

                                    ${funcion.precio.toFixed(2)}

                                </td>

                                <td className="p-3">



                                </td>

                            </tr>

                        );

                    })}

                </tbody>

            </table>

        </div>

    );

}