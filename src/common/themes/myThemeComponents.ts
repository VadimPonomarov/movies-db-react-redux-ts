import {createTheme, Theme} from "@mui/material";

export const myThemeComponents:Theme = createTheme({
    components: {
        MuiContainer: {
            defaultProps: {
                sx: {padding: 1},
            }
        },
        MuiButton:{
            defaultProps: {
                variant:"outlined",
                color:"primary",
                size:"small",
                sx:{margin:1, width:"100%"}
          }
        },

        MuiStack: {
            defaultProps: {
                spacing: 1
            }
        },

        MuiPaper: {
            defaultProps: {
                sx: {padding: 2},
                elevation: 2,

            }
        },

        MuiTextField: {
            defaultProps: {
                size: "small",
            }
        },
    },
});