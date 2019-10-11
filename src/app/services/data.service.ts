import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Query } from '../models/query/query';
import { SearchResult } from '../models/search-result';
import { GoogleAnalyticsService } from './google-analytics.service';

@Injectable()
export class DataService {
    private QuerySource = new Subject<Query>();
    CurrentQuery = this.QuerySource.asObservable();

    private NextPageQuerySource = new Subject<Query>();
    NextPageQuery = this.NextPageQuerySource.asObservable();

    private ResultSource = new Subject<SearchResult>();
    CurrentResult = this.ResultSource.asObservable();

    constructor(private gas: GoogleAnalyticsService) { }

    changeQuery(query: Query) {
        this.QuerySource.next(query);
        this.gas.sendPageView(query.HeaderText);
    }

    nextPage(lastQuery: Query) {
        lastQuery.Page++;
        this.NextPageQuerySource.next(lastQuery);
        this.gas.emitEvent("general", "show-more");
    }

    updateResult(searchResult: SearchResult) {
        this.ResultSource.next(searchResult);
    }

    concatResult(lastResult: SearchResult, newResult: SearchResult) {
        lastResult.Count = newResult.Count;
        lastResult.First = newResult.First;
        lastResult.Last = newResult.Last;
        lastResult.TotalCount = newResult.TotalCount;
        lastResult.SearchUrl = newResult.SearchUrl;
        lastResult.Movies.push(...newResult.Movies);
        this.ResultSource.next(lastResult);
    }
}