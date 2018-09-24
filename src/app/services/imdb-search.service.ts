import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { config } from 'src/assets/config/imdb-explorer.config';
import { Query } from '../models/query/query';
import { HttpHeaders } from '@angular/common/http';
import { Movie } from 'src/app/models/movie';

@Injectable()
export class ImdbSearhService {

  constructor(private http: Http) { }

  public Ping(): Observable<any> {

    //let options = new RequestOptions({ headers: this.getHeaders() });

    return this.http.get(config.IMDB_SEARCH_API_URL + 'Ping')
      .pipe(
        map(res => res.json()),
        catchError(this.handleError)
      );
  }

  public Search(query: Query): Observable<Movie[]> {
    console.log(query);

    let reqUrl = config.IMDB_SEARCH_API_URL + 'Search';
    let body = JSON.stringify(query);

    console.log(body);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(reqUrl, body, options)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError)
      );  
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  private getHeadersForMultipartFormData(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return headers;
  }

  private handleError(errorData: any) {
    if (errorData.status === 0) {
      console.log('Connection Issue.!');
      console.log(errorData);
      return Observable.throw(errorData);
    }
    let error = errorData.json();
    let errMsg = error.error || error;
    return Observable.throw(errMsg);
  }

}


