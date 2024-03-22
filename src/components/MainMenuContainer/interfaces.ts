import {ComponentsProps} from "@mui/material";

interface Props {
    caption: string,
    uri: string,
    elementProps: ComponentsProps,
    isActive: string,
}

export interface IProps {
    props?: Partial<Props>;
}