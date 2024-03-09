import * as React from "react";

import {BehaviorSubject, delay, switchMap} from "rxjs";

import {useAppMoviesEffect} from "./useAppMoviesEffect";

const useAppState = (initial: number) => {
    const [value, setValue] = React.useState(initial);
    const {setQuery} = useAppMoviesEffect();
    const flow$ = new BehaviorSubject({page: "1"});
    flow$.pipe(switchMap(async (value) => value), delay(1000));
    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
        flow$.next({page: "" + newValue});
        const subscription = flow$.subscribe(event => setQuery(event));
        subscription.unsubscribe();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === "" ? 1 : Number(event.target.value));
        flow$.next({page: "" + event.target.value});
        const subscription = flow$.subscribe(event => setQuery(event));
        subscription.unsubscribe();
    };

    return {value, setValue, handleSliderChange, handleInputChange};
};

export {useAppState};