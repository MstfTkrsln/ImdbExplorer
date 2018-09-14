import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { config } from '../../../assets/config/imdb-explorer.config';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class JsonApiService {

  constructor(private http: Http) { }

  public fetch(url): Observable<any> {
    return this.http.get(this.getBaseUrl() + config.ASSETS_API_URL + url).pipe(map(this.extractData), catchError(this.handleError));
  }

  private getBaseUrl() {
    return location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/';
  }

  private extractData(res: Response) {
    let body = res.json();
    if (body) {
      return body.data || body;
    } else {
      return {};
    }
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}


