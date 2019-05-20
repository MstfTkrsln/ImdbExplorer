import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Query } from '../models/query/query';

@Injectable()
export class DataService {

    private QuerySource = new BehaviorSubject<Query>(new Query())
    CurrentQuery = this.QuerySource.asObservable();

    constructor() { }

    changeQuery(query: Query) {
        this.QuerySource.next(query)
    }

}