import * as React from "react";
import {FC} from "react";

import {FormControl, Select, SelectChangeEvent} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import _ from "lodash";
import {useSelector} from "react-redux";

import {LanguageEnum} from "../../common";
import {commonActions, commonSelectors, useAppDispatch} from "../../storage";

import {IProps} from "./interfaces";


const SelectLanguage: FC<IProps> = () => {
    const {language} = useSelector(commonSelectors.getSearchParams);
    const dispatch = useAppDispatch();

    const handleChange = (event: SelectChangeEvent) => {
        dispatch(commonActions.setSearchParams({language: event.target.value}));
    };

    return (
        <FormControl sx={{m: 1, minWidth: 70}} size="small">
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={language}
                onChange={handleChange}
            >
                {Object.keys(LanguageEnum)
                    .map(item =>
                        <MenuItem
                            value={Object(LanguageEnum)[item]}
                        >
                            {_.upperCase(item)}
                        </MenuItem>)
                }

            </Select>
        </FormControl>
    );
};

export {SelectLanguage};