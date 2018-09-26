import { Movie } from 'src/app/models/movie';

export class SearchResult {
    constructor(
        public Movies: Movie[],
        public SearchUrl: string,
        public TotalCount: number,
        public Count: number,
        public First: number,
        public Last: number
    ) {
    }
}