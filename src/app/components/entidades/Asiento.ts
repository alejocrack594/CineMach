export class Asiento {
    id: string | undefined;
    nom_asi: string;
    x: number;
    y: number;
    estado: string;

    constructor(id: string | undefined, nom_asi: string, x: number, y: number, estado: string) {
        this.id = id;
        this.nom_asi = nom_asi;
        this.x = x;
        this.y = y;
        this.estado = estado;
    }
}