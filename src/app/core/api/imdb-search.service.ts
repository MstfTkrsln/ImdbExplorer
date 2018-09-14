import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { config } from '../../../assets/config/imdb-explorer.config';

@Injectable()
export class ImdbSearhService {

  constructor(private http: Http) { }

  public get(): Observable<any> {

    let params = new URLSearchParams();
    // if (odataFilter) {
    //   params.set('odataFilter', odataFilter);
    // }

    let options = new RequestOptions({ headers: this.getHeaders(), search: params });

    return this.http.get(config.IMDB_SEARCH_API_URL + 'ping', options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public post(object): Observable<any> {
    // console.log(object);

    let reqUrl = config.IMDB_SEARCH_API_URL + 'search';
    let body = JSON.stringify(object);

    // console.log(reqUrl);
    // console.log(body);

    let options = new RequestOptions({ headers: this.getHeaders() });

    return this.http.post(reqUrl, body, options)
    .pipe(
      catchError(this.handleError)
    );
  }

  // public openLinkInTab(methodName: string) {
  //   window.open(config.GREENDOCS_API_URL + methodName + '&token=' + SessionManager.getToken());
  // }

  // public openLinkInBlankPage(methodName: string) {
  //   let height = screen.height;
  //   let width = screen.width;

  //   window.open(config.GREENDOCS_API_URL + methodName + '&token=' + SessionManager.getToken()
  //     , '_blank', 'directories=no,titlebar=no,toolbar=no,status=no,menubar=no,scrollbars=yes,height='
  //     + height + ",width=" + width);
  // }

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


