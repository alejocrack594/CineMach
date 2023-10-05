import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../cinema-service.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  selectedSeats: any[]; 
  totalAmount: number;
  qrValue: string = '';

  constructor(private cinemaService: CinemaService) { // Inyecta el servicio aquí
    // Inicializa las variables por defecto
    this.selectedSeats = []; 
    this.totalAmount = 0; 
  }

  ngOnInit(): void {
    // Suscribirse a los observables para obtener los datos actuales
    this.cinemaService.selectedSeats$.subscribe(seats => {
      this.selectedSeats = seats;
      // Actualiza el valor QR después de obtener los datos
      this.updateQRValue();
    });

    this.cinemaService.totalAmount$.subscribe(amount => {
      this.totalAmount = amount;
      // Actualiza el valor QR después de obtener los datos
      this.updateQRValue();
    });
  }

  updateQRValue(): void {
    this.qrValue = JSON.stringify({ selectedSeats: this.selectedSeats, totalAmount: this.totalAmount });
  }

}
