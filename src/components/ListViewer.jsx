import { Grid, Typography, Stack, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { formatGroupTitle, getToolHref } from "../utils/tools";

export default function ListViewer({ toolsList }) {
    const groupedTools = toolsList.reduce((acc, tool) => {
        const group = tool.group || "Other";
        if (!acc[group]) acc[group] = [];
        acc[group].push(tool);
        return acc;
    }, {});

    return (
        <Stack spacing={4} sx={{ p: 3 }}>
            {Object.entries(groupedTools).map(([group, tools]) => (
                <div key={group}>
                    <Typography
                        variant="h4"
                        color="text.primary"
                        sx={{
                            mb: 2,
                            fontWeight: 700,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        {group === "Other"
                            ? "General Tools"
                            : formatGroupTitle(group)}
                    </Typography>

                    <Grid container spacing={3}>
                        {tools.map((tool, index) => {
                            const linkPath = getToolHref(tool);

                            return (
                                <Grid
                                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                    key={tool.id}
                                >
                                    <Box
                                        sx={{
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            textAlign: "center",
                                            transition:
                                                "transform 200ms ease, box-shadow 200ms ease",
                                            boxShadow: "var(--app-shadow)",
                                            background: "var(--app-card)",
                                            border: "1px solid",
                                            borderColor: "var(--app-border)",
                                            borderRadius: "16px",
                                            overflow: "hidden",
                                            position: "relative",
                                            "&:hover": {
                                                transform: "translateY(-3px)",
                                                boxShadow:
                                                    "var(--app-shadow-strong)",
                                            },
                                            "&::before": {
                                                content: '""',
                                                position: "absolute",
                                                inset: 0,
                                                background:
                                                    "radial-gradient(80% 80% at 0% 0%, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0))",
                                                opacity: 0,
                                                transition: "opacity 200ms ease",
                                                pointerEvents: "none",
                                            },
                                            "&:hover::before": {
                                                opacity: 1,
                                            },
                                            animation: "fadeUp 520ms ease both",
                                            animationDelay: `${index * 40}ms`,
                                        }}
                                    >
                                        <Stack
                                            component={Link}
                                            to={linkPath}
                                            spacing={1}
                                            sx={{
                                                padding: "14px",
                                                textDecoration: "none",
                                                position: "relative",
                                                zIndex: 1,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    textAlign: "left",
                                                    alignItems: "center",
                                                    gap: "8px",
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    color="text.primary"
                                                    sx={{ fontWeight: 600 }}
                                                >
                                                    {tool.icon}
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    color="text.primary"
                                                    sx={{ fontWeight: 600 }}
                                                >
                                                    {tool.title}
                                                </Typography>
                                            </Box>
                                            {tool.description && (
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {tool.description}
                                                </Typography>
                                            )}
                                        </Stack>
                                    </Box>
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>
            ))}
        </Stack>
    );
}
