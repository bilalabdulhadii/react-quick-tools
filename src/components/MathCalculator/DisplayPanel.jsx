import { Box, Typography } from "@mui/material";
import ToolCard from "../ToolCard";

export default function DisplayPanel({ input, result }) {
    return (
        <ToolCard
            sx={{
                padding: "10px",
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
        </ToolCard>
    );
}
