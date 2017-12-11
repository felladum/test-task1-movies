import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { OmdbService, MoviesService, MoviesDataSource } from '../shared/services';
import { Router } from '@angular/router';
import { Title, Movie } from '../shared/model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.pug',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  dataSource: MoviesDataSource | null;
  displayedColumns = ['Title', 'Actors', 'imdbRating', 'Actions'];
  srchTitle: FormControl;
  Titles: Title[];
  selectedTitle: Title;
  constructor(
    private router: Router,
    private omdb: OmdbService,
    private movies: MoviesService
  ) { }

  ngOnInit() {
    this.srchTitle = new FormControl();
    this.onSrchTitleChange();
    // this.dataSource.data = this.movies.data;
    this.dataSource = new MoviesDataSource(this.movies);
  }

  onSrchTitleChange(): void {
    this.srchTitle.valueChanges.subscribe(
      val => {
        if (val.length > 2) {
          this.omdb.getTitles(this.srchTitle.value).subscribe(
            response => {
              this.Titles = response.Search;
            }
          );
        }
      }
    );
  }

  selectTitle(event, i, item): void {
    this.selectedTitle = item;
  }

  displayFn(item: Title): string {
    return item ? item.Title : '';
  }

  addMovie(): void {
    this.omdb.getMovie(this.selectedTitle.imdbID)
      .subscribe(
        response => {
          this.movies.add(response);
        }
      );
  }

  delMovie(element: Movie): void {
    console.log(element);
    this.movies.remove(element);
  }

}
