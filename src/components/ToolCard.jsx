import { Paper } from "@mui/material";

export default function ToolCard({ children, sx, variant, ...props }) {
    return (
        <Paper
            variant={variant || "outlined"}
            elevation={0}
            sx={{
                background: "var(--app-card)",
                borderColor: "var(--app-border)",
                borderRadius: "16px",
                ...sx,
            }}
            {...props}
        >
            {children}
        </Paper>
    );
}
