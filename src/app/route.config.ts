import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieViewComponent } from './movie-list/movie-view/movie-view.component';

export const routeConfig: Routes = [
  {
    path: '',
    component: MovieListComponent,
  },
  {
    path: ':id',
    component: MovieViewComponent
  },
  { path: '**', redirectTo: '' }
];
