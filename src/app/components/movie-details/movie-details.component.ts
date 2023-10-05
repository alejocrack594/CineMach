import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/movie.service';
import { Movie } from '../entidades/Movie';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {
  movie: Movie | undefined;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.movie = this.movieService.getMovie(id);
  }
}
