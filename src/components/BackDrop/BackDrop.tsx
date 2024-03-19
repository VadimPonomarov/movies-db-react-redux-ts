import * as React from "react";
import {FC} from "react";

import {Box, Modal} from "@mui/material";
import {useSelector} from "react-redux";

import {baseImagesUrl, ImageSizeEnum} from "../../common";
import {commonActions, commonSelectors, useAppDispatch} from "../../storage";

import css from "./index.module.scss";


const BackDrop: FC = () => {
    const dispatch = useAppDispatch();
    const backDropImgPath = useSelector(commonSelectors.setBackDropImgPath);
    const handleClose: () => void =
        () => {
            dispatch(commonActions.setBackDropImgPath(undefined));
        };

    return (
        <Modal
            open={!!backDropImgPath}
        >
            <Box className={css.BDrop__Box}>
                <Box
                    className={css.BDrop__Box_Box}
                    onClick={handleClose}
                    sx={{
                        backgroundImage:
                            `url(${baseImagesUrl}${ImageSizeEnum.original}${backDropImgPath})`
                    }}
                />
            </Box>
        </Modal>

    );
};


export {BackDrop};