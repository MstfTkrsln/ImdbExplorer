import { Injectable } from '@angular/core';
import { NavigationMenu } from '../models/navigation-menu';
import { Query } from '../models/query/query';

@Injectable()
export class NavigationService {

    menus: NavigationMenu[] = [
        {
            Name: "InTheaters",
            Icon: null,
            Link: "in-theaters",
            Children: null
        },
        {
            Name: "Movies",
            Icon: null,
            Link: null,
            Children: [
                {
                    Name: "TrendingNow",
                    Icon: null,
                    Link: "movies/trending-now",
                    Children: null
                },
                {
                    Name: "TopRated",
                    Icon: null,
                    Link: "movies/top-rated",
                    Children: null
                },
                {
                    Name: "Top250",
                    Icon: null,
                    Link: "movies/top-250",
                    Children: null
                },
                {
                    Name: "BoxOfficeUS",
                    Icon: null,
                    Link: "movies/box-office-us",
                    Children: null
                },
                {
                    Name: "OscarWinners",
                    Icon: null,
                    Link: "movies/oscar-winners",
                    Children: null
                },
                {
                    Name: "BestPictureWinners",
                    Icon: null,
                    Link: "movies/best-picture-winners",
                    Children: null
                },
                {
                    Name: "BestDirectorWinners",
                    Icon: null,
                    Link: "movies/best-director-winners",
                    Children: null
                },
                {
                    Name: "TrendingOnNetflix",
                    Icon: null,
                    Link: "movies/trending-on-netflix",
                    Children: null
                }
            ]
        },
        {
            Name: "Series",
            Icon: null,
            Link: null,
            Children: [
                {
                    Name: "TrendingNow",
                    Icon: null,
                    Link: "series/trending-now",
                    Children: null
                },
                {
                    Name: "TopRated",
                    Icon: null,
                    Link: "series/top-rated",
                    Children: null
                },
                {
                    Name: "EmmyWinners",
                    Icon: null,
                    Link: "series/emmy-winners",
                    Children: null
                },
                {
                    Name: "GoldenGlobeWinners",
                    Icon: null,
                    Link: "series/golden-globe-winners",
                    Children: null
                },
                {
                    Name: "TrendingOnNetflix",
                    Icon: null,
                    Link: "series/trending-on-netflix",
                    Children: null
                }
            ]
        },
        {
            Name: "Documentary",
            Icon: null,
            Link: null,
            Children: [
                {
                    Name: "TrendingNow",
                    Icon: null,
                    Link: "documentaries/trending-now",
                    Children: null
                },
                {
                    Name: "TopRated",
                    Icon: null,
                    Link: "documentaries/top-rated",
                    Children: null
                },
                {
                    Name: "OscarWinners",
                    Icon: null,
                    Link: "documentaries/oscar-winners",
                    Children: null
                },
                {
                    Name: "EmmyWinners",
                    Icon: null,
                    Link: "documentaries/emmy-winners",
                    Children: null
                },
                {
                    Name: "TrendingOnNetflix",
                    Icon: null,
                    Link: "documentaries/trending-on-netflix",
                    Children: null
                }
            ]
        },
        {
            Name: "Games",
            Icon: null,
            Link: null,
            Children: [
                {
                    Name: "TrendingNow",
                    Icon: null,
                    Link: "games/trending-now",
                    Children: null
                },
                {
                    Name: "TopRated",
                    Icon: null,
                    Link: "games/top-rated",
                    Children: null
                }
            ]
        }
    ];

    mobileMneus: NavigationMenu[] = [
        {
            Name: null,
            Icon: "assets/img/svg/menu.svg",
            Link: null,
            Children: this.menus
        }
    ];

    getDesktopNavigations() {
        return this.menus;
    }

    getMobileNavigations() {
        return this.mobileMneus;
    }

}
