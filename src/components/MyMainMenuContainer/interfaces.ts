import {Dispatch, SetStateAction} from "react";

import {ComponentsProps} from "@mui/material";

interface Props {
    caption: string,
    uri: string,
    elementProps: ComponentsProps,
    isActive: string,
    setIsActive: Dispatch<SetStateAction<string>>
}

export interface IProps {
    props?: Partial<Props>;
}