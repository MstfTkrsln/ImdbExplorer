import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Query } from './models/query/query';

@Injectable()
export class QueryResolver implements Resolve<Query> {

    constructor() { }

    resolve(route: ActivatedRouteSnapshot) {

        let routingPath = route.routeConfig.path;
        if (!routingPath)
            return Query.getQueryForPopular();

        if (routingPath === "search-results")
            return Object.assign(new Query(), JSON.parse(route.queryParams.query));

        let query: Query = Query.Queries.find(q => q.Path == routingPath);
        if (query)
            return query;
        else
            return Query.getQueryForPopular();
    }
}