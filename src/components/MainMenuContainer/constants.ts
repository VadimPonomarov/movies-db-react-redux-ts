import {MovieCategoryEnum} from "../../common";

import {IProps} from "./interfaces";

type MenuItemType = {
    [key in keyof typeof MovieCategoryEnum]?: IProps
}

const getItem: (item: string) => Partial<MenuItemType> =
    (item) => ({
        [`${item}`]: {
            props: {
                caption: item,
                uri: `/${item}`
            }
        }
    });

export const myMenuItems: Partial<MenuItemType>[] =
    Object.keys(MovieCategoryEnum).map(
        item => getItem(item)
    );