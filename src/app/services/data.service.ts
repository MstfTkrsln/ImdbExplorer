import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Query } from '../models/query/query';

@Injectable()
export class DataService {
    private QuerySource = new BehaviorSubject<Query>(new Query()); //emit initial value
    CurrentQuery = this.QuerySource.asObservable();

    private NextPageQuerySource = new ReplaySubject<Query>(null); //does not emit initial value
    NextPageQuery = this.NextPageQuerySource.asObservable();

    constructor() { }

    changeQuery(query: Query) {
        this.QuerySource.next(query)
    }

    nextPage() {
        let lastQuery = this.QuerySource.value;
        lastQuery.Page++;
        this.NextPageQuerySource.next(lastQuery)
    }


}