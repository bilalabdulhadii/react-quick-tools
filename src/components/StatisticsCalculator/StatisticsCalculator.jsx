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

export default function StatisticsCalculator({ type }) {
    const [numbers, setNumbers] = useState("");
    const { showTimedToast } = useToast();

    const parseNumbers = (input) =>
        input
            .split(/[\s,]+/)
            .map((n) => parseFloat(n))
            .filter((n) => !isNaN(n));

    const calculateResult = () => {
        const nums = parseNumbers(numbers);
        if (!nums.length) return null;

        switch (type) {
            case "mean":
                return (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(
                    2
                );
            case "median":
                nums.sort((a, b) => a - b);
                const mid = Math.floor(nums.length / 2);
                return nums.length % 2 !== 0
                    ? nums[mid]
                    : ((nums[mid - 1] + nums[mid]) / 2).toFixed(2);
            case "mode":
                const freq = {};
                let maxFreq = 0;
                let mode = [];
                nums.forEach((n) => {
                    freq[n] = (freq[n] || 0) + 1;
                    if (freq[n] > maxFreq) maxFreq = freq[n];
                });
                for (const key in freq) {
                    if (freq[key] === maxFreq) mode.push(Number(key));
                }
                return mode.length === nums.length
                    ? "No mode"
                    : mode.join(", ");
            default:
                return null;
        }
    };

    const result = calculateResult();

    const handleCopy = () => {
        if (!result) return;
        navigator.clipboard
            .writeText(result)
            .then(() => showTimedToast("Result copied!", "success"))
            .catch(() => showTimedToast("Failed to copy!", "error"));
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
                label="Enter numbers (comma or space separated)"
                multiline
                minRows={12}
                fullWidth
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
                sx={{ backgroundColor: "background.paper", borderRadius: "12px" }}
            />

            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    endIcon={<ContentCopyIcon />}
                    onClick={handleCopy}
                    disabled={!result}
                >
                    Copy
                </Button>
                <Button variant="outlined" onClick={() => setNumbers("")}>
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
                    {result !== null ? `${result}` : ""}
                </Typography>
            </Paper>
        </Box>
    );
}
