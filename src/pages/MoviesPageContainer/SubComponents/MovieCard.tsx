import * as React from "react";
import {FC, useState} from "react";

import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import {MyInitMotionProvider} from "common/hocs";
import {motion} from "framer-motion";
import {slice} from "lodash";
import moment from "moment";
import {useSelector} from "react-redux";

import {baseImagesUrl, ImageSizeEnum} from "../../../common";
import {UseAppCircularBadgeProps} from "../../../common/hooks/useAppCircularBadgeProps";
import {BadgeWithCircular} from "../../../components";
import {movieSelectors} from "../../../storage/slices/moviesSlice";
import {initMotion} from "../constants";
import css from "../index.module.scss";
import {ICardProps} from "../interfaces";


const MovieCard: FC<ICardProps> = ({props}) => {
    const activeCardList = useSelector(movieSelectors.getActiveCardList);
    const [isFullTitle, setIsFullTitle] = useState<boolean>(false);
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

    const {
        handleOriginalTitleClick,
        handleOnClick,
        handleTitleClick,
        getProps
    } =
        UseAppCircularBadgeProps({id, backdrop_path, setIsFullTitle, vote_average});

    return (
        <MyInitMotionProvider>
            <Card className={css.Ep__Card}>
                <Button
                    className={css.Ep__Card_Button}
                    onClick={handleOnClick}
                >
                    <Box className={css.Ep__Card_Box}
                         sx={{
                             backgroundImage: `url(${baseImagesUrl}${ImageSizeEnum.w300}${poster_path})`,
                             overflow: !isFullTitle ? "hidden" : "standart"
                         }}
                    >
                        <CardContent
                            className={css.Ep__Card_Content}
                        >
                            <Typography
                                className={css.Original_Title}
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
                            <Typography
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
                                        .trim() + " ..."
                                }
                            </Typography>
                        </CardContent>
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
                </Button>
                <BadgeWithCircular
                    movieId={id}
                    props={getProps()}
                />
            </Card>
        </MyInitMotionProvider>
    );
};

export {MovieCard};