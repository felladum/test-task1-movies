import { Injectable } from '@angular/core';
import { Movie } from '../model/';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/collections';
import { Observable} from 'rxjs/Observable';

@Injectable()
export class MoviesService {
  private _movies = new Set<Movie>();
  dataChange: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);

  get data(): Movie[] { return this.dataChange.value; }

  constructor() {
    if (localStorage.getItem('_movies')) {
      let arrMovies = JSON.parse(localStorage.getItem('_movies'));
      for (let k of arrMovies){
        this.add(k);
      }
    }
  }
  private apply(): void {
    this.dataChange.next(this.all());
    localStorage.setItem('_movies', JSON.stringify(Array.from(this._movies)));
  }

  add(newMovie: Movie) {
    let find = false;
    this._movies.forEach(movie => {
      if (movie.imdbID === newMovie.imdbID) {
        find = true;
      }
    });
    if (!find) {
      this._movies.add(newMovie);
      this.apply();
    }
  }

  remove(movie: Movie) {
    this._movies.delete(movie);
    this.apply();
  }

  get(imdbID: string): Movie {
    let res: Movie;
    this._movies.forEach(movie => {
      if (movie.imdbID === imdbID) {
        res = movie;
      }
    });
    return res;
  }

  all() {
    const res = [];
    this._movies.forEach(movie => {
        res.push(movie);
    });
    return res;
  }

}


export class MoviesDataSource extends DataSource<any> {
  constructor(private data: MoviesService ) {
    super();
  }

  connect (): Observable<Movie[]> {
    return this.data.dataChange;
  }

  disconnect (  ): void {
  }

}
