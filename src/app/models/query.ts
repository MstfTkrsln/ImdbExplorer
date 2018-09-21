import { TitleType, Genre, Group, Color, Language, Country, Sort } from 'src/app/models/enums';
import { UserRating } from 'src/app/models/user-rating';
import { ReleaseDate } from 'src/app/models/release-date';
import { NumVotes } from 'src/app/models/num-votes';
import { MovieMeter } from 'src/app/models/movie-meter';

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
    public Sort: Sort;

    constructor(
    ) {
    }

    static getSample(): Query {
        let query: Query = new Query();
        query.Count = 50;
        query.Title = '';
        query.TitleTypes = [TitleType.Feature];
        query.ReleaseDate = new ReleaseDate(new Date(2010, 1, 1), null);
        query.UserRating = new UserRating(6.1, null),
        query.NumVotes = new NumVotes(1000, null);
        query.MovieMeter = new MovieMeter(1, 10000);
        query.Genres = [Genre.Action];
        //query.Groups = [Group.NowPlaying];
        query.Colors = [Color.Color];
        query.Languages = [Language.English];
        query.Countries = [Country.UnitedStates];
        query.Sort = Sort.PopularityAsc;
        return query;
    }
}