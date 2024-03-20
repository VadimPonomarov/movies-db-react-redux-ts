import * as React from "react";
import {FC, SyntheticEvent} from "react";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StarIcon from "@mui/icons-material/Star";
import {Box, CardContent, CardMedia, Rating, Stack, Typography} from "@mui/material";
import moment from "moment";

import {baseImagesUrl, ImageSizeEnum} from "../../../common";
import {BadgeWithCircular} from "../../../components";
import {useAppDispatch} from "../../../storage";
import {movieActions} from "../../../storage/slices/moviesSlice";

import css from "./index.module.scss";
import {IProps} from "./interfaces";


const MovieDetailsCard: FC<IProps> = ({props}) => {
    const {
        movieDetails: {
            id,
            backdrop_path,
            poster_path,
            release_date,
            title,
            original_language,
            vote_average,
            genres,
            overview,
            runtime,
        }
    } = props;
    const dispatch = useAppDispatch();

    const handleSetRating: (e: SyntheticEvent, value: number | null) => void =
        (e, value) => {
            dispatch(
                movieActions
                    .sendMovieRating({id, value})
            );
        };

    return (
        <Box
            className={css.MDC__Container}
            sx={{
                backgroundImage:
                    `url(${baseImagesUrl}${ImageSizeEnum.original}${backdrop_path})`,
            }}
        >
            <Box>
                <Stack
                    className={css.MDC__Card}
                    direction={"row"}
                >
                    <CardMedia
                        className={css.MDC__CardMedia}
                        component="img"
                        image={
                            `${baseImagesUrl}${ImageSizeEnum.w300}${poster_path}`
                        }
                    />

                    <CardContent>
                        <Stack
                            spacing={20}
                        >
                            <Box>
                                <Typography
                                    variant="h3"
                                    color="white"
                                >
                                    {title} ({moment(release_date).format("YYYY")})
                                </Typography>
                                <Typography
                                    className={css.MDC__Content_UnderTitle}
                                    variant="h6"
                                >
                                    <Box
                                        className={css.MDC__Content_NumberBox}
                                        component={"span"}
                                    >
                                        {Math.floor(Math.random() * 100)}
                                    </Box>
                                    <Box
                                        className={css.MDC__Content_Info}
                                    >
                                        {moment(release_date).format("DD/MM/YYYY")}
                                        ({original_language.toUpperCase()})
                                        <FiberManualRecordIcon sx={{fontSize: "small"}}/>
                                        {genres.map(item => item.name).join(",")}
                                        <FiberManualRecordIcon sx={{fontSize: "small"}}/>
                                        {moment().hours(runtime / 60).format("H")}h
                                        {moment().hours((runtime % 60) / 60).format("mm")}

                                    </Box>
                                </Typography>
                                <Rating
                                    className={css.MDC__Rating}
                                    precision={0.5}
                                    onChange={handleSetRating}
                                    name="customized-10"
                                    defaultValue={vote_average}
                                    max={10}
                                    emptyIcon={
                                        <StarIcon
                                            className={css.StarIcon}
                                        />
                                    }
                                />
                            </Box>
                            <Box
                                className={css.MDC__Overview}
                            >
                                <Typography
                                    variant="subtitle1"
                                    color="white"
                                    component="div"
                                >
                                    {overview}
                                </Typography>
                            </Box>
                        </Stack>
                    </CardContent>
                    <Box>
                        <BadgeWithCircular
                            props={
                                {
                                    rate: +vote_average * 10,
                                    progress: {size: 90},
                                    content: {
                                        initial_: `${Math.floor(vote_average * 10)}%`,
                                        whileLoading: `${Math.floor(vote_average * 10)}%`,
                                        success_: `${Math.floor(vote_average * 10)}%`,

                                    }
                                }
                            }
                        />
                    </Box>
                </Stack>
            </Box>
        </Box>

    );
};

export {MovieDetailsCard};