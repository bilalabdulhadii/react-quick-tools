import { useState } from "react";
import {
    Box,
    Container,
    SwipeableDrawer,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import toolsList from "../toolsList";
import { Link, Outlet } from "react-router-dom";

export default function HomeLayout() {
    const [open, setOpen] = useState(false);

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
            <Typography
                sx={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    mb: 2,
                }}
            >
                Quick Tools
            </Typography>

            <Grid container spacing={1}>
                {toolsList
                    .filter((tool) => tool.isActive)
                    .map((tool) => {
                        const linkPath = tool.group
                            ? `${tool.group}/${tool.path}`
                            : tool.path;

                        return (
                            <Grid
                                size={{
                                    sm: 6,
                                    md: 6,
                                    lg: 2.4,
                                    xl: 2.4,
                                }}
                                key={tool.id}
                            >
                                <ListItemButton
                                    component={Link}
                                    to={linkPath}
                                    sx={{
                                        borderRadius: 1,
                                        bgcolor: "background.paper",
                                        "&:hover": {
                                            bgcolor: "primary.light",
                                            color: "primary.contrastText",
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            color: "inherit",
                                            minWidth: 0,
                                            margin: "0 5px",
                                        }}
                                    >
                                        {tool.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={tool.title} />
                                </ListItemButton>
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
                    sx={{ marginTop: "150px", marginBottom: "150px" }}
                >
                    <AppBar position="fixed">
                        <Toolbar>
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
                            <Typography
                                variant="h5"
                                component={Link}
                                sx={{
                                    flexGrow: 1,
                                    userSelect: "none",
                                    cursor: "pointer",
                                    textDecoration: "none",
                                    color: "#ffffff",
                                }}
                                to="/"
                            >
                                Quick Tools
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Outlet />
                </Container>
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
