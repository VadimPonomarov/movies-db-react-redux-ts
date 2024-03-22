import React from "react";

export interface IMenuProps {
    props: {
        anchorEl: HTMLElement,
        setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement>>
    }
}

export interface IMenuItemProps {
    props: {
        caption: string,
        onClick: () => void
    }
}