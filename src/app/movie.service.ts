import { Injectable } from '@angular/core';
import { Movie } from './components/entidades/Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movies: Movie[] = [
    {
      id: 1,
      title: 'Sonido De Libertad',
      description: 'Sonido De Libertad, basada en una increíble historia real, trae luz y esperanza al obscuro mundo del trafico de menores. Después de rescatar a un niño de los traficantes, un agente federal descubre que la hermana del niño todavía está cautiva y decide embarcarse en una peligrosa misión para salvarla. Con el tiempo en su contra, renuncia a su trabajo y se adentra en lo profundo de la selva colombiana, poniendo su vida en riesgo para liberarla y traerla de vuelta a casa.',
      duration: '130 min',
      rating: 'PG-13',
      image: 'assets/fredom.jpeg'
    },
    {
      id: 2,
      title: 'Barbie',
      description: 'Vivir en la tierra de Barbie es ser un ser perfecto en un lugar perfecto. A menos que tengas una crisis existencial total. O seas un Ken. De la escritora y directora nominada al Oscar Greta Gerwig llega "Barbie", protagonizada por los nominados al Oscar Margot Robbie y Ryan Gosling como Barbie y Ken.',
      duration: '120 min',
      rating: 'PG-13',
      image: 'assets/barb1.jpg'
    },
    {
      id: 3,
      title: 'Oppenhaimer',
      description: 'Oppenheimer es un thriller épico que sumerge al público en la trepidante paradoja del enigmático hombre que debe arriesgarse a destruir el mundo para poder salvarlo.',
      duration: '130 min',
      rating: 'R',
      image: 'assets/open1.jpg'
    },
    {
      id: 4,
      title: 'Mision Imposible: Sentencia Mortal',
      description: 'Ethan Hunt es un espía capaz de llevar a cabo las misiones más peligrosas con la máxima eficacia. Ahora debe participar en una dificilísima misión: evitar la venta de un disco robado que contiene información secreta de importancia vital.',
      duration: '100 min',
      rating: 'PG',
      image: 'assets/min1.jpg'
    },
    {
      id: 5,
      title: 'Elementos',
      description: 'En una ciudad en la que los elementos de fuego, agua, tierra y aire viven en distritos separados, una chica de fuego y un chico de agua descubren que, aunque la sociedad les diga lo contrario, tienen muchas cosas en común.',
      duration: '140 min',
      rating: 'R',
      image: 'assets/elementos.jpg'
    },
    {
      id: 6,
      title: 'Megalodon',
      description: 'En una ciudad en la que los elementos de fuego, agua, tierra y aire viven en distritos separados, una chica de fuego y un chico de agua descubren que, aunque la sociedad les diga lo contrario, tienen muchas cosas en común.',
      duration: '140 min',
      rating: 'R',
      image: 'assets/megalo.jpeg'
    },

    // Agrega más películas aquí  
  ];

  getMovies() {
    return this.movies;
  }

  getMovie(id: number) {
    return this.movies.find(movie => movie.id === id);
  }
}