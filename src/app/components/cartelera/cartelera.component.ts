import { Component } from '@angular/core';
import { MovieService } from 'src/app/movie.service';
import { Movie } from '../entidades/Movie';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movies = this.movieService.getMovies().slice(4,7);
  }
}
