import { Component } from '@angular/core';
import { Asiento } from '../entidades/Asiento';
import { CinemaService } from '../cinema-service.service';
import { Movie } from '../entidades/Movie';
import { SalaCine } from '../entidades/SalaCine';
import { Usuario } from '../entidades/Usuario';
import { BdloginService } from '../bdlogin.service';

@Component({
  selector: 'app-sala-cine',
  templateUrl: './sala-cine.component.html',
  styleUrls: ['./sala-cine.component.css']
})
export class SalaCineComponent {
  
  moviesSeats: Movie[] = [];
  selectedSeats: Asiento[] = [];
  listaSalas: any[] = [];
  city: string = '';
  complex: string = '';
  fecha: string = '';
  horario: string = '';

  constructor(private cinemaService: CinemaService, private bdl: BdloginService) {
    this.cinemaService.selectedSeats$.subscribe((seats: Asiento[]) => {
      this.selectedSeats = seats;
    });

    this.cinemaService.obtenerSalas().subscribe((data: any[]) =>{
      this.listaSalas = data;
    });
  }
  
  peli = this.cinemaService.getListMovie();

  salasDisponibles() {
    let filtro: any[] = [];
    if(this.peli!) {
      filtro = this.listaSalas.filter(sala => sala.estado === true && sala.peliculas[0] === this.peli.title);
    }
    return filtro;
  }
  

  GuardarCambios() {
    delete this.peli.id;
    this.moviesSeats.push(this.peli);
    const user: Usuario =  this.bdl.devolverUser();
    const nuevoSala: SalaCine = new SalaCine(
      undefined,
      user.id,
      this.peli,
      this.horario,
      undefined
      );
    delete nuevoSala.id;
    this.cinemaService.setSala(nuevoSala);
    const salaFiltrada = this.listaSalas.filter(s => s.horario === this.horario);
    this.cinemaService.setSalaFiltrada(salaFiltrada);
  }
}