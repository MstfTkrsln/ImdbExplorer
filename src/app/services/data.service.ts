import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Query } from '../models/query/query';
import { SearchResult } from '../models/search-result';

@Injectable()
export class DataService {
    private QuerySource = new BehaviorSubject<Query>(new Query());
    CurrentQuery = this.QuerySource.asObservable();

    private NextPageQuerySource = new ReplaySubject<Query>(null);
    NextPageQuery = this.NextPageQuerySource.asObservable();

    private ResultSource = new BehaviorSubject<SearchResult>(null);
    CurrentResult = this.ResultSource.asObservable();

    constructor() { }

    changeQuery(query: Query) {
        this.QuerySource.next(query);
    }

    nextPage() {
        let lastQuery = this.QuerySource.value;
        lastQuery.Page++;
        this.NextPageQuerySource.next(lastQuery);
    }

    updateResult(searchResult: SearchResult) {
        this.ResultSource.next(searchResult);
    }

    concatResult(searchResult: SearchResult) {
        let lastResult = this.ResultSource.value;

        lastResult.Count = searchResult.Count;
        lastResult.First = searchResult.First;
        lastResult.Last = searchResult.Last;
        lastResult.TotalCount = searchResult.TotalCount;
        lastResult.SearchUrl = searchResult.SearchUrl;
        lastResult.Movies.push(...searchResult.Movies);

        this.ResultSource.next(lastResult);
    }
}