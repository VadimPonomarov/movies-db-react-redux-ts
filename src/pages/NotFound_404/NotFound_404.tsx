import * as React from "react";

import {Box, Link} from "@mui/material";

import styles from "./index.module.scss";

const NotFound404 = () => {
    return (
        <Box className={["container", styles.container].join(" ")}>
            <Box sx={{textAlign: "center"}}>
                <Box component={"h5"} className={"container"}><i>This page could not be found</i></Box>
                <Link href={"/home"} sx={{textDecoration: "none"}}><h3>👉 Home ...</h3></Link>
            </Box>
        </Box>
    );
};

export {NotFound404};