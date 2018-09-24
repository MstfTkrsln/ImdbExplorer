export class Movie {
    constructor(
        public Title: string,
        public Year: string,
        public Duration: string,
        public Rating: number,
        public MetaScore: number,
        public Content: string,
        public Votes: string,
        public Gross: string,
        public Url: string,
        public PosterUrl: string,
        public Genres: string[],
        public Directors: string[],
        public Stars: string[],
        public Index:number
    ) {

    }
}

