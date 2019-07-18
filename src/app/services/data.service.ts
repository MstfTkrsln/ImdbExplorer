import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Query } from '../models/query/query';
import { SearchResult } from '../models/search-result';
import { GoogleAnalyticsService } from './google-analytics.service';

@Injectable()
export class DataService {
    private QuerySource = new BehaviorSubject<Query>(Query.getQueryForPopular());
    CurrentQuery = this.QuerySource.asObservable();

    private NextPageQuerySource = new ReplaySubject<Query>(null);
    NextPageQuery = this.NextPageQuerySource.asObservable();

    private ResultSource = new BehaviorSubject<SearchResult>(null);
    CurrentResult = this.ResultSource.asObservable();

    constructor(private gas: GoogleAnalyticsService) { }

    changeQuery(query: Query) {
        this.QuerySource.next(query);
        this.gas.sendPageView(query.HeaderText);
    }

    nextPage() {
        let lastQuery = this.QuerySource.value;
        lastQuery.Page++;
        this.NextPageQuerySource.next(lastQuery);
        this.gas.emitEvent("general", "show-more");
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