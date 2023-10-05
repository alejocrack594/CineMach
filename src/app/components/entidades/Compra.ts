import { Asiento } from "./Asiento";

export class Compra {
    id: string | undefined;
    id_user: string | undefined;
    asientos: Asiento[];
    nom_peli: string;
    fecha: string;
    monto: number;

    constructor(id: string | undefined, id_user: string | undefined, asientos: Asiento[], nom_peli: string, fecha: string, monto: number) {
        this.id = id;
        this.id_user = id_user;
        this.asientos = asientos;
        this.nom_peli = nom_peli;
        this.fecha = fecha;
        this.monto = monto;
    }
}