import { createTheme } from "@mui/material/styles";

const sharedSettings = {
    typography: {
        fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
        h1: {
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
            letterSpacing: "-0.04em",
        },
        h2: {
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
            letterSpacing: "-0.03em",
        },
        h3: {
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
            letterSpacing: "-0.02em",
        },
        h4: {
            fontWeight: 700,
            letterSpacing: "-0.02em",
        },
        h5: {
            fontWeight: 700,
            letterSpacing: "-0.01em",
        },
        button: {
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1rem",
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: "var(--app-bg)",
                    color: "var(--app-text)",
                },
            },
        },
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
            main: "#1d3b5f",
        },
        secondary: {
            main: "#f97316",
        },
        background: {
            default: "#f6f1ea",
            paper: "#ffffff",
        },
        text: {
            primary: "#1f2937",
            secondary: "#4b5563",
        },
    },
    ...sharedSettings,
});

// Dark Theme
export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#4aa8ff",
        },
        secondary: {
            main: "#f59e0b",
        },
        background: {
            default: "#0f141b",
            paper: "#141a23",
        },
        text: {
            primary: "#e2e8f0",
            secondary: "#94a3b8",
        },
    },
    ...sharedSettings,
});
