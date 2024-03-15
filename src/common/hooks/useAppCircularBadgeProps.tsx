import React from "react";

import {Typography} from "@mui/material";
import _ from "lodash";
import {useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";

import {commonActions, useAppDispatch} from "../../storage";
import {movieSelectors} from "../../storage/slices/moviesSlice";

const UseAppCircularBadgeProps = (initials: {
    id: number,
    vote_average: number,
    backdrop_path: string,
    setIsFullTitle: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const {
        id,
        vote_average,
        backdrop_path,
        setIsFullTitle
    } = initials;

    const activeCardList = useSelector(movieSelectors.getActiveCardList);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [query] = useSearchParams();


    const handleOnClick = () => {
        navigate(`${id}`, {state: {page: query.get("page")}});
    };

    const handleOriginalTitleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
        dispatch(commonActions.setBackDropImgPath(backdrop_path));
    };
    const handleTitleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
        setIsFullTitle(prevState => !prevState);
    };

    const getProps: any = () => {
        const prp = {
            rate: vote_average * 10,
            content: {
                initial_:
                    Math.floor(vote_average * 10),
                whileLoading:
                    <Typography
                        variant={"h6"} color={"blue"}
                    >
                        UA
                    </Typography>,
                success_:
                    <Typography>
                        {Math.floor(vote_average * 10)}
                    </Typography>
            }
        };

        return !_.includes(activeCardList, id) ? {
            ...prp,
            btn: {
                bgColor: "default"
            }
        } : {...prp};


    };

    return {getProps, handleOnClick, handleTitleClick, handleOriginalTitleClick};
};

export {UseAppCircularBadgeProps};