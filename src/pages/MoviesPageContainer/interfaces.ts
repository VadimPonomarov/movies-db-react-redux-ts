import {IMovieListInfo, IMovieResult} from "../../common";

export interface IBGProps {
    props: {
        info: IMovieListInfo,
        prevPage: () => void,
        nextPage: () => void,
    }
}

export interface ICardProps {
    props: {
        item: IMovieResult,
    }
}