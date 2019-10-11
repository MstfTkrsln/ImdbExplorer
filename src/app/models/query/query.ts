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

    public HeaderText: string = null;

    constructor(
    ) {
        this.Count = 50;
        this.Page = 1;
        this.Sort = SortType.PopularityDesc;
        this.ReleaseDate = new ReleaseDate(new Date('1900-01-01'), null);
        this.UserRating = new UserRating(null, null);
        this.NumVotes = new NumVotes(null, null);
        //this.MovieMeter = new MovieMeter(null, null);
        this.HeaderText = "SearchResults";
    }

    public deepCopy() {
        return JSON.parse(JSON.stringify(this));
    }

    static getQueryForPopular(): Query {
        let query: Query = new Query();
        query.HeaderText = "TrendingNow";
        return query;
    }

    static getQueryForInTheaters(): Query {
        let today: Date = new Date();
        today.setMonth(today.getMonth() - 3);

        let query: Query = new Query();
        query.Groups = [Group._NowPlaying];
        query.ReleaseDate = new ReleaseDate(today, null);
        query.HeaderText = "InTheaters";
        return query;
    }


    //#region Movies
    static getQueryForPopularMovies(): Query {
        let query: Query = new Query();
        query.TitleTypes = [TitleType.Feature];
        query.HeaderText = "TrendingMovies";
        return query;
    }

    static getQueryForTopRatedMovies(): Query {
        let query: Query = new Query();
        query.Sort = SortType.UserRatingDesc;
        query.Groups = [Group._Top1000];
        query.TitleTypes = [TitleType.Feature];
        query.HeaderText = "TopRatedMovies";
        return query;
    }

    static getQueryForBoxOfficeMovies(): Query {
        let query: Query = new Query();
        query.Sort = SortType.BoxOfficeDesc;
        query.TitleTypes = [TitleType.Feature];
        query.HeaderText = "BoxOfficeUS";
        return query;
    }

    static getQueryForTop250Movies(): Query {
        let query: Query = new Query();
        query.Groups = [Group._Top250];
        query.TitleTypes = [TitleType.Feature];
        query.Sort = SortType.UserRatingDesc;
        query.Count = 250;
        query.HeaderText = "Top250";
        return query;
    }
    static getQueryForOscarWinnerMovies(): Query {
        let query: Query = new Query();
        query.Sort = SortType.ReleaseDateDesc;
        query.Groups = [Group.OscarWinner];
        query.HeaderText = "OscarWinningMovies";
        return query;
    }
    static getQueryForPictureWinnerMovies(): Query {
        let query: Query = new Query();
        query.Sort = SortType.ReleaseDateDesc;
        query.Groups = [Group.BestPictureWinner];
        query.HeaderText = "BestPictureWinningMovies";
        return query;
    }
    static getQueryForDirectorWinnerMovies(): Query {
        let query: Query = new Query();
        query.Sort = SortType.ReleaseDateDesc;
        query.Groups = [Group.BestDirectorWinner];
        query.HeaderText = "BestDirectorWinningMovies";
        return query;
    }
    static getQueryForPopularMoviesOnNetflix(): Query {
        let query: Query = new Query();
        query.TitleTypes = [TitleType.Feature];
        query.Companies = [Company.Netflix];
        query.HeaderText = "TrendingMoviesOnNetflix";
        return query;
    }
    //#endregion


    //#region Series
    static getQueryForPopularSeries(): Query {
        let query: Query = new Query();
        query.TitleTypes = [TitleType.TvSeries, TitleType.MiniSeries];
        query.HeaderText = "TrendingSeries";
        return query;
    }

    static getQueryForTopRatedSeries(): Query {
        let query: Query = new Query();
        query.Sort = SortType.UserRatingDesc;
        query.NumVotes = new NumVotes(25000, null);
        query.TitleTypes = [TitleType.TvSeries, TitleType.MiniSeries];
        query.HeaderText = "TopRatedSeries";
        return query;
    }
    static getQueryForGoldenGlobeWinnerSeries(): Query {
        let query: Query = new Query();
        query.Sort = SortType.ReleaseDateDesc;
        query.NumVotes = new NumVotes(25000, null);
        query.Groups = [Group.GoldenGlobeWinner];
        query.TitleTypes = [TitleType.TvSeries, TitleType.MiniSeries];
        query.HeaderText = "GoldenGlobeWinningSeries";
        return query;
    }
    static getQueryForEmmyWinnerSeries(): Query {
        let query: Query = new Query();
        query.Sort = SortType.ReleaseDateDesc;
        query.NumVotes = new NumVotes(25000, null);
        query.Groups = [Group.EmmyWinner];
        query.TitleTypes = [TitleType.TvSeries, TitleType.MiniSeries];
        query.HeaderText = "EmmyWinningSeries";
        return query;
    }
    static getQueryForPopularSeriesOnNetflix(): Query {
        let query: Query = new Query();
        query.TitleTypes = [TitleType.TvSeries, TitleType.MiniSeries];
        query.Companies = [Company.Netflix];
        query.HeaderText = "TrendingSeriesOnNetflix";
        return query;
    }
    //#endregion


    //#region Documentaries
    static getQueryForPopularDocumentaries(): Query {
        let query: Query = new Query();
        query.TitleTypes = [TitleType.Documentary];
        query.HeaderText = "TrendingDocumentaries";
        return query;
    }
    static getQueryForTopRatedDocumentaries(): Query {
        let query: Query = new Query();
        query.Sort = SortType.UserRatingDesc;
        query.NumVotes = new NumVotes(10000, null);
        query.Genres = [Genre.Documentary];
        query.HeaderText = "TopRatedDocumentaries";
        return query;
    }
    static getQueryForEmmyWinnerDocumentaries(): Query {
        let query: Query = new Query();
        query.Sort = SortType.ReleaseDateDesc;
        query.Groups = [Group.EmmyWinner];
        query.TitleTypes = [TitleType.Documentary];
        query.HeaderText = "EmmyWinningDocumentaries";
        return query;
    }
    static getQueryForOscarWinnerDocumentaries(): Query {
        let query: Query = new Query();
        query.Sort = SortType.ReleaseDateDesc;
        query.Groups = [Group.OscarWinner];
        query.TitleTypes = [TitleType.Documentary];
        query.HeaderText = "OscarWinningDocumentaries";
        return query;
    }
    static getQueryForPopularDocumentariesOnNetflix(): Query {
        let query: Query = new Query();
        query.TitleTypes = [TitleType.Documentary];
        query.Companies = [Company.Netflix];
        query.HeaderText = "TrendingDocumentariesOnNetflix";
        return query;
    }
    //#endregion


    //#region Games
    static getQueryForPopularGames(): Query {
        let query: Query = new Query();
        query.TitleTypes = [TitleType.Game];
        query.HeaderText = "TrendingGames";
        return query;
    }
    static getQueryForTopRatedGames(): Query {
        let query: Query = new Query();
        query.Sort = SortType.UserRatingDesc;
        query.NumVotes = new NumVotes(5000, null);
        query.TitleTypes = [TitleType.Game];
        query.HeaderText = "TopRatedGames";
        return query;
    }
    //#endregion




}