import { Injectable } from '@angular/core';
import { config } from 'src/assets/config/imdb-explorer.config';
import { NavigationMenu } from '../models/navigation-menu';
import { Query } from '../models/query/query';

@Injectable()
export class NavigationService {

    menus: NavigationMenu[] = [
        {
            Name: "Movies",
            Icon: null,
            Query: null,
            Children: [
                {
                    Name: "TrendingNow",
                    Icon: null,
                    Query: Query.getQueryForPopularMovies(),
                    Children: null
                },
                {
                    Name: "TopRated",
                    Icon: null,
                    Query: Query.getQueryForTopRatedMovies(),
                    Children: null
                }]
        },
        {
            Name: "Series",
            Icon: null,
            Query: null,
            Children: [
                {
                    Name: "TrendingNow",
                    Icon: null,
                    Query: Query.getQueryForPopularSeries(),
                    Children: null
                },
                {
                    Name: "TopRated",
                    Icon: null,
                    Query: Query.getQueryForTopRatedSeries(),
                    Children: null
                }]
        }
    ];

    mobileMneus: NavigationMenu[] = [
        {
            Name: null,
            Icon: "assets/img/svg/menu.svg",
            Query: null,
            Children: this.menus
        }
    ];

    getDesktopNavigations() {
        return this.menus
    }

    getMobileNavigations() {
        return this.mobileMneus;
    }

}
