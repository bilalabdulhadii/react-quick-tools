import { useState } from "react";
import {
    Box,
    TextField,
    Typography,
    Paper,
    Button,
    Stack,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useToast } from "../../contexts/ToastContext";

export default function TextCaseConverter({ caseType }) {
    const [text, setText] = useState("");
    const { showTimedToast } = useToast();

    const handleCopy = () => {
        const converted = convertText(text);

        if (!converted || converted.trim() === "") {
            return;
        }

        navigator.clipboard
            .writeText(converted)
            .then(() => {
                showTimedToast("Converted text copied!", "success");
            })
            .catch(() => {
                showTimedToast("Failed to copy text!", "error");
            });
    };

    const convertText = (input) => {
        switch (caseType) {
            case "camel-case":
                return input
                    .toLowerCase()
                    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
                        index === 0 ? word.toLowerCase() : word.toUpperCase()
                    )
                    .replace(/\s+/g, "");
            case "pascal-case":
                return input
                    .toLowerCase()
                    .replace(/(?:^\w|\b\w)/g, (word) => word.toUpperCase())
                    .replace(/\s+/g, "");
            case "snake-case":
                return input.toLowerCase().replace(/\s+/g, "_");
            case "screaming-snake-case":
                return input.toUpperCase().replace(/\s+/g, "_");
            case "kebab-case":
                return input.toLowerCase().replace(/\s+/g, "-");
            case "train-case":
                return input
                    .toLowerCase()
                    .replace(/\b\w/g, (l) => l.toUpperCase())
                    .replace(/\s+/g, "-");
            case "dot-case":
                return input.toLowerCase().replace(/\s+/g, ".");
            case "path-case":
                return input.toLowerCase().replace(/\s+/g, "/");
            case "cobol-case":
                return input.toUpperCase().replace(/\s+/g, "-");
            case "uppercase":
                return input.toUpperCase();
            case "lowercase":
                return input.toLowerCase();
            case "capitalize":
                return (
                    input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
                );
            case "title-case":
                return input.replace(/\b\w/g, (l) => l.toUpperCase());
            case "sentence-case":
                return input.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) =>
                    c.toUpperCase()
                );
            case "toggle-case":
                return input
                    .split(" ")
                    .map(
                        (word) =>
                            word.charAt(0).toLowerCase() +
                            word.slice(1).toUpperCase()
                    )
                    .join(" ");
            default:
                return input;
        }
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
                sx={{ backgroundColor: "#fff", borderRadius: "12px" }}
            />
            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    endIcon={<ContentCopyIcon />}
                    onClick={handleCopy}
                >
                    Copy
                </Button>
            </Stack>
            <Paper
                variant="outlined"
                sx={{
                    width: "100%",
                    minHeight: 300,
                    overflowY: "auto",
                }}
            >
                <Typography
                    variant="body1"
                    sx={{ whiteSpace: "pre-wrap", margin: "35px 15px 15px" }}
                >
                    {convertText(text)}
                </Typography>
            </Paper>
        </Box>
    );
}
