import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Query } from './models/query/query';
import { I18nService } from './shared/i18n/i18n.service';

@Injectable()
export class QueryResolver implements Resolve<Query> {

    constructor(private titleService: Title, private i18nService: I18nService) { }

    resolve(route: ActivatedRouteSnapshot) {

        let query: Query;

        let routingPath = route.routeConfig.path;
        if (!routingPath)
            query = Query.getQueryForPopular();
        else if (routingPath === "search-results")
            query = Object.assign(new Query(), JSON.parse(route.queryParams.query));
        else
            query = Query.Queries.find(q => q.Path == routingPath);

        if (!query)
            query = Query.getQueryForPopular();

        this.setTitleByPath(routingPath, query.Path);
        return query;
    }

    private setTitleByPath(routingPath: string, key: string) {
        if (!routingPath)
            key = "PageTitle";

        let title = this.i18nService.getTranslation(key) + ' | Imdb Explorer';
        this.titleService.setTitle(title);
    }
}