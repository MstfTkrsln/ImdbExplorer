import { Injectable } from '@angular/core';
import { config } from 'src/assets/config/imdb-explorer.config';
import { NavigationMenu } from '../models/navigation-menu';
import { Query } from '../models/query/query';

@Injectable()
export class NavigationService {

    menus: NavigationMenu[] = [
        {
            Name: "InTheaters",
            Icon: null,
            Query: Query.getQueryForInTheaters(),
            Children: null
        },
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
                },
                {
                    Name: "Top250",
                    Icon: null,
                    Query: Query.getQueryForTop250Movies(),
                    Children: null
                },
                {
                    Name: "BoxOfficeUS",
                    Icon: null,
                    Query: Query.getQueryForBoxOfficeMovies(),
                    Children: null
                },
                {
                    Name: "OscarWinners",
                    Icon: null,
                    Query: Query.getQueryForOscarWinnerMovies(),
                    Children: null
                },
                {
                    Name: "BestPictureWinners",
                    Icon: null,
                    Query: Query.getQueryForPictureWinnerMovies(),
                    Children: null
                },
                {
                    Name: "BestDirectorWinners",
                    Icon: null,
                    Query: Query.getQueryForDirectorWinnerMovies(),
                    Children: null
                },
                {
                    Name: "TrendingOnNetflix",
                    Icon: null,
                    Query: Query.getQueryForPopularMoviesOnNetflix(),
                    Children: null
                }
            ]
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
                },
                {
                    Name: "EmmyWinners",
                    Icon: null,
                    Query: Query.getQueryForEmmyWinnerSeries(),
                    Children: null
                },
                {
                    Name: "GoldenGlobeWinners",
                    Icon: null,
                    Query: Query.getQueryForGoldenGlobeWinnerSeries(),
                    Children: null
                },
                {
                    Name: "TrendingOnNetflix",
                    Icon: null,
                    Query: Query.getQueryForPopularSeriesOnNetflix(),
                    Children: null
                }
            ]
        },
        {
            Name: "Documentary",
            Icon: null,
            Query: null,
            Children: [
                {
                    Name: "TrendingNow",
                    Icon: null,
                    Query: Query.getQueryForPopularDocumentaries(),
                    Children: null
                },
                {
                    Name: "TopRated",
                    Icon: null,
                    Query: Query.getQueryForTopRatedDocumentaries(),
                    Children: null
                },
                {
                    Name: "OscarWinners",
                    Icon: null,
                    Query: Query.getQueryForOscarWinnerDocumentaries(),
                    Children: null
                },
                {
                    Name: "EmmyWinners",
                    Icon: null,
                    Query: Query.getQueryForEmmyWinnerDocumentaries(),
                    Children: null
                },
                {
                    Name: "TrendingOnNetflix",
                    Icon: null,
                    Query: Query.getQueryForPopularDocumentariesOnNetflix(),
                    Children: null
                }
            ]
        },
        {
            Name: "Games",
            Icon: null,
            Query: null,
            Children: [
                {
                    Name: "TrendingNow",
                    Icon: null,
                    Query: Query.getQueryForPopularGames(),
                    Children: null
                },
                {
                    Name: "TopRated",
                    Icon: null,
                    Query: Query.getQueryForTopRatedGames(),
                    Children: null
                }
            ]
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
