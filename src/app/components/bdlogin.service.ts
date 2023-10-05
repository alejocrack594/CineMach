import { Injectable } from '@angular/core';
import { Usuario } from './entidades/Usuario';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { SalaCine } from './entidades/SalaCine';

@Injectable({
  providedIn: 'root'
})
export class BdloginService {
  
  usuario: Usuario = {
    id: '',
    ced_user: '',
    ema_num_user: '',
    nom_com_user: '',
    nom_user: '',
    pass_user: ''
  }
  logueado: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  private baseUrl = 'http://localhost:3000';
  
  obtenerUsuarios() {
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios`);
  }
  
  insertarUsuario(usuario: Usuario) {
    return this.http.post(`${this.baseUrl}/usuario`, usuario);
  }

  iniciarSesion(ema_num_user: string, pass_user: string) {
    const body = { ema_num_user, pass_user}; 
    return this.http.post(`${this.baseUrl}/iniciosesion`, body)
    .pipe(
      tap((response: any) => {
        if(response.success) {
          this.logueado = true;
          this.usuario = response.usuario;
        }
      })
    );
  }

  isAutenticado() {
    return this.logueado;
  }

  devolverUser() {
    return this.usuario;
  }

  insertarSala(sala: SalaCine) {
    return this.http.post(`${this.baseUrl}/ocuparsala`, sala);
  }

  editarSala(updateSala: any[]) {
    const url = `${this.baseUrl}/salas`;
    return this.http.put<any[]>(url, updateSala);
  }
}