import { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    Stack,
} from "@mui/material";
import ToolCard from "../ToolCard";

export default function RandomDraw() {
    const [total, setTotal] = useState(10);
    const [numbers, setNumbers] = useState([]);
    const [remaining, setRemaining] = useState([]);
    const [history, setHistory] = useState([]);

    const handleSetNumbers = () => {
        const num = parseInt(total);
        if (!num || num <= 0) return;
        const arr = Array.from({ length: num }, (_, i) => i + 1);
        setNumbers(arr);
        setRemaining(arr);
        setHistory([]);
    };

    const handleDraw = () => {
        if (remaining.length === 0) return;
        const randomIndex = Math.floor(Math.random() * remaining.length);
        const drawn = remaining[randomIndex];
        const newRemaining = remaining.filter((n) => n !== drawn);
        setRemaining(newRemaining);
        setHistory([drawn, ...history]);
    };

    const handleRestart = () => {
        setNumbers([]);
        setRemaining([]);
        setHistory([]);
        setTotal("");
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
                type="number"
                label="Enter total number"
                variant="outlined"
                value={total}
                fullWidth
                onChange={(e) => setTotal(e.target.value)}
                sx={{
                    backgroundColor: "background.paper",
                    borderRadius: "12px",
                }}
            />
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Button variant="contained" onClick={handleSetNumbers}>
                    Set Numbers
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDraw}
                    disabled={remaining.length === 0}
                >
                    Draw Number
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleRestart}
                >
                    Restart
                </Button>
                {numbers.length > 0 && <></>}
            </Stack>

            <ToolCard
                sx={{
                    width: "100%",
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Box sx={{ margin: "15px" }}>
                    <Typography variant="h3" my={5}>
                        {history[history.length - 1]}
                    </Typography>
                    <Box>
                        <Typography variant="h6">Draw History</Typography>
                        {history.length === 0 ? (
                            <Typography>No draws yet</Typography>
                        ) : (
                            history.map((h, i) => (
                                <Typography key={i}>{h}</Typography>
                            ))
                        )}
                    </Box>
                </Box>
            </ToolCard>

            <Box mb={2}>
                <Typography variant="h6" color="text.primary">
                    Remaining Numbers:
                </Typography>
                <Typography color="text.primary">
                    {remaining.join(", ") || "None left"}
                </Typography>
            </Box>
        </Box>
    );
}
