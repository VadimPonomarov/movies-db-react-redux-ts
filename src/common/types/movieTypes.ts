export interface IMovieDates {
    maximum: string,
    minimum: string
}

export interface IMovieResult {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: "en",
    original_title: string,
    overview: string
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export interface IProductionCompany {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
}

export interface IProductionCountry {
    iso_3166_1: string,
    name: string
}

export interface ISpokenLanguage {
    english_name: string,
    iso_639_1: string,
    name: string
}

export interface IMovieDetails {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: any,
    budget: number,
    genres: IGenre[],
    homepage: string,
    id: number,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: IProductionCompany[],
    production_countries: IProductionCountry[],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: ISpokenLanguage[],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export interface IMovieList {
    dates: IMovieDates,
    page: number,
    results: IMovieResult[],
    total_pages: number,
    total_results: number
}

export interface IMovieListInfo {
    dates: IMovieDates,
    page: number,
    total_pages: number,
    total_results: number
}

export enum MovieCategoryEnum {
    popular = "popular",
    now_playing = "now_playing",
    top_rated = "top_rated",
    upcoming = "upcoming",
    discover = "discover"
}

export type ImageSize = "w200" | "w300" | "w400" | "w500" | "original"

export enum ImageSizeEnum {
    w200 = "w200",
    w300 = "w300",
    w400 = "w400",
    w500 = "w500",
    original = "original",
}

export type ListType = (category: string | MovieCategoryEnum) => string;
export type ItemByIdType = (id: string | number) => string;
export type AuthSessionIdResponseType = {
    success: boolean,
    guest_session_id: string,
    expires_at: string
}


export type UrlType = {
    auth: {
        sessionId: string;
    },
    list?: {
        getList?: ListType,
        genreList?: string,
        discoverList?: string,

    },
    getRatingById?: ItemByIdType,
    getMovieById?: ItemByIdType
}

export interface IGenre {
    id: number;
    name: string;
}

export interface IGenreListResponse {
    genres: IGenre[];
}

export enum LanguageEnum {
    en = "en-Us",
    uk = "uk-Uk",
    ru = "ru-Ru",
}

export enum IMovieSortBy {
    "original_title.asc" = "original_title.asc",
    "original_title.desc" = "original_title.desc",
    "popularity.asc" = "popularity.asc",
    "popularity.desc" = "popularity.desc",
    "revenue.desc" = "revenue.desc",
    "primary_release_date.asc" = "primary_release_date.asc",
    "primary_release_date.desc" = "primary_release_date.desc",
    "title.asc" = "title.asc",
    "title.desc" = "title.desc",
    "vote_average.asc" = "vote_average.asc",
    "vote_average.desc" = "vote_average.desc",
    "vote_count.asc" = "vote_count.asc",
    "vote_count.desc" = "vote_count.desc"
}