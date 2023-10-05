export class Usuario {
    id: string | undefined;
    ced_user: string;
    ema_num_user: string;
    nom_com_user: string;
    nom_user: string;
    pass_user: string;

    constructor(id: string | undefined, ced_user:string, ema_num_user: string, nom_com_user: string, nom_user: string, pass_user: string) {
        this.id = id;
        this.ced_user = ced_user;
        this.ema_num_user = ema_num_user;
        this.nom_com_user = nom_com_user;
        this.nom_user = nom_user;
        this.pass_user = pass_user;
    }
}