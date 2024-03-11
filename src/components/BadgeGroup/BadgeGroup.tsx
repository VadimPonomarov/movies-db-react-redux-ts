import * as React from "react";
import {FC} from "react";

import {Chip, Container, Stack} from "@mui/material";
import {indexOf} from "lodash";

import {useAppBg} from "../../common/hooks/useAppBG";

import css from "./index.module.scss";


const BadgeGroup: FC = React.memo(() => {

    const {genres, searchParams, handleClick} = useAppBg();

    return (
        <Container className={css.BG__Container}>
            <Stack
                className={css.BG__Stack}
                direction={"row"}
                spacing={1}
            >
                {!!genres.length &&
                    genres.map(item =>
                        <Chip
                            key={item.id}
                            className={css.BG__Chip}
                            style={{
                                backgroundColor: indexOf(searchParams.with_genres, item.id) >= 0 ? "lightblue" : "white"
                            }}
                            label={item.name}
                            variant="outlined"
                            onClick={() => handleClick(item.id)}
                            clickable
                        />
                    )
                }
            </Stack>
        </Container>
    );
});

export {BadgeGroup};