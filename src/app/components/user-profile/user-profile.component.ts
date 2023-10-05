import { Component, OnInit } from '@angular/core';
import { Usuario } from '../entidades/Usuario';
import { BdloginService } from '../bdlogin.service';
import { BdcompraService } from '../bdcompra.service';
import { Compra } from '../entidades/Compra';
import { Asiento } from '../entidades/Asiento';
import { CinemaService } from '../cinema-service.service';
import { BdasientosService } from '../bdasientos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  usuario = this.bdl.devolverUser();
  purchases: Compra[] = [];
  listaAvailables: Asiento[] = [];

  constructor(private bdl: BdloginService, private bdc: BdcompraService, private bdci: CinemaService, private bda: BdasientosService, private router: Router) { }
  
  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.bdc.obtenerCompras().subscribe((data: Compra[]) => {
      this.purchases = data;
    });
  }
  
  

  Liberar() {
    //Datos para ponerlo en availables
    this.listaAvailables = this.bda.getListaAsientosAvailables;
    if(this.listaAvailables.length > 0) {
      this.bda.editarAsientos(this.listaAvailables).subscribe((data: Asiento[]) => {
        console.log('Se ha liberado', data);
        //Vacíamos
        this.listaAvailables = this.bda.VaciarAsientos();
      });
    }
    this.router.navigate(['/login']);
  }

  filtrado() {
    return this.purchases.filter(c => c.id_user == this.usuario.id);
  }
}