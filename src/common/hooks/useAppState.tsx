import * as React from "react";

import {BehaviorSubject, debounceTime} from "rxjs";

import {commonActions, useAppDispatch} from "../../storage";

import {useAppMoviesEffect} from "./useAppMoviesEffect";

interface IReturn {
    handleSliderChange: (event: Event, newValue: number | number[]) => void,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const useAppState: () => IReturn =
    () => {
        const dispatch = useAppDispatch();
        const {setQuery} = useAppMoviesEffect();
        const flow$ =
            new BehaviorSubject({page: "1"});
        flow$
            .pipe(
                debounceTime(1000),
            )
        ;
        const handleSliderChange: (event: Event, newValue: number | number[]) => void =
            (event, newValue) => {
                const newPage =
                    {page: "" + newValue};
                flow$.next(newPage);
                dispatch(commonActions.setSearchParams(newPage));
                const subscription =
                    flow$.subscribe(page => setQuery(page));
                subscription.unsubscribe();
            };

        const handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void =
            (event) => {
                const newPage =
                    {page: "" + event.target.value};
                flow$.next(newPage);
                dispatch(commonActions.setSearchParams(newPage));
                const subscription =
                    flow$.subscribe(page => setQuery(page));
                subscription.unsubscribe();
            };

        return {handleSliderChange, handleInputChange};
    };

export {useAppState};