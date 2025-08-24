import { useState } from "react";
import {
    Box,
    Container,
    SwipeableDrawer,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Grid,
    Avatar,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import toolsList from "../toolsList";
import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Logo from "../assets/logo.png";

export default function HomeLayout({ setThemeMode }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const parts = location.pathname.split("/").filter(Boolean);
    const lastPart = parts.length > 0 ? parts[parts.length - 1] : "";
    const matchedTool = toolsList.find((tool) => tool.path === lastPart);
    const title = matchedTool ? matchedTool.title : "Quick Tools";

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        )
            return;
        setOpen(open);
    };

    const drawerContent = (
        <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            sx={{
                maxWidth: "100%",
                p: 3,
                boxSizing: "border-box",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography
                    sx={{
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        mb: 2,
                    }}
                >
                    Quick Tools
                </Typography>
                <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                </IconButton>
            </Box>

            <Grid container spacing={1}>
                {toolsList
                    .filter((tool) => tool.isActive)
                    .map((tool) => {
                        const linkPath = tool.group
                            ? `${tool.group}/${tool.path}`
                            : tool.path;

                        return (
                            <Grid
                                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                key={tool.id}
                            >
                                <Box
                                    component={Link}
                                    to={linkPath}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignContent: "center",
                                        gap: "5px",
                                        textDecoration: "none",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {tool.icon}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            textDecoration: "underline",
                                        }}
                                    >
                                        {tool.title}
                                    </Typography>
                                </Box>
                            </Grid>
                        );
                    })}
            </Grid>
        </Box>
    );

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                bgcolor: (theme) => theme.palette.background.default,
            }}
        >
            <Box>
                <Container
                    maxWidth="md"
                    sx={{
                        marginTop: "150px",
                        marginBottom: "150px",
                        minHeight: "75vh",
                    }}
                >
                    <AppBar position="fixed">
                        <Toolbar
                            sx={{
                                bgcolor: (theme) => theme.palette.primary.main,
                            }}
                        >
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Box
                                onClick={() => (window.location.href = "/")}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                <Avatar
                                    alt="Logo"
                                    src={Logo}
                                    sx={{ width: 28, height: 28 }}
                                />
                                <Typography
                                    variant="h5"
                                    sx={{
                                        userSelect: "none",
                                        textDecoration: "none",
                                        color: "#ffffff",
                                    }}
                                >
                                    {title}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                }}
                            />
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="secondary"
                                onClick={() =>
                                    setThemeMode(theme.palette.mode !== "dark")
                                }
                            >
                                {theme.palette.mode === "light" ? (
                                    <DarkModeIcon />
                                ) : (
                                    <LightModeIcon />
                                )}
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Outlet />
                </Container>
                <Footer />
            </Box>

            <SwipeableDrawer
                anchor="top"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {drawerContent}
            </SwipeableDrawer>
        </Box>
    );
}
