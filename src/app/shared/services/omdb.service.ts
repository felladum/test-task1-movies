import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

import { Title, SrchTitles, Movie } from '../model/';


@Injectable()
export class OmdbService {
  private _apiUrl: string = environment.apiUrl;
  private _type = 'movie';
  private _r = 'json';

  constructor(private http: HttpClient) {}

  /*
  s	Yes		<empty>	Movie title to search for.
  type	No	movie, series, episode	<empty>	Type of result to return.
  y	No		<empty>	Year of release.
  r	No	json, xml	json	The data type to return.
  page New!	No	1-100	1	Page number to return.
  callback	No		<empty>	JSONP callback name.
  v	No		1	API version (reserved for future use).
   */
  public getTitles(title: string): Observable<SrchTitles> {
    const params = new HttpParams()
      .set('s', title)
      .set('type', this._type)
      .set('r', this._r);
    return this.http
      .get<SrchTitles>(this._apiUrl, {params});
  }

/*
  i - A valid IMDb ID (e.g. tt1285016)
*/
  public getMovie(mdbid: string): Observable<Movie> {
    const params = new HttpParams()
      .set('i', mdbid)
      .set('type', this._type)
      .set('r', this._r);
    return this.http
      .get<Movie>(this._apiUrl, {params});
  }
}
