import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../shared/services';
import { Movie } from '../../shared/model';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.pug',
  styleUrls: ['./movie-view.component.css']
})
export class MovieViewComponent implements OnInit {
  imdbID = '';
  movie: Movie;
  movieAttrs = [];
  constructor(private route: ActivatedRoute,
              private movies: MoviesService,
              private router: Router
  ) { }

  ngOnInit() {
    this.imdbID = this.route.snapshot.paramMap.get('id');
    this.movie = this.movies.get(this.imdbID);
    for (let k in this.movie) {
      if (this.movie.hasOwnProperty(k)) {
        this.movieAttrs.push({
          Name: k,
          Value: this.movie[k]
      });
      }
    }
  }
}
