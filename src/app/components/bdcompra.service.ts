import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Compra } from './entidades/Compra';

@Injectable({
  providedIn: 'root'
})
export class BdcompraService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:3000';
  
  obtenerCompras() {
    return this.http.get<Compra[]>(`${this.baseUrl}/compras`);
  }
  
  insertarCompras(compraData: Compra) {
    return this.http.post(`${this.baseUrl}/compra`, compraData);
  }
}