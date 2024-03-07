import * as React from "react";
import {FC, useContext} from "react";

import {Box, Modal} from "@mui/material";

import {baseImagesUrl, ImageSizeEnum} from "../../common";
import {AuthContext} from "../../common/hocs";

import css from "./index.module.scss";


const BackDrop: FC = () => {
    const {backDropImgPath, setBackDropImgPath} = useContext(AuthContext);

    const handleClose = () => {
        setBackDropImgPath(undefined);
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