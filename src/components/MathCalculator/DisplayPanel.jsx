import { Paper, Box, Typography } from "@mui/material";

export default function DisplayPanel({ input, result }) {
    return (
        <Paper
            variant="outlined"
            sx={{
                padding: "10px",
                border: "1px solid #aaa",
                minHeight: "150px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                position: "relative",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column-reverse",
                    textAlign: "right",
                    overflowWrap: "break-word",
                    letterSpacing: "2px",
                }}
            >
                <Typography variant="h3">{result}</Typography>
                <Typography variant="h4">{input}</Typography>
            </Box>
        </Paper>
    );
}
