import React, { useEffect, useState } from 'react';
import { Funcion } from '../types/funcion';
import { useAppSelector } from '../redux/hooks';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (funcion: Funcion) => void;
    funcionEdicion?: Funcion | null;
}

export default function FormularioFuncion({
    isOpen,
    onClose,
    onSave,
    funcionEdicion
}: Props) {

    const peliculas = useAppSelector(state => state.peliculas.lista);
    const salas = useAppSelector(state => state.salas.lista);
    const funciones = useAppSelector(state => state.funciones.lista);

    const [form, setForm] = useState<Funcion>({
        id: '',
        peliculaId: '',
        salaId: '',
        fecha: '',
        hora: '',
        precio: 0
    });

    const [conflicto, setConflicto] = useState(false);

    useEffect(() => {

        if (funcionEdicion) {

            setForm(funcionEdicion);

        } else {

            setForm({

                id: Date.now().toString(),

                peliculaId: '',

                salaId: '',

                fecha: '',

                hora: '',

                precio: 0

            });

        }

    }, [funcionEdicion, isOpen]);

    useEffect(() => {

        const existe = funciones.some(f =>

            f.id !== form.id &&
            f.salaId === form.salaId &&
            f.fecha === form.fecha &&
            f.hora === form.hora

        );

        setConflicto(existe);

    }, [form, funciones]);

    const peliculaSeleccionada = peliculas.find(

        p => p.codigo === form.peliculaId

    );

    useEffect(() => {

        if (peliculaSeleccionada) {

            setForm(prev => ({
                ...prev,
                precio: peliculaSeleccionada.precioEntrada
            }));

        }

    }, [peliculaSeleccionada]);

    const guardar = (e: React.FormEvent) => {

        e.preventDefault();

        if (conflicto) return;

        onSave(form);

        onClose();

    };

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">

                <h2 className="text-xl font-bold mb-6">

                    {funcionEdicion ? "Editar Función" : "Nueva Función"}

                </h2>

                <form
                    onSubmit={guardar}
                    className="space-y-4"
                >

                    <div>

                        <label className="text-sm font-semibold">

                            Película

                        </label>

                        <select
                            className="w-full border rounded p-2 mt-1"
                            value={form.peliculaId}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    peliculaId: e.target.value
                                })
                            }
                            required
                        >

                            <option value="">

                                Seleccione...

                            </option>

                            {peliculas
                                .filter(p => p.estado === "Disponible")
                                .map(p => (

                                    <option
                                        key={p.codigo}
                                        value={p.codigo}
                                    >

                                        {p.nombre}

                                    </option>

                                ))}

                        </select>

                    </div>

                    <div>

                        <label className="text-sm font-semibold">

                            Sala

                        </label>

                        <select
                            className="w-full border rounded p-2 mt-1"
                            value={form.salaId}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    salaId: e.target.value
                                })
                            }
                            required
                        >

                            <option value="">

                                Seleccione...

                            </option>

                            {salas.map(s => (

                                <option
                                    key={s.id}
                                    value={s.id}
                                >

                                    {s.id}

                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>

                            <label className="text-sm font-semibold">

                                Fecha

                            </label>

                            <input
                                type="date"
                                className="w-full border rounded p-2 mt-1"
                                value={form.fecha}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        fecha: e.target.value,
                                    })
                                }
                                required
                            />

                        </div>

                        <div>

                            <label className="text-sm font-semibold">

                                Hora

                            </label>

                            <input
                                type="time"
                                className="w-full border rounded p-2 mt-1"
                                value={form.hora}
                                onChange={e =>
                                    setForm({
                                        ...form,
                                        hora: e.target.value
                                    })
                                }
                                required
                            />

                        </div>

                    </div>

                    <div>

                        <label className="text-sm font-semibold">

                            Precio

                        </label>

                        <input
                            type="number"
                            readOnly
                            value={form.precio}
                            className="w-full border rounded p-2 mt-1 bg-gray-100"
                        />

                    </div>

                    {conflicto && (

                        <div className="bg-red-100 border border-red-300 rounded p-3 text-sm text-red-700">

                            Ya existe una función asignada en esa sala para esa fecha y horario.

                        </div>

                    )}

                    <div className="flex justify-end gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded bg-gray-200 hover:bg-gray-300"
                        >

                            Cancelar

                        </button>

                        <button
                            type="submit"
                            disabled={conflicto}
                            className="px-5 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-gray-400"
                        >

                            Guardar

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}