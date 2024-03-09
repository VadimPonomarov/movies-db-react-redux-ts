import * as React from "react";
import {FC,} from "react";

import {Grid, Slider, TextField} from "@mui/material";
import {motion} from "framer-motion";

import {useAppMoviesEffect} from "../../common/hooks/useAppMoviesEffect";

import {mSpan, pSlider, pTextField} from "./constants";
import css from "./index.module.scss";
import {IProps} from "./interfaces";
import {useAppState} from "../../common/hooks/useAppState";


const PaginationSlider: FC<IProps> = React.memo(({props}) => {
    const {step, min, max, current = 1, nextPage} = props;
    const {query, page} = useAppMoviesEffect();

    const {
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
                        min={1}
                        max={500}
                        value={!!page ? +page : 1}
                        onChange={handleSliderChange}
                    />
                </Grid>
                <Grid
                    item
                    className={css.PSl__Grid_Grid2}
                >
                    <TextField
                        {...pTextField}
                        value={!!page ? +page : 1}
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