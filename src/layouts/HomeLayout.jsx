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
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import GitHubIcon from "@mui/icons-material/GitHub";
import toolsList from "../toolsList";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import LogoBlack from "../assets/logo_black.png";
import LogoWhite from "../assets/logo_white.png";
import {
    formatGroupTitle,
    getToolHref,
    groupToolsByGroup,
} from "../utils/tools";

export default function HomeLayout({ setThemeMode }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const githubUrl = "https://github.com/bilalabdulhadii/react-quick-tools";
    const logoSrc = theme.palette.mode === "dark" ? LogoWhite : LogoBlack;
    const activeTools = toolsList.filter((tool) => tool.isActive);
    const generalTools = activeTools.filter((tool) => !tool.group);
    const groupedTools = groupToolsByGroup(activeTools);
    const groupOrder = Array.from(
        new Set(
            activeTools
                .filter((tool) => tool.group)
                .map((tool) => tool.group)
        )
    );

    const parts = location.pathname.split("/").filter(Boolean);
    const [groupSegment, toolSegment] = parts;
    const matchedTool = toolsList.find((tool) => {
        if (tool.group) {
            return tool.group === groupSegment && tool.path === toolSegment;
        }
        return tool.path === groupSegment && !toolSegment;
    });
    const groupTitle = (() => {
        if (!groupSegment || toolSegment) return "";
        const hasGroup = toolsList.some((tool) => tool.group === groupSegment);
        return hasGroup ? formatGroupTitle(groupSegment) : "";
    })();
    const title = matchedTool ? matchedTool.title : groupTitle || "Quick Tools";

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
                height: "100vh",
                p: 3,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    backdropFilter: "blur(14px)",
                    background: "var(--app-surface)",
                    border: "1px solid",
                    borderColor: "var(--app-border)",
                    borderRadius: "16px",
                    padding: "10px 12px",
                }}>
                <Box>
                    <Typography
                        sx={{
                            fontWeight: 800,
                            fontSize: "1.1rem",
                            letterSpacing: "-0.02em",
                        }}>
                        Quick Tools
                    </Typography>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block" }}>
                        All utilities in one place
                    </Typography>
                </Box>
                <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                </IconButton>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    pr: 1,
                    pb: 1,
                }}>
                {generalTools.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                textTransform: "uppercase",
                                letterSpacing: "0.12em",
                                fontWeight: 700,
                                color: "text.secondary",
                                mb: 1,
                            }}>
                            General Tools
                        </Typography>
                        <Grid container spacing={1.5}>
                            {generalTools.map((tool) => {
                                const linkPath = getToolHref(tool);

                                return (
                                    <Grid
                                        size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                        key={tool.id}>
                                        <Box
                                            component={Link}
                                            to={linkPath}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                alignContent: "center",
                                                gap: "8px",
                                                textDecoration: "none",
                                                padding: "6px 10px",
                                                borderRadius: "999px",
                                                border: "1px solid",
                                                borderColor: "divider",
                                                background:
                                                    "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0))",
                                            }}>
                                            <Typography
                                                variant="body2"
                                                color="text.primary">
                                                {tool.icon}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.primary"
                                                sx={{
                                                    fontWeight: 500,
                                                }}>
                                                {tool.title}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                )}

                {groupOrder.map((group) => (
                    <Box key={group} sx={{ mb: 2 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                textTransform: "uppercase",
                                letterSpacing: "0.12em",
                                fontWeight: 700,
                                color: "text.secondary",
                                mb: 1,
                            }}>
                            {formatGroupTitle(group)}
                        </Typography>
                        <Grid container spacing={1.5}>
                            {groupedTools[group]?.map((tool) => {
                                const linkPath = getToolHref(tool);

                                return (
                                    <Grid
                                        size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                        key={tool.id}>
                                        <Box
                                            component={Link}
                                            to={linkPath}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                alignContent: "center",
                                                gap: "8px",
                                                textDecoration: "none",
                                                padding: "6px 10px",
                                                borderRadius: "999px",
                                                border: "1px solid",
                                                borderColor: "divider",
                                                background:
                                                    "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0))",
                                            }}>
                                            <Typography
                                                variant="body2"
                                                color="text.primary">
                                                {tool.icon}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.primary"
                                                sx={{
                                                    fontWeight: 500,
                                                }}>
                                                {tool.title}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                ))}
            </Box>
        </Box>
    );

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                background: "var(--app-bg)",
                color: "var(--app-text)",
                display: "flex",
                flexDirection: "column",
            }}>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    background: "var(--app-bar-bg)",
                    backdropFilter: "blur(14px)",
                    borderBottom: "1px solid",
                    borderColor: "var(--app-border)",
                    color: "var(--app-text)",
                }}>
                <Toolbar
                    sx={{
                        minHeight: { xs: 64, sm: 72 },
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{
                            mr: 0,
                            border: "1px solid",
                            borderColor: "var(--app-border)",
                            background: "var(--app-surface)",
                            "&:hover": {
                                background: "var(--app-card)",
                            },
                        }}
                        onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Box
                        onClick={() => navigate("/")}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px",
                            cursor: "pointer",
                            paddingLeft: { xs: "6px", sm: "10px" },
                        }}>
                        <Avatar
                            alt="Logo"
                            src={logoSrc}
                            sx={{
                                width: 30,
                                height: 30,
                                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.18)",
                            }}
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                userSelect: "none",
                                textDecoration: "none",
                                fontWeight: 700,
                                letterSpacing: "-0.02em",
                                maxWidth: { xs: 180, sm: 280, md: 420 },
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}>
                            {title}
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}>
                        <IconButton
                            size="large"
                            aria-label="GitHub repository"
                            component="a"
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="inherit"
                            sx={{
                                border: "1px solid",
                                borderColor: "var(--app-border)",
                                background: "var(--app-surface)",
                                "&:hover": {
                                    background: "var(--app-card)",
                                },
                            }}>
                            <GitHubIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="toggle theme"
                            color="inherit"
                            sx={{
                                border: "1px solid",
                                borderColor: "var(--app-border)",
                                background: "var(--app-surface)",
                                "&:hover": {
                                    background: "var(--app-card)",
                                },
                            }}
                            onClick={() =>
                                setThemeMode(theme.palette.mode !== "dark")
                            }>
                            {theme.palette.mode === "light" ? (
                                <DarkModeIcon />
                            ) : (
                                <LightModeIcon />
                            )}
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <Toolbar sx={{ minHeight: { xs: 64, sm: 72 } }} />

            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Container
                    maxWidth="lg"
                    sx={{
                        paddingTop: { xs: 4, sm: 6 },
                        paddingBottom: { xs: 8, sm: 12 },
                        flex: 1,
                    }}>
                    <Outlet />
                </Container>
            </Box>
            <Footer />

            <SwipeableDrawer
                anchor="top"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                PaperProps={{
                    sx: {
                        height: "100vh",
                        background:
                            "radial-gradient(120% 120% at 20% 0%, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0))",
                        backgroundColor: "var(--app-surface)",
                        backdropFilter: "blur(18px)",
                        borderBottom: "1px solid",
                        borderColor: "var(--app-border)",
                        boxShadow: "var(--app-shadow-strong)",
                    },
                }}>
                {drawerContent}
            </SwipeableDrawer>
        </Box>
    );
}
