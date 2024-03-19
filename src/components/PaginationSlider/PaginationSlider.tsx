import * as React from "react";
import {FC} from "react";

import {Grid, Slider, TextField} from "@mui/material";
import {motion} from "framer-motion";

import {useAppMoviesEffect, useAppState} from "../../common";

import {mSpan, pSlider, pTextField} from "./constants";
import css from "./index.module.scss";
import {IProps} from "./interfaces";


const PaginationSlider: FC<IProps> = ({props}) => {
    const {step, min, max, nextPage} = props;
    const {page} = useAppMoviesEffect();

    const {
        handleSliderChange,
        handleInputChange,
    } = useAppState();

    const handleSelect: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => void =
        (e) => {
            e.target.select();
        };

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
                        max={(+page + 100) < 500 ? +page + 100 : 500}
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
                        onFocus={(e) => handleSelect(e)}
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
};

export {PaginationSlider};