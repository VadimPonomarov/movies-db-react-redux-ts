import * as React from "react";
import {FC} from "react";

import {Box, Chip, Container} from "@mui/material";
import {indexOf} from "lodash";

import {IGenre, useAppBg} from "../../common";

import css from "./index.module.scss";


const BadgeGroup: FC = () => {

    const {
        genres,
        searchParams,
        handleClick
    } = useAppBg();

    return (
        <Box className={css.BG__Container}>
            <Container
                className={css.BG__Stack}
            >
                {!!genres.length &&
                    genres.map((item: IGenre) =>
                        <Chip
                            key={item.id}
                            className={css.BG__Chip}
                            style={{
                                backgroundColor:
                                    indexOf(searchParams.with_genres, item.id) >= 0 ?
                                        "lightblue" :
                                        "white"
                            }}
                            label={item.name}
                            variant="outlined"
                            onClick={
                                () => handleClick(item.id)
                            }
                            clickable
                        />
                    )
                }
            </Container>
        </Box>
    );
};

export {BadgeGroup};