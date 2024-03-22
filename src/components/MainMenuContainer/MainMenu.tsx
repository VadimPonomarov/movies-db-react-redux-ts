import * as React from "react";
import {FC, useEffect, useState} from "react";

import {Box, ButtonGroup} from "@mui/material";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {v4} from "uuid";

import {commonSelectors} from "../../storage";

import {myMenuItems} from "./constants";
import css from "./index.module.scss";
import {MainMenuItem} from "./SubComponents/MainMenuItem";


const MainMenu: FC = React.memo(() => {
    const {category} = useParams();
    const currentCategory = useSelector(commonSelectors.getCurrentCategory);
    const [isActive, setIsActive] = useState<string | undefined>(currentCategory);

    useEffect(() => {
        setIsActive(category);
    }, [category]);

    return (
        <ButtonGroup
            variant="text"
        >
            <Box
                className={css.BG__Box_Container}
            >
                {myMenuItems &&
                    myMenuItems.map(item =>
                        Object.keys(item).map(key =>
                            <MainMenuItem
                                key={v4()}
                                props={{
                                    ...Object(item)[key].props,
                                    isActive
                                }}
                            />
                        ))}
            </Box>
        </ButtonGroup>
    );
});

export {MainMenu};