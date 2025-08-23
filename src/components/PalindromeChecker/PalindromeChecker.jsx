import { useState } from "react";
import {
    TextField,
    Paper,
    Typography,
    Box,
    Stack,
    Button,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useToast } from "../../contexts/ToastContext";

export default function PalindromeChecker() {
    const [text, setText] = useState("");
    const { showTimedToast } = useToast();

    const checkPalindrome = (input) => {
        const cleaned = input.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        const output = cleaned === cleaned.split("").reverse().join("");
        return output;
    };

    const handleCopy = () => {
        if (!text || isNaN(text)) return;
        const resultText = checkPalindrome(text)
            ? `${text} is a palindrome`
            : `${text} is not a palindrome`;

        navigator.clipboard
            .writeText(resultText)
            .then(() => showTimedToast("Result copied!", "success"))
            .catch(() => showTimedToast("Failed to copy!", "error"));
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
                    disabled={!text || isNaN(text)}
                >
                    Copy
                </Button>
                <Button variant="outlined" onClick={() => setText("")}>
                    Clear
                </Button>
            </Stack>

            <Paper
                variant="outlined"
                sx={{
                    width: "100%",
                    minHeight: "300px",
                }}
            >
                {checkPalindrome(text) !== null && text && (
                    <Typography
                        variant="body1"
                        sx={{
                            whiteSpace: "pre-wrap",
                            margin: "15px",
                        }}
                    >
                        {checkPalindrome(text)
                            ? `${text} is a palindrome`
                            : `${text} is not a palindrome`}
                    </Typography>
                )}
            </Paper>
        </Box>
    );
}
