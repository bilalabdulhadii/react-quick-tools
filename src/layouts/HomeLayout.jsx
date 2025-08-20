import { useState } from "react";
import {
    Box,
    Container,
    SwipeableDrawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    ListSubheader,
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
                width: { xs: "100vw", sm: 300, md: 300 },
                maxWidth: "100%",
                p: 3,
                boxSizing: "border-box",
            }}
        >
            <List
                subheader={
                    <ListSubheader
                        sx={{
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                            bgcolor: "transparent",
                            mb: 1,
                        }}
                    >
                        Tools
                    </ListSubheader>
                }
            >
                {/* {toolsList
                    .filter((tool) => tool.isActive)
                    .map((tool) => (
                        <ListItem disablePadding key={tool.id}>
                            <ListItemButton
                                sx={{
                                    borderRadius: 1,
                                    px: 1.5,
                                    "&:hover": {
                                        bgcolor: "primary.light",
                                        color: "primary.contrastText",
                                    },
                                }}
                                component={Link}
                                to={tool.path}
                            >
                                <ListItemIcon
                                    sx={{ color: "inherit", minWidth: 40 }}
                                >
                                    {tool.icon}
                                </ListItemIcon>
                                <ListItemText primary={tool.title} />
                            </ListItemButton>
                        </ListItem>
                    ))} */}

                {toolsList
                    .filter((tool) => tool.isActive)
                    .map((tool) => {
                        const linkPath = tool.group
                            ? `${tool.group}/${tool.path}`
                            : tool.path;

                        return (
                            <ListItem disablePadding key={tool.id}>
                                <ListItemButton
                                    sx={{
                                        borderRadius: 1,
                                        px: 1.5,
                                        "&:hover": {
                                            bgcolor: "primary.light",
                                            color: "primary.contrastText",
                                        },
                                    }}
                                    component={Link}
                                    to={linkPath}
                                >
                                    <ListItemIcon
                                        sx={{ color: "inherit", minWidth: 40 }}
                                    >
                                        {tool.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={tool.title} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
            </List>
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
                                Tools
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
