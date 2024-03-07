import {ComponentsProps} from "@mui/material";
import {Dispatch, SetStateAction} from "react";

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