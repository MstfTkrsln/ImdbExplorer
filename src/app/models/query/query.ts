import { TitleType, Genre, Group, Color, Language, Country, SortType, Company } from 'src/app/models/enums';
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
    public Companies: Company[];
    public MovieMeter: MovieMeter;
    public Sort: SortType;
    public Page: number;

    public Path: string = null;

    constructor(
    ) {
        this.Count = 50;
        this.Page = 1;
        this.Sort = SortType.PopularityDesc;
        this.ReleaseDate = new ReleaseDate(new Date('1900-01-01'), null);
        this.UserRating = new UserRating(null, null);
        this.NumVotes = new NumVotes(null, null);
        //this.MovieMeter = new MovieMeter(null, null);
        this.Path = "search-results";
    }

    public deepCopy() {
        return Object.assign(new Query(), JSON.parse(JSON.stringify(this)));
    }

    public static Queries: Query[] = [
        Query.getQueryForPopular(),
        Query.getQueryForInTheaters(),
        Query.getQueryForPopularMovies(),
        Query.getQueryForTopRatedMovies(),
        Query.getQueryForBoxOfficeMovies(),
        Query.getQueryForTop250Movies(),
        Query.getQueryForOscarWinnerMovies(),
        Query.getQueryForPictureWinnerMovies(),
        Query.getQueryForDirectorWinnerMovies(),
        Query.getQueryForPopularMoviesOnNetflix(),
        Query.getQueryForPopularSeries(),
        Query.getQueryForTopRatedSeries(),
        Query.getQueryForGoldenGlobeWinnerSeries(),
        Query.getQueryForEmmyWinnerSeries(),
        Query.getQueryForPopularSeriesOnNetflix(),
        Query.getQueryForPopularDocumentaries(),
        Query.getQueryForTopRatedDocumentaries(),
        Query.getQueryForEmmyWinnerDocumentaries(),
        Query.getQueryForOscarWinnerDocumentaries(),
        Query.getQueryForPopularDocumentariesOnNetflix(),
        Query.getQueryForPopularGames(),
        Query.getQueryForTopRatedGames()
    ]


    static getQueryForPopular(): Query {
        let query: Query = new Query();
        query.Path = "trending-now";
        return query;
    }

    static getQueryForInTheaters(): Query {
        let today: Date = new Date();
        today.setMonth(today.getMonth() - 3);

        let query: Query = new Query();
        query.Groups = [Group._NowPlaying];
        query.ReleaseDate = new ReleaseDate(today, null);
        query.Path = "in-theaters";
        return query;
    }


    //#region Movies
    static getQueryForPopularMovies(): Query {
        let query: Query = new Query();
        query.TitleTypes = [TitleType.Feature];
        query.Path = "movies/trending-now";
        return query;
    }

    static getQueryForTopRatedMovies(): Query {
        let query: Query = new Query();
        query.Sort = SortType.UserRatingDesc;
        query.Groups = [Group._Top1000];
        query.TitleTypes = [TitleType.Feature];
        query.Path = "movies/top-rated";
        return query;
    }

    static getQueryForBoxOfficeMovies(): Query {
        let query: Query = new Query();
        query.Sort = SortType.BoxOfficeDesc;
        query.TitleTypes = [TitleType.Feature];
        query.Path = "movies/box-office-us";
        return query;
    }

    static getQueryForTop250Movies(): Query {
        let query: Query = new Query();
        query.Groups = [Group._Top250];
        query.TitleTypes = [TitleType.Feature];
        query.Sort = SortType.UserRatingDesc;
        query.Count = 250;
        query.Path = "movies/top-250";
        return query;
    }

    static getQueryForOscarWinnerMovies(): Query {
        let query: Query = new Query();
        query.Sort = SortType.ReleaseDateDesc;
        query.Groups = [Group.OscarWinner];
        query.Path = "movies/oscar-winners";
        return query;
    }
    static getQueryForPictureWinnerMovies(): Query {
        let query: Query = new Query();
        query.Sort = SortType.ReleaseDateDesc;
        query.Groups = [Group.BestPictureWinner];
        query.Path = "movies/best-picture-winners";
        return query;
    }
    static getQueryForDirectorWinnerMovies(): Query {
        let query: Query = new Query();
        query.Sort = SortType.ReleaseDateDesc;
        query.Groups = [Group.BestDirectorWinner];
        query.Path = "movies/best-director-winners";
        return query;
    }
    static getQueryForPopularMoviesOnNetflix(): Query {
        let query: Query = new Query();
        query.TitleTypes = [TitleType.Feature];
        query.Companies = [Company.Netflix];
        query.Path = "movies/trending-on-netflix";
        return query;
    }
    //#endregion


    //#region Series
    static getQueryForPopularSeries(): Query {
        let query: Query = new Query();
        query.TitleTypes = [TitleType.TvSeries, TitleType.MiniSeries];
        query.Path = "series/trending-now";
        return query;
    }

    static getQueryForTopRatedSeries(): Query {
        let query: Query = new Query();
        query.Sort = SortType.UserRatingDesc;
        query.NumVotes = new NumVotes(25000, null);
        query.TitleTypes = [TitleType.TvSeries, TitleType.MiniSeries];
        query.Path = "series/top-rated";
        return query;
    }
    static getQueryForGoldenGlobeWinnerSeries(): Query {
        let query: Query = new Query();
        query.Sort = SortType.ReleaseDateDesc;
        query.NumVotes = new NumVotes(25000, null);
        query.Groups = [Group.GoldenGlobeWinner];
        query.TitleTypes = [TitleType.TvSeries, TitleType.MiniSeries];
        query.Path = "series/golden-globe-winners";
        return query;
    }
    static getQueryForEmmyWinnerSeries(): Query {
        let query: Query = new Query();
        query.Sort = SortType.ReleaseDateDesc;
        query.NumVotes = new NumVotes(25000, null);
        query.Groups = [Group.EmmyWinner];
        query.TitleTypes = [TitleType.TvSeries, TitleType.MiniSeries];
        query.Path = "series/emmy-winners";
        return query;
    }
    static getQueryForPopularSeriesOnNetflix(): Query {
        let query: Query = new Query();
        query.TitleTypes = [TitleType.TvSeries, TitleType.MiniSeries];
        query.Companies = [Company.Netflix];
        query.Path = "series/trending-on-netflix";
        return query;
    }
    //#endregion


    //#region Documentaries
    static getQueryForPopularDocumentaries(): Query {
        let query: Query = new Query();
        query.TitleTypes = [TitleType.Documentary];
        query.Path = "documentaries/trending-now";
        return query;
    }
    static getQueryForTopRatedDocumentaries(): Query {
        let query: Query = new Query();
        query.Sort = SortType.UserRatingDesc;
        query.NumVotes = new NumVotes(10000, null);
        query.Genres = [Genre.Documentary];
        query.Path = "documentaries/top-rated";
        return query;
    }
    static getQueryForEmmyWinnerDocumentaries(): Query {
        let query: Query = new Query();
        query.Sort = SortType.ReleaseDateDesc;
        query.Groups = [Group.EmmyWinner];
        query.TitleTypes = [TitleType.Documentary];
        query.Path = "documentaries/emmy-winners";
        return query;
    }
    static getQueryForOscarWinnerDocumentaries(): Query {
        let query: Query = new Query();
        query.Sort = SortType.ReleaseDateDesc;
        query.Groups = [Group.OscarWinner];
        query.TitleTypes = [TitleType.Documentary];
        query.Path = "documentaries/oscar-winners";
        return query;
    }
    static getQueryForPopularDocumentariesOnNetflix(): Query {
        let query: Query = new Query();
        query.TitleTypes = [TitleType.Documentary];
        query.Companies = [Company.Netflix];
        query.Path = "documentaries/trending-on-netflix";
        return query;
    }
    //#endregion


    //#region Games
    static getQueryForPopularGames(): Query {
        let query: Query = new Query();
        query.TitleTypes = [TitleType.Game];
        query.Path = "games/trending-now";
        return query;
    }
    static getQueryForTopRatedGames(): Query {
        let query: Query = new Query();
        query.Sort = SortType.UserRatingDesc;
        query.NumVotes = new NumVotes(5000, null);
        query.TitleTypes = [TitleType.Game];
        query.Path = "games/top-rated";
        return query;
    }
    //#endregion




}