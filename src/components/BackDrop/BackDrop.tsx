import * as React from "react";
import {FC, useContext} from "react";

import {Box, Modal} from "@mui/material";

import {baseImagesUrl, ImageSizeEnum} from "../../common";
import {AuthContext} from "../../common/hocs";

import css from "./index.module.scss";
import {commonActions, commonSelectors, useAppDispatch} from "../../storage";
import {useSelector} from "react-redux";


const BackDrop: FC = () => {
    const dispatch = useAppDispatch();
    const backDropImgPath = useSelector(commonSelectors.setBackDropImgPath)
    const handleClose = () => {
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
                        backgroundImage: `url(${baseImagesUrl}${ImageSizeEnum.original}${backDropImgPath})`
                    }}
                />
            </Box>
        </Modal>

    );
};


export {BackDrop};