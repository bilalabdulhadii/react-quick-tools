import { useState } from "react";
import {
    Box,
    TextField,
    Typography,
    Paper,
    Button,
    Stack,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useToast } from "../../contexts/ToastContext";

export default function SpaceRemover() {
    const [text, setText] = useState("");
    const [removeSpaces, setRemoveSpaces] = useState(true);
    const [removeTabs, setRemoveTabs] = useState(false);
    const [removeLineBreaks, setRemoveLineBreaks] = useState(false);
    const { showTimedToast } = useToast();

    const cleanText = (input) => {
        let output = input;

        if (removeSpaces) {
            output = output.replace(/\s+/g, " ").trim();
        }
        if (removeTabs) {
            output = output.replace(/\t+/g, " ");
        }
        if (removeLineBreaks) {
            output = output.replace(/[\r\n]+/g, " ");
        }

        return output;
    };

    const handleCopy = () => {
        const cleaned = cleanText(text);
        if (!cleaned || cleaned.trim() === "") return;

        navigator.clipboard
            .writeText(cleaned)
            .then(() => {
                showTimedToast("Cleaned text copied!", "success");
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

            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={removeSpaces}
                            onChange={(e) => setRemoveSpaces(e.target.checked)}
                        />
                    }
                    sx={{ color: "text.primary" }}
                    label="Remove extra spaces"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={removeTabs}
                            onChange={(e) => setRemoveTabs(e.target.checked)}
                        />
                    }
                    sx={{ color: "text.primary" }}
                    label="Remove tabs"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={removeLineBreaks}
                            onChange={(e) =>
                                setRemoveLineBreaks(e.target.checked)
                            }
                        />
                    }
                    sx={{ color: "text.primary" }}
                    label="Remove line breaks"
                />
            </FormGroup>

            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    endIcon={<ContentCopyIcon />}
                    onClick={handleCopy}
                    disabled={!cleanText(text)}
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
                    overflowY: "auto",
                }}
            >
                <Typography
                    variant="body1"
                    sx={{ whiteSpace: "pre-wrap", margin: "15px" }}
                >
                    {cleanText(text)}
                </Typography>
            </Paper>
        </Box>
    );
}
