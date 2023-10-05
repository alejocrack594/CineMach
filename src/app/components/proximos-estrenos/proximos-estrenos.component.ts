import { Component } from '@angular/core';
import { MovieProx, ProximosService} from '../proximos.service';
@Component({
  selector: 'app-proximos-estrenos',
  templateUrl: './proximos-estrenos.component.html',
  styleUrls: ['./proximos-estrenos.component.css']
})
export class ProximosEstrenosComponent {
  movies: MovieProx[] = [];

  constructor(private proximoservice: ProximosService) { }

  ngOnInit() {
    this.movies = this.proximoservice.getMovies();
  }
}
