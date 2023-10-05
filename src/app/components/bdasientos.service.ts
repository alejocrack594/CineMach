import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Asiento } from './entidades/Asiento';

@Injectable({
  providedIn: 'root'
})
export class BdasientosService {
  
  constructor(private http: HttpClient) { }
  
  private ListaAsientos: Asiento[] = [];
  private baseUrl = 'http://localhost:3000';
  
  get getListaAsientosAvailables(): Asiento[]
  {
    return [...this.ListaAsientos];
  }

  AgregarAsientos( asiento: Asiento )
  {
    this.ListaAsientos.push(asiento);
  }

  VaciarAsientos() {
    return this.ListaAsientos = [];
  }

  BorrarAsiento(asiento: Asiento) {
    const pos = this.ListaAsientos.indexOf(asiento);
    return this.ListaAsientos.splice(pos, 1);
  }

  obtenerAsientos() {
    return this.http.get<Asiento[]>(`${this.baseUrl}/asientos`);
  }

  editarAsientos(updateAsiento: Asiento[]) {
    const url = `${this.baseUrl}/asientos`;
    return this.http.put<Asiento[]>(url, updateAsiento);
  }
}