import { Asiento } from "./Asiento";
import { Movie } from "./Movie";

export class SalaCine {
    id: string | undefined;
    id_user: string | undefined;
    peliculas: Movie[];
    horario: string;
    asientos: Asiento[] | undefined;

    constructor(id: string | undefined, id_user: string | undefined, peliculas: Movie[], horario: string, asientos: Asiento[] | undefined) {
        this.id = id;
        this.id_user = id_user;
        this.peliculas = peliculas;
        this.horario = horario;
        this.asientos = asientos;
    }
}