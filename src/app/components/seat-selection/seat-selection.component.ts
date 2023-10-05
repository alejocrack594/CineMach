import { Component } from '@angular/core';
import { CinemaService } from '../cinema-service.service';
import { Asiento } from '../entidades/Asiento';
import { BdasientosService } from '../bdasientos.service';
@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent {
  
  ticketPrice = 8;
  asientos: Asiento[] = [];
  selectedSeats: Asiento[] = [];
  reservedSeats: Asiento[] = [];

  ngOnInit() {
    this.cargarDatos();
  }
  
  cargarDatos() {
    this.bda.obtenerAsientos().subscribe((data: Asiento[]) => {
      this.asientos = data;
    });
  }
  
  getTotalPrice(): number {
    return this.selectedSeats.length * this.ticketPrice;
  }
  titulo = this.cinemaService.getNombrePeli();
  salaUsada = this.cinemaService.getSala();  

  constructor(private cinemaService: CinemaService, private bda: BdasientosService) {
  }

  updateSelectedSeats(seat: Asiento) {
    const seatReserved = Object.assign({}, seat); // Crear una copia del objeto seat 
    const seatAvailable = Object.assign({}, seat); // Crear una copia del objeto seat 
    if (seat.estado === 'selected' && !this.selectedSeats.includes(seat)) {
      seatReserved.estado = 'reserved';
      this.reservedSeats.push(seatReserved); 
      seatAvailable.estado = 'available';
      this.bda.AgregarAsientos(seatAvailable);
      delete seat.id;
      this.selectedSeats.push(seat); 
    } else if (seat.estado === 'available') {
      const index = this.selectedSeats.indexOf(seat);
      const ind = this.reservedSeats.indexOf(seatReserved);
      if (index > -1) {
        this.selectedSeats.splice(index, 1);
        this.reservedSeats.splice(ind, 1);
        this.bda.BorrarAsiento(seatAvailable);
      }      
    }
  }
  
  selectSeat(seat: Asiento): void {
    if (seat.estado === 'available') {
      seat.estado = 'selected';
    } else if (seat.estado === 'selected') {
      seat.estado = 'available';
    }
    this.updateSelectedSeats(seat);
    this.cinemaService.setSelectedSeats(this.selectedSeats);
    this.cinemaService.setReserved(this.reservedSeats);
    this.salaUsada.asientos = this.selectedSeats;
    this.cinemaService.setSala(this.salaUsada);
    this.cinemaService.setTotalAmount(this.selectedSeats.length * 8); // 8 siendo el precio del boleto
  }
}