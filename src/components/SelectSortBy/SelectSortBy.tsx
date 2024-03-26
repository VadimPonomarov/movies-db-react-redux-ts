import * as React from "react";
import {FC} from "react";

import {FormControl, Select, SelectChangeEvent} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {t} from "i18next";
import _ from "lodash";
import {useSelector} from "react-redux";

import {MovieSortByEnum} from "../../common";
import {ISearchParams} from "../../common/hocs/interfaces";
import {commonActions, commonSelectors, useAppDispatch} from "../../storage";

import {IProps} from "./interfaces";


const SelectSortBy: FC<IProps> = () => {
    const {sort_by, with_genres} = useSelector(commonSelectors.getSearchParams);
    const dispatch = useAppDispatch();

    const handleChange: (event: SelectChangeEvent) => void =
        (event) => {
            dispatch(
                commonActions.setSearchParams({
                        sort_by: event.target.value
                    } as ISearchParams
                )
            );
        };

    return (
        <FormControl
            sx={{m: 1}}
            size="small"
        >
            {!!with_genres.length && <Select
                variant={"standard"}
                value={sort_by}
                onChange={handleChange}
            >
                {Object.keys(MovieSortByEnum)
                    .map(item =>
                        <MenuItem
                            key={Object(MovieSortByEnum)[item]}
                            value={Object(MovieSortByEnum)[item]}
                        >
                            {_.upperCase(t(item))}
                        </MenuItem>)
                }

            </Select>}
        </FormControl>
    );
};

export {SelectSortBy};