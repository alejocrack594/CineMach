import { Component } from '@angular/core';

@Component({
  selector: 'app-dulceria',
  templateUrl: './dulceria.component.html',
  styleUrls: ['./dulceria.component.css']
})
export class DulceriaComponent {
    dulces = [
      {
        id: 1,
        title: 'Combo 1',
        //description: 'Vivir en la tierra de Barbie es ser un ser perfecto en un lugar perfecto. A menos que tengas una crisis existencial total. O seas un Ken. De la escritora y directora nominada al Oscar Greta Gerwig llega "Barbie", protagonizada por los nominados al Oscar Margot Robbie y Ryan Gosling como Barbie y Ken.',
        //duration: '120 min',
        //rating: 'PG-13',
        image: 'assets/combo1.jpeg'
      },
      {
        id: 2,
        title: 'Combo 2',
        //description: 'Oppenheimer es un thriller épico que sumerge al público en la trepidante paradoja del enigmático hombre que debe arriesgarse a destruir el mundo para poder salvarlo.',
        //duration: '130 min',
        //rating: 'R',
        image: 'assets/combo1.jpeg'
      },
      {
        id: 3,
        title: 'Combo 3',
        //description: 'Esta es la descripción de la Película 3.',
        //duration: '100 min',
        //rating: 'PG',
        image: 'assets/combo1.jpeg'
      },
      {
        id: 4,
        title: 'Combo 4',
        //description: 'Oppenheimer es un thriller épico que sumerge al público en la trepidante paradoja del enigmático hombre que debe arriesgarse a destruir el mundo para poder salvarlo.',
        //duration: '140 min',
        //rating: 'R',
        image: 'assets/combo1.jpeg'
      },
      // Agrega más películas aquí
    ];
  }
  