import * as React from "react";
import {FC,} from "react";

import {Grid, Slider, TextField} from "@mui/material";
import {motion} from "framer-motion";

import {useAppMoviesEffect} from "../../common/hooks/useAppMoviesEffect";

import {mSpan, pSlider, pTextField} from "./constants";
import css from "./index.module.scss";
import {IProps} from "./interfaces";
import {useAppState} from "./useAppState";


const PaginationSlider: FC<IProps> = React.memo(({props}) => {
    const {step, min, max, current = 1, nextPage} = props;
    const {query} = useAppMoviesEffect();
    const page_ = query.get("page");

    const {
        value,
        handleSliderChange,
        handleInputChange,
    } = useAppState(current);

    return (
        <motion.span
            {...mSpan}
        >
            <Grid
                className={css.PSl__Grid}
                container
            >
                <Grid
                    item xs
                    className={css.PSl__Grid_Grid1}
                >
                    <Slider
                        {...pSlider}
                        defaultValue={1}
                        min={1}
                        max={+max <= 100 ? +max : 500}
                        value={value}
                        onChange={handleSliderChange}
                    />
                </Grid>
                <Grid
                    item
                    className={css.PSl__Grid_Grid2}
                >
                    <TextField
                        {...pTextField}
                        value={page_}
                        onChange={handleInputChange}
                        onBlur={nextPage}
                        inputProps={{
                            step,
                            min,
                            max,
                            type: "number",
                        }}
                    />
                </Grid>
            </Grid>
        </motion.span>
    );
});

export {PaginationSlider};