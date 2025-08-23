import { useState } from "react";
import {
    Box,
    TextField,
    Paper,
    Typography,
    Button,
    Stack,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useToast } from "../../contexts/ToastContext";

export default function GreatestCommonDivisor() {
    const [num1, setNum1] = useState("");
    const [num2, setNum2] = useState("");
    const { showTimedToast } = useToast();

    const calculateGCD = (a, b) => {
        a = Math.abs(a);
        b = Math.abs(b);
        if (b === 0) return a;
        return calculateGCD(b, a % b);
    };

    const gcd =
        num1 && num2 && !isNaN(num1) && !isNaN(num2)
            ? calculateGCD(parseInt(num1), parseInt(num2))
            : null;

    const handleCopy = () => {
        if (!gcd) return;
        navigator.clipboard
            .writeText(gcd)
            .then(() => showTimedToast("GCD copied!", "success"))
            .catch(() => showTimedToast("Failed to copy!", "error"));
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                    label="Number 1"
                    variant="outlined"
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}
                    fullWidth
                    sx={{
                        backgroundColor: "background.paper",
                        borderRadius: "12px",
                    }}
                />
                <TextField
                    label="Number 2"
                    variant="outlined"
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}
                    fullWidth
                    sx={{
                        backgroundColor: "background.paper",
                        borderRadius: "12px",
                    }}
                />
            </Stack>

            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    endIcon={<ContentCopyIcon />}
                    onClick={handleCopy}
                    disabled={!gcd}
                >
                    Copy
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        setNum1("");
                        setNum2("");
                    }}
                >
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
                    {gcd !== null ? `GCD: ${gcd}` : ""}
                </Typography>
            </Paper>
        </Box>
    );
}
