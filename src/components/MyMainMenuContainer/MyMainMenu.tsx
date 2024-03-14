import * as React from "react";
import {FC, useEffect, useState} from "react";

import {Box, ButtonGroup} from "@mui/material";
import {useParams} from "react-router-dom";
import {v4} from "uuid";

import {myMenuItems} from "./constants";
import css from "./index.module.scss";
import {MyMainMenuItem} from "./SubComponents/MyMainMenuItem";


const MyMainMenu: FC = React.memo(() => {
    const {category} = useParams();
    const [isActive, setIsActive] = useState<string>();

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
                            <MyMainMenuItem
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

export {MyMainMenu};