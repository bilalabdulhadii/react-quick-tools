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

export default function PrimeNumberChecker() {
    const [number, setNumber] = useState("");
    const { showTimedToast } = useToast();

    const isPrime = (num) => {
        const n = parseInt(num, 10);
        if (isNaN(n) || n < 2) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
        }
        return true;
    };

    const handleCopy = () => {
        if (!number || isNaN(number)) return;
        const resultText = isPrime(number)
            ? `${number} is a prime number`
            : `${number} is not a prime number`;

        navigator.clipboard
            .writeText(resultText)
            .then(() => showTimedToast("Result copied!", "success"))
            .catch(() => showTimedToast("Failed to copy!", "error"));
    };

    const result = number
        ? isPrime(number)
            ? `${number} is a prime number`
            : `${number} is not a prime number`
        : "";

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
                label="Enter a number"
                variant="outlined"
                fullWidth
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                sx={{ backgroundColor: "#fff", borderRadius: "12px" }}
            />

            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    endIcon={<ContentCopyIcon />}
                    onClick={handleCopy}
                    disabled={!number || isNaN(number)}
                >
                    Copy
                </Button>
                <Button variant="outlined" onClick={() => setNumber("")}>
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
                <Typography variant="h5" sx={{ margin: "15px" }}>
                    {result || ""}
                </Typography>
            </Paper>
        </Box>
    );
}
