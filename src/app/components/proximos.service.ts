import { Injectable } from '@angular/core';
export interface MovieProx {
  id: number;
  title: string;
  description: string;
  duration: string;
  rating: string;
  image: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProximosService {
  private movies: MovieProx[] = [
    {
      id: 1,
      title: 'Gran Turismo',
      description: 'Sonido De Libertad, basada en una increíble historia real, trae luz y esperanza al obscuro mundo del trafico de menores. Después de rescatar a un niño de los traficantes, un agente federal descubre que la hermana del niño todavía está cautiva y decide embarcarse en una peligrosa misión para salvarla. Con el tiempo en su contra, renuncia a su trabajo y se adentra en lo profundo de la selva colombiana, poniendo su vida en riesgo para liberarla y traerla de vuelta a casa.',
      duration: '130 min',
      rating: 'PG-13',
      image: 'assets/gtr.jpg'
    },
    {
      id: 2,
      title: 'Blue Beetle',
      description: 'Vivir en la tierra de Barbie es ser un ser perfecto en un lugar perfecto. A menos que tengas una crisis existencial total. O seas un Ken. De la escritora y directora nominada al Oscar Greta Gerwig llega "Barbie", protagonizada por los nominados al Oscar Margot Robbie y Ryan Gosling como Barbie y Ken.',
      duration: '120 min',
      rating: 'PG-13',
      image: 'assets/bluebe.jpg'
    },
    // Agrega más películas aquí  
  ];

  getMovies(): MovieProx[] {
    return this.movies;
  }

  getMovie(id: number): MovieProx | undefined {
    return this.movies.find(movie => movie.id === id);
  }
}
