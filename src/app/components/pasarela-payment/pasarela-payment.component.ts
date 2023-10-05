import { Component } from '@angular/core';
import { CinemaService } from '../cinema-service.service';
import { Router } from '@angular/router';
import { BdloginService } from '../bdlogin.service';
import { Usuario } from '../entidades/Usuario';
import { Asiento } from '../entidades/Asiento';
import { Compra } from '../entidades/Compra';
import { BdcompraService } from '../bdcompra.service';
import { BdasientosService } from '../bdasientos.service';
import { SalaCine } from '../entidades/SalaCine';


@Component({
  selector: 'app-pasarela-payment',
  templateUrl: './pasarela-payment.component.html',
  styleUrls: ['./pasarela-payment.component.css']
})

export class PasarelaPaymentComponent {
  fechaFormateada: string = '';
  selectedSeats: Asiento[] = [];
  reservedAsientos: Asiento[] =  [];
  totalAmount: number = 0;
  cardType: 'visa' | 'amex' | 'mastercard' | 'unknown' = 'unknown';

  constructor(private cinemaService: CinemaService, private router: Router, private bdl: BdloginService, private bds: BdcompraService, private bda: BdasientosService) {
    
    this.reservedAsientos = this.cinemaService.getReserved();

    this.cinemaService.totalAmount$.subscribe(amount => {
      this.totalAmount = amount;
    });
    
    this.cinemaService.selectedSeats$.subscribe((seats: Asiento[]) => {
      this.selectedSeats = seats;
    });
  }

  detectCardType(cardNumber: string) {
    const cleaned = ('' + cardNumber).replace(/\D/g, '');

    const cardPatterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/
    };

    if (cardPatterns.visa.test(cleaned)) {
      this.cardType = 'visa';
    } else if (cardPatterns.mastercard.test(cleaned)) {
      this.cardType = 'mastercard';
    } else if (cardPatterns.amex.test(cleaned)) {
      this.cardType = 'amex';
    } else {
      this.cardType = 'unknown';
    }
  }

  processPayment() {
    if (this.cardType === 'unknown') {
      alert('Tarjeta inválida.');
    } else {
      alert(`Pago procesado con éxito usando ${this.cardType}!`);
      this.guardarCompra();
      this.guardarSala();
      this.editarSala();    
    }
  }
  
  guardarSala() {
    const nuevaSala = this.cinemaService.getSala();
    this.bdl.insertarSala(nuevaSala).subscribe((data) => {
      console.log('Sala Insertada', data);
    });
  }

  editarSala() {
    const salaUpdate = this.cinemaService.getSalaFiltrada();
    this.bdl.editarSala(salaUpdate).subscribe((data: SalaCine[]) => {
      console.log('Se ha editado correctamente', data);
    });
  }

  guardarCompra() {
    const nombrepeli = this.cinemaService.getNombrePeli();
      const user: Usuario =  this.bdl.devolverUser();
      this.fechaFormateada = new Date().toISOString().slice(0, 10).replace('T', ' ');
      const nuevaCompra: Compra = new Compra(
        undefined,
        user.id,
        this.selectedSeats,
        nombrepeli,
        this.fechaFormateada,
        this.totalAmount
      );
      delete nuevaCompra.id;
      
      //Agregar Compra\\
      this.bds.insertarCompras(nuevaCompra).subscribe((data) => {
        alert('Se ha realizado la compra');
        console.log('Compra agregada', data);
        this.router.navigate(['/compras']);
      });

      //Cambiar a reserved
      this.bda.editarAsientos(this.reservedAsientos)
      .subscribe((data: Asiento[]) => {
        console.log('Se han editado correctamente', data);
      });
    }
}