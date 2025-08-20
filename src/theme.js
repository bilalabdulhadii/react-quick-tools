import { createTheme } from "@mui/material/styles";

// Shared settings (typography, shape, overrides)
const sharedSettings = {
    typography: {
        fontFamily: "Roboto, sans-serif",
        button: {
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1.2rem",
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {},
            },
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                },
            },
        },
    },
};

// Light Theme
export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1976D2", // Blue
        },
        secondary: {
            main: "#FF9800", // Orange
        },
        background: {
            default: "#F5F5F5",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#212121",
            secondary: "#424242",
        },
    },
    ...sharedSettings,
});

// Dark Theme
export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#1976D2", // Blue
        },
        secondary: {
            main: "#FF9800", // Orange
        },
        background: {
            default: "#121212",
            paper: "#1E1E1E",
        },
        text: {
            primary: "#FFFFFF",
            secondary: "#B0BEC5",
        },
    },
    ...sharedSettings,
});
