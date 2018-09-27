export class Movie {
    constructor(
        public Title: string,
        public Year: string,
        public Duration: string,
        public Rating: string,
        public MetaScore: number,
        public Content: string,
        public Votes: string,
        public Gross: string,
        public Url: string,
        public PosterUrl: string,
        public Genres: string[],
        public Directors: Director[],
        public Stars: Star[],
        public Index:number
    ) { }
}

export class Director {
    constructor(
        public Name: string,
        public Url: string,
    ) { }
}

export class Star {
    constructor(
        public Name: string,
        public Url: string,
    ) { }
}

