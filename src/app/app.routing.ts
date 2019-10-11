import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { Query } from './models/query/query';


export const routes: Routes = [
    {
        path: '',
        component: ContentComponent,
        data: { query: Query.getQueryForPopular() },
    },

    {
        path: 'search-results',
        component: ContentComponent,
        data: { query: null },
    },

    {
        path: 'in-theaters',
        component: ContentComponent,
        data: { query: Query.getQueryForInTheaters() },
    },

    {
        path: 'movies/trending-now',
        component: ContentComponent,
        data: { query: Query.getQueryForPopularMovies() },
    },
    {
        path: 'movies/top-rated',
        component: ContentComponent,
        data: { query: Query.getQueryForTopRatedMovies() },
    },
    {
        path: 'movies/top-250',
        component: ContentComponent,
        data: { query: Query.getQueryForTop250Movies() },
    },
    {
        path: 'movies/box-office-us',
        component: ContentComponent,
        data: { query: Query.getQueryForBoxOfficeMovies() },
    },
    {
        path: 'movies/oscar-winners',
        component: ContentComponent,
        data: { query: Query.getQueryForOscarWinnerMovies() },
    },
    {
        path: 'movies/best-picture-winners',
        component: ContentComponent,
        data: { query: Query.getQueryForPictureWinnerMovies() },
    },
    {
        path: 'movies/best-director-winners',
        component: ContentComponent,
        data: { query: Query.getQueryForDirectorWinnerMovies() },
    },
    {
        path: 'movies/trending-on-netflix',
        component: ContentComponent,
        data: { query: Query.getQueryForPopularMoviesOnNetflix() },
    },


    {
        path: 'series/trending-now',
        component: ContentComponent,
        data: { query: Query.getQueryForPopularSeries() },
    },
    {
        path: 'series/top-rated',
        component: ContentComponent,
        data: { query: Query.getQueryForTopRatedSeries() },
    },
    {
        path: 'series/emmy-winners',
        component: ContentComponent,
        data: { query: Query.getQueryForEmmyWinnerSeries() },
    },
    {
        path: 'series/golden-globe-winners',
        component: ContentComponent,
        data: { query: Query.getQueryForGoldenGlobeWinnerSeries() },
    },
    {
        path: 'series/trending-now',
        component: ContentComponent,
        data: { query: Query.getQueryForPopularSeries() },
    },
    {
        path: 'series/trending-on-netflix',
        component: ContentComponent,
        data: { query: Query.getQueryForPopularSeriesOnNetflix() },
    },


    {
        path: 'documentaries/trending-now',
        component: ContentComponent,
        data: { query: Query.getQueryForPopularDocumentaries() },
    },
    {
        path: 'documentaries/top-rated',
        component: ContentComponent,
        data: { query: Query.getQueryForTopRatedDocumentaries() },
    },
    {
        path: 'documentaries/oscar-winners',
        component: ContentComponent,
        data: { query: Query.getQueryForOscarWinnerDocumentaries() },
    },
    {
        path: 'documentaries/emmy-winners',
        component: ContentComponent,
        data: { query: Query.getQueryForEmmyWinnerDocumentaries() },
    },
    {
        path: 'documentaries/trending-on-netflix',
        component: ContentComponent,
        data: { query: Query.getQueryForPopularDocumentariesOnNetflix() },
    },


    {
        path: 'games/trending-now',
        component: ContentComponent,
        data: { query: Query.getQueryForPopularGames() },
    },
    {
        path: 'games/top-rated',
        component: ContentComponent,
        data: { query: Query.getQueryForTopRatedGames() },
    },


    { 
        path: '**',
        redirectTo: '/' }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(routes);
