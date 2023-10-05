import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Asiento } from './entidades/Asiento';
import { Movie } from './entidades/Movie';
import { SalaCine } from './entidades/SalaCine';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  
  nombreMovie: string = '';
  peliSelected: any;
  sala: any;
  salaFiltrada: SalaCine[] = [];
  listaReserved: Asiento[] = [];
  listaAvailable: Asiento[] = [];
  
  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:3000';
  
  obtenerSalas() {
    return this.http.get<SalaCine[]>(`${this.baseUrl}/sala_cine`);
  }

  private _selectedSeats = new BehaviorSubject<any[]>([]);
  selectedSeats$ = this._selectedSeats.asObservable();

  private _totalAmount = new BehaviorSubject<number>(0);
  totalAmount$ = this._totalAmount.asObservable();

  setSelectedSeats(seats: any[]) {
    this._selectedSeats.next(seats);
  }

  setTotalAmount(amount: number) {
    this._totalAmount.next(amount);
  }

  setNombrePeli(movie: string) {
    return this.nombreMovie = movie;
  }


  getNombrePeli() {
    return this.nombreMovie;
  }

  setReserved(seats: Asiento[]) {
    return this.listaReserved = seats;
  }

  getReserved() {
    return this.listaReserved;
  }

  setListMovie(peli: Movie) {
    return this.peliSelected = peli;
  }
  
  getListMovie() {
    return this.peliSelected;
  }

  setSala(salaRecibida: SalaCine) {
    return this.sala = salaRecibida;
  }

  getSala() {
    return this.sala;
  }

  setSalaFiltrada(salaf: SalaCine[]) {
    return this.salaFiltrada = salaf;
  }

  getSalaFiltrada() {
    return this.salaFiltrada;
  }
}