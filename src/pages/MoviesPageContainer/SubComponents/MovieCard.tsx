import * as React from "react";
import {FC, memo, useEffect, useRef, useState} from "react";

import {Box, Button, Card, CardContent, Container, Typography} from "@mui/material";
import {red} from "@mui/material/colors";
import {InitMotionProvider} from "common/hocs";
import {motion} from "framer-motion";
import _, {slice} from "lodash";
import moment from "moment";
import {useInView} from "react-intersection-observer";
import {useSelector} from "react-redux";
import {fromEvent, merge, tap} from "rxjs";

import {baseImagesUrl, ImageSizeEnum} from "../../../common";
import {UseAppCircularBadgeProps} from "../../../common/hooks/useAppCircularBadgeProps";
import {BadgeWithCircular} from "../../../components";
import {movieSelectors} from "../../../storage/slices/moviesSlice";
import {initMotion} from "../constants";
import css from "../index.module.scss";
import {ICardProps} from "../interfaces";


const MovieCard_: FC<ICardProps> = ({props}) => {
    const {
        item: {
            id,
            backdrop_path,
            poster_path,
            release_date,
            title,
            original_title,
            vote_average,
        }
    } = props;

    const activeCardList =
        useSelector(movieSelectors.getActiveCardList);
    const [isFullTitle, setIsFullTitle] =
        useState<boolean>(false);

    const {
        handleOriginalTitleClick,
        handleOnClick,
        handleTitleClick,
        getProps
    } =
        UseAppCircularBadgeProps({
            id,
            backdrop_path,
            setIsFullTitle,
            vote_average
        });


    const {ref, inView} =
        useInView({
            threshold: 0,
            triggerOnce: true
        });

    const [showPointer, setShowPointer] = useState<boolean>(false);
    const refCard = useRef(null);

    useEffect(() => {
        const enter$ =
            fromEvent(refCard.current, "mouseenter")
                .pipe(tap(() => setShowPointer(true)));
        const leave$ =
            fromEvent(refCard.current, "mouseleave")
                .pipe(tap(() => setShowPointer(false)));
        const mouseMoveCompleted$ =
            merge(enter$, leave$);
        const sub = mouseMoveCompleted$.subscribe();

        return () => {
            sub.unsubscribe();
        };
    }, []);

    const display = {
        display: showPointer ?
            "block" :
            "none"
    };


    return (
        <InitMotionProvider>
            <Card
                ref={refCard}
                className={css.Ep__Card}
            >
                <Typography
                    className={css.Pointer_Badge}
                    {...display}
                >
                    👈 Click
                </Typography>
                <Typography
                    className={css.Pointer_Title}
                    {...display}
                >
                    👆 Click
                </Typography>
                <Typography
                    className={css.Pointer_Body}
                    {...display}
                >
                    👆 Click
                </Typography>
                <Button
                    className={css.Ep__Card_Button}
                    sx={
                        _.includes(activeCardList, id) ?
                            {border: `2px solid ${red[500]}`}
                            : null
                    }
                    onClick={handleOnClick}
                >
                    <Box
                        ref={ref}
                        className={css.Ep__Card_Box}
                        sx={{
                            backgroundImage: inView &&
                                `url(${baseImagesUrl}${ImageSizeEnum.w300}${poster_path})`,
                            overflow:
                                !isFullTitle ?
                                    "hidden" :
                                    "standard"
                        }}
                    >
                        <CardContent
                            className={css.Ep__Card_Content}
                        >
                            <Typography
                                className={css.Ep__Card_Content_Original_Title}
                                variant="h5"
                                onClick={
                                    (e) =>
                                        handleOriginalTitleClick(e)
                                }

                            >
                                <motion.div
                                    {...initMotion}
                                >
                                    {original_title}
                                </motion.div>
                            </Typography>
                            <Box
                                className={css.Ep__Card_Content_Box}
                            >
                                <Typography
                                    className={css.Ep__Card_Content_Box_T}
                                    variant="subtitle1"
                                    color="text.secondary"
                                    onClick={
                                        (e) => handleTitleClick(e)
                                    }
                                >
                                    {isFullTitle ?
                                        title :
                                        slice(title
                                            .split(" "), 0, 3)
                                            .join(" ")
                                            .trim()
                                    }
                                    {(!isFullTitle && title.split(" ").length > 3) &&
                                        <Container>...</Container>
                                    }
                                </Typography>
                                <Box
                                    className={css.Ep__Card_Box_Box}
                                >

                                    <Typography
                                        className={css.Ep__Card_Box_Box_T}
                                        variant={"caption"}
                                    >
                                        {moment(release_date).format("DD.MM.YYYY")}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Box>
                </Button>
                <BadgeWithCircular
                    movieId={id}
                    props={getProps()}
                />
            </Card>
        </InitMotionProvider>
    );
};

export const MovieCard = memo(MovieCard_);