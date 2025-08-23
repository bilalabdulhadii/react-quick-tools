import { useState, useMemo, useEffect } from "react";
import {
    Box,
    TextField,
    Paper,
    Typography,
    Button,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useToast } from "../../contexts/ToastContext";

const conversionOptions = {
    binary: [
        { label: "Binary ↔ Decimal", from: "Binary", to: "Decimal" },
        { label: "Binary ↔ Octal", from: "Binary", to: "Octal" },
        { label: "Binary ↔ Hexadecimal", from: "Binary", to: "Hexadecimal" },
    ],
    octal: [
        { label: "Octal ↔ Decimal", from: "Octal", to: "Decimal" },
        { label: "Octal ↔ Binary", from: "Octal", to: "Binary" },
        { label: "Octal ↔ Hexadecimal", from: "Octal", to: "Hexadecimal" },
    ],
    decimal: [
        { label: "Decimal ↔ Binary", from: "Decimal", to: "Binary" },
        { label: "Decimal ↔ Octal", from: "Decimal", to: "Octal" },
        { label: "Decimal ↔ Hexadecimal", from: "Decimal", to: "Hexadecimal" },
    ],
    hexadecimal: [
        { label: "Hexadecimal ↔ Binary", from: "Hexadecimal", to: "Binary" },
        { label: "Hexadecimal ↔ Octal", from: "Hexadecimal", to: "Octal" },
        { label: "Hexadecimal ↔ Decimal", from: "Hexadecimal", to: "Decimal" },
    ],
};

export default function NumberSystemConverter({ numberSystem }) {
    const { showTimedToast } = useToast();
    const [value, setValue] = useState("");
    const [reverse, setReverse] = useState(false);
    const options = useMemo(
        () => conversionOptions[numberSystem] || [],
        [numberSystem]
    );
    const [selected, setSelected] = useState(options[0] || {});

    useEffect(() => {
        if (options.length > 0) {
            setSelected(options[0]);
        }
    }, [options]);

    const convertNumber = (val) => {
        if (!val) return "";

        const from = reverse ? selected.to : selected.from;
        const to = reverse ? selected.from : selected.to;

        try {
            let decimal;

            // Convert from the "from" system to decimal first
            switch (from) {
                case "Binary":
                    decimal = parseInt(val, 2);
                    break;
                case "Octal":
                    decimal = parseInt(val, 8);
                    break;
                case "Decimal":
                    decimal = parseInt(val, 10);
                    break;
                case "Hexadecimal":
                    decimal = parseInt(val, 16);
                    break;
                default:
                    return "";
            }

            if (isNaN(decimal)) return "Invalid input";

            // Convert from decimal to "to" system
            switch (to) {
                case "Binary":
                    return decimal.toString(2);
                case "Octal":
                    return decimal.toString(8);
                case "Decimal":
                    return decimal.toString(10);
                case "Hexadecimal":
                    return decimal.toString(16).toUpperCase();
                default:
                    return "";
            }
        } catch {
            return "Invalid input";
        }
    };

    const converted = useMemo(
        () => convertNumber(value),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [value, selected, reverse]
    );

    const handleCopy = () => {
        if (!converted || converted === "Invalid input") return;
        navigator.clipboard
            .writeText(converted)
            .then(() => showTimedToast("Converted value copied!", "success"))
            .catch(() => showTimedToast("Failed to copy!", "error"));
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl fullWidth>
                <InputLabel>Conversion</InputLabel>
                <Select
                    value={selected.label}
                    label="Conversion"
                    onChange={(e) =>
                        setSelected(
                            options.find((o) => o.label === e.target.value)
                        )
                    }
                    sx={{
                        backgroundColor: "background.paper",
                        borderRadius: "12px",
                    }}
                >
                    {options.map((o) => (
                        <MenuItem key={o.label} value={o.label}>
                            {o.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                    label={`Value (${reverse ? selected.to : selected.from})`}
                    variant="outlined"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    fullWidth
                    sx={{
                        backgroundColor: "background.paper",
                        borderRadius: "12px",
                    }}
                />
                <IconButton onClick={() => setReverse(!reverse)}>
                    <SwapHorizIcon />
                </IconButton>
            </Stack>

            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    endIcon={<ContentCopyIcon />}
                    onClick={handleCopy}
                    disabled={!converted || converted === "Invalid input"}
                >
                    Copy
                </Button>
                <Button variant="outlined" onClick={() => setValue("")}>
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
                    {converted || ""}
                </Typography>
            </Paper>
        </Box>
    );
}
