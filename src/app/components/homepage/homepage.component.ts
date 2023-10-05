import { Component } from '@angular/core';
import { MovieService } from 'src/app/movie.service';
import { CinemaService } from '../cinema-service.service';
import { Router } from '@angular/router';
import { Movie } from '../entidades/Movie';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private bds: CinemaService, private router: Router) { }

  ngOnInit() {
    this.movies = this.movieService.getMovies().slice(0, 4);
  }

  Ira(peli: Movie) {
    this.bds.setNombrePeli(peli.title);
    delete peli.image;
    this.bds.setListMovie(peli);
    this.router.navigate(['/sala']);
  }
}