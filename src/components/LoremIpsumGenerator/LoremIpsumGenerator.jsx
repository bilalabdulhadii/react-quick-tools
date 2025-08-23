import { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useToast } from "../../contexts/ToastContext";

// Sample lorem ipsum text
const sampleText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ";

export default function LoremIpsumGenerator() {
    const { showTimedToast } = useToast();
    const [type, setType] = useState("characters");
    const [count, setCount] = useState(123);
    const [generatedText, setGeneratedText] = useState(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    );

    const generateLorem = () => {
        let text = "";
        if (type === "paragraphs") {
            for (let i = 0; i < count; i++) {
                text += sampleText + "\n\n";
            }
        } else if (type === "sentences") {
            for (let i = 0; i < count; i++) {
                text += sampleText;
            }
        } else if (type === "words") {
            const words = sampleText.split(" ");
            for (let i = 0; i < count; i++) {
                text += words[i % words.length] + " ";
            }
        } else if (type === "characters") {
            let fullText = sampleText.repeat(
                Math.ceil(count / sampleText.length)
            );
            text = fullText.slice(0, count);
        }

        setGeneratedText(text.trim());
    };

    const handleCopy = () => {
        if (!generatedText) return;
        navigator.clipboard
            .writeText(generatedText)
            .then(() => showTimedToast("Copied!", "success"))
            .catch(() => showTimedToast("Failed!", "error"));
    };

    const handleClear = () => {
        setGeneratedText("");
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <FormControl>
                <InputLabel>Type</InputLabel>
                <Select
                    value={type}
                    label="Type"
                    fullWidth
                    onChange={(e) => setType(e.target.value)}
                    sx={{
                        backgroundColor: "background.paper",
                        borderRadius: "12px",
                    }}
                >
                    <MenuItem value="characters">Characters</MenuItem>
                    <MenuItem value="paragraphs">Paragraphs</MenuItem>
                    <MenuItem value="sentences">Sentences</MenuItem>
                    <MenuItem value="words">Words</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Count"
                type="number"
                fullWidth
                value={count}
                onChange={(e) => setCount(Math.max(1, e.target.value))}
                inputProps={{ min: 1 }}
                sx={{
                    backgroundColor: "background.paper",
                    borderRadius: "12px",
                }}
            />
            <Stack direction="row" spacing={2} alignItems="center">
                <Button variant="contained" onClick={generateLorem}>
                    Generate
                </Button>
                <Button
                    variant="contained"
                    endIcon={<ContentCopyIcon />}
                    onClick={handleCopy}
                    disabled={!generatedText}
                >
                    Copy
                </Button>
                <Button variant="outlined" onClick={handleClear}>
                    Clear
                </Button>
            </Stack>

            <Paper
                variant="outlined"
                sx={{
                    width: "100%",
                    minHeight: "300px",
                    overflowY: "auto",
                    whiteSpace: "pre-wrap",
                }}
            >
                <Box
                    sx={{
                        margin: "15px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mb: 1 }}
                    >
                        Characters: {generatedText.length}
                    </Typography>
                    <Typography variant="body1">{generatedText}</Typography>
                </Box>
            </Paper>
        </Box>
    );
}
