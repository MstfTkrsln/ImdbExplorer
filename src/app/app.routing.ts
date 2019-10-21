import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { QueryResolver } from './app.resolver';


export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },

    {
        path: 'search-results',
        component: ContentComponent,
        resolve: { query: QueryResolver },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },

    {
        path: 'in-theaters',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },

    {
        path: 'movies/trending-now',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },
    {
        path: 'movies/top-rated',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },
    {
        path: 'movies/top-250',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },
    {
        path: 'movies/box-office-us',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },
    {
        path: 'movies/oscar-winners',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },
    {
        path: 'movies/best-picture-winners',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },
    {
        path: 'movies/best-director-winners',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },
    {
        path: 'movies/trending-on-netflix',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },


    {
        path: 'series/trending-now',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },
    {
        path: 'series/top-rated',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },
    {
        path: 'series/emmy-winners',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },
    {
        path: 'series/golden-globe-winners',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },
    {
        path: 'series/trending-on-netflix',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },


    {
        path: 'documentaries/trending-now',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },
    {
        path: 'documentaries/top-rated',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },
    {
        path: 'documentaries/oscar-winners',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },
    {
        path: 'documentaries/emmy-winners',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },
    {
        path: 'documentaries/trending-on-netflix',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },


    {
        path: 'games/trending-now',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },
    {
        path: 'games/top-rated',
        component: ContentComponent,
        resolve: { query: QueryResolver }
    },


    { 
        path: '**',
        redirectTo: '/' }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(routes);
