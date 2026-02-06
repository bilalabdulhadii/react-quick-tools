import { useState } from "react";
import {
    TextField,
    Typography,
    Box,
    Stack,
    Button,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useToast } from "../../contexts/ToastContext";
import ToolCard from "../ToolCard";

export default function TextReverser() {
    const [text, setText] = useState("");
    const { showTimedToast } = useToast();

    const reverseText = (input) => {
        let output = input;
        output = output.split("").reverse().join("");
        return output;
    };

    const handleCopy = () => {
        const reversed = reverseText(text);
        if (!reversed || reversed.trim() === "") return;

        navigator.clipboard
            .writeText(reversed)
            .then(() => {
                showTimedToast("Reversed text copied!", "success");
            })
            .catch(() => {
                showTimedToast("Failed to copy text!", "error");
            });
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
                label="Enter your text"
                multiline
                minRows={12}
                maxRows={12}
                fullWidth
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
                sx={{
                    backgroundColor: "background.paper",
                    borderRadius: "12px",
                }}
            />

            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    endIcon={<ContentCopyIcon />}
                    onClick={handleCopy}
                    disabled={!reverseText(text)}
                >
                    Copy
                </Button>
                <Button variant="outlined" onClick={() => setText("")}>
                    Clear
                </Button>
            </Stack>

            <ToolCard
                sx={{
                    width: "100%",
                    minHeight: "300px",
                    overflowY: "auto",
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        whiteSpace: "pre-wrap",
                        margin: "15px",
                    }}
                >
                    {reverseText(text)}
                </Typography>
            </ToolCard>
        </Box>
    );
}
