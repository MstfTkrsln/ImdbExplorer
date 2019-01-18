import { TitleType, Genre, Group, Color, Language, Country, SortType } from 'src/app/models/enums';
import { UserRating } from './user-rating';
import { ReleaseDate } from './release-date';
import { NumVotes } from './num-votes';
import { MovieMeter } from './movie-meter';

export class Query {

    public Count: number;
    public Title: string;
    public TitleTypes: TitleType[];
    public ReleaseDate: ReleaseDate;
    public UserRating: UserRating;
    public NumVotes: NumVotes;
    public Genres: Genre[];
    public Groups: Group[];
    public Colors: Color[];
    public Languages: Language[];
    public Countries: Country[];
    public MovieMeter: MovieMeter;
    public Sort: SortType;
    public Page: number;

    constructor(
    ) {
        this.Count = 50;
        this.ReleaseDate = new ReleaseDate(null, null);
        this.UserRating = new UserRating(null, null);
        this.NumVotes = new NumVotes(null, null);
        this.MovieMeter = new MovieMeter(null, null);
    }

    static getQueryForPopularMovies(): Query {
        let query: Query = new Query();
        query.Count = 50;
        query.TitleTypes = [TitleType.Feature];
        query.Sort = SortType.PopularityDesc;
        return query;
    }
}