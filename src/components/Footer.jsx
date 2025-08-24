import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: (theme) => theme.palette.background.paper,
                textAlign: "center",
                padding: "10px 10px",
                mt: "auto",
                borderTop: "1px solid",
                borderColor: "divider",
                height: "60px",
                boxSizing: "border-box",
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
