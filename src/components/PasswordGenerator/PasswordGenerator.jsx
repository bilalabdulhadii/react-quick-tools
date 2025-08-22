import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    FormControlLabel,
    Checkbox,
    Paper,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useToast } from "../../contexts/ToastContext";

export default function PasswordGenerator() {
    const { showTimedToast } = useToast();
    const [length, setLength] = useState(12);
    const [includeUpper, setIncludeUpper] = useState(true);
    const [includeLower, setIncludeLower] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [password, setPassword] = useState("");

    const generatePassword = () => {
        let chars = "";
        if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz";
        if (includeNumbers) chars += "0123456789";
        if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

        if (!chars) return setPassword("");

        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(result);
    };

    const handleCopy = () => {
        if (!password) return;
        navigator.clipboard
            .writeText(password)
            .then(() => showTimedToast("Password copied!", "success"))
            .catch(() => showTimedToast("Failed to copy!", "error"));
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
                label="Length"
                type="number"
                value={length}
                fullWidth
                onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val > 0 && val <= 64) setLength(val);
                }}
                inputProps={{ min: 1, max: 64 }}
                sx={{ backgroundColor: "#fff", borderRadius: "12px" }}
            />
            <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={generatePassword}>
                    Generate
                </Button>
                <Button
                    variant="contained"
                    endIcon={<ContentCopyIcon />}
                    onClick={handleCopy}
                    disabled={!password}
                >
                    Copy
                </Button>
            </Stack>

            <Stack direction="row" spacing={2}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={includeUpper}
                            onChange={(e) => setIncludeUpper(e.target.checked)}
                        />
                    }
                    label="Uppercase"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={includeLower}
                            onChange={(e) => setIncludeLower(e.target.checked)}
                        />
                    }
                    label="Lowercase"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={includeNumbers}
                            onChange={(e) =>
                                setIncludeNumbers(e.target.checked)
                            }
                        />
                    }
                    label="Numbers"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={includeSymbols}
                            onChange={(e) =>
                                setIncludeSymbols(e.target.checked)
                            }
                        />
                    }
                    label="Symbols"
                />
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
                    {password}
                </Typography>
            </Paper>
        </Box>
    );
}
