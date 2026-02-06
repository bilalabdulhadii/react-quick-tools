import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                background: "var(--app-surface)",
                textAlign: "center",
                padding: "14px 10px",
                mt: "auto",
                borderTop: "1px solid",
                borderColor: "var(--app-border)",
                boxSizing: "border-box",
                backdropFilter: "blur(10px)",
            }}
        >
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Copyright © {new Date().getFullYear()} Quick Tools App -
                Designed by{" "}
                <Link
                    href="https://bilalabdulhadi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    color="primary"
                    fontWeight="bold"
                >
                    Bilal Abdulhadi
                </Link>
            </Typography>
        </Box>
    );
}
