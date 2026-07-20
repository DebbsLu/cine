import { Pelicula } from "../types/pelicula";

export function generarCodigoPelicula(lista: Pelicula[]): string {

    if (lista.length === 0) {
        return "PEL001";
    }

    const mayorCodigo = Math.max(
        ...lista.map((pelicula) => {

            const numero = parseInt(
                pelicula.codigo.replace(/^PEL/i, "")
            );

            return isNaN(numero) ? 0 : numero;

        })
    );

    return `PEL${String(mayorCodigo + 1).padStart(3, "0")}`;
}