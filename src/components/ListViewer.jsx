import { Grid, Card, Typography, Stack, Box } from "@mui/material";
import { Link } from "react-router-dom";

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
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        {group === "Other"
                            ? "General Tools"
                            : group
                                  .split("-")
                                  .map(
                                      (word) =>
                                          word.charAt(0).toUpperCase() +
                                          word.slice(1).toLowerCase()
                                  )
                                  .join(" ")}
                    </Typography>

                    <Grid container spacing={3}>
                        {tools.map((tool) => {
                            const linkPath = tool.group
                                ? `${tool.group}/${tool.path}`
                                : tool.path;

                            return (
                                <Grid
                                    size={{ xs: 6, sm: 4, md: 4, lg: 3 }}
                                    key={tool.id}
                                >
                                    <Card
                                        sx={{
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            textAlign: "center",
                                            transition: "0.3s",
                                            boxShadow: 1,
                                            "&:hover": {
                                                transform: "translateY(-3px)",
                                                boxShadow: 3,
                                            },
                                        }}
                                    >
                                        <Stack
                                            component={Link}
                                            to={`/${linkPath}`}
                                            spacing={1}
                                            sx={{
                                                padding: "10px",
                                                textDecoration: "none",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    textAlign: "left",
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    color="primary"
                                                >
                                                    {tool.icon}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="primary"
                                                    sx={{
                                                        textDecoration:
                                                            "underline",
                                                    }}
                                                >
                                                    {tool.title}
                                                </Typography>
                                            </Box>
                                            {/* {tool.description && (
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {tool.description}
                                                </Typography>
                                            )} */}
                                        </Stack>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>
            ))}
        </Stack>
    );
}
