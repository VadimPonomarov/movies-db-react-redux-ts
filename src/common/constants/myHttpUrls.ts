import {MovieCategoryEnum, UrlType} from "../types";

const baseUrl: string = "https://api.themoviedb.org/3/";
const baseImagesUrl: string = "https://image.tmdb.org/t/p/";

const myHttpUrls: UrlType = {
    auth:{
        sessionId: "authentication/guest_session/new"
    },
    list: {
        getList: (category: MovieCategoryEnum) => `movie/${category}`,
        genreList: "genre/movie/list",
        discoverList: "discover/movie",

    },
    getMovieById: (id: number) => `movie/${id}`,
    getRatingById: (id: string) => `movie/${id}/rating`,
};

export {baseUrl, myHttpUrls, baseImagesUrl};