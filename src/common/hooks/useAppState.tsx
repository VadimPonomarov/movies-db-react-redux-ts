import * as React from "react";

import {BehaviorSubject, debounceTime, switchMap} from "rxjs";

import {commonActions, useAppDispatch} from "../../storage";

import {useAppMoviesEffect} from "./useAppMoviesEffect";

const useAppState = () => {
    const dispatch = useAppDispatch();
    const {setQuery} = useAppMoviesEffect();
    const flow$ =
        new BehaviorSubject({page: "1"});
    flow$
        .pipe(
            debounceTime(500),
            switchMap(async (value) => value),
        );
    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        const newPage =
            {page: "" + newValue};
        flow$.next(newPage);
        dispatch(commonActions.setSearchParams(newPage));
        const subscription =
            flow$.subscribe(page => setQuery(page));
        subscription.unsubscribe();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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