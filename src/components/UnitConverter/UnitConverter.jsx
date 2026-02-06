import { useState, useMemo, useEffect } from "react";
import {
    Box,
    TextField,
    Typography,
    Button,
    Stack,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useToast } from "../../contexts/ToastContext";
import ToolCard from "../ToolCard";

const conversionOptions = {
    length: [
        { label: "Meters ↔ Centimeters", from: "m", to: "cm", factor: 100 },
        { label: "Meters ↔ Kilometers", from: "m", to: "km", factor: 0.001 },
        { label: "Meters ↔ Inches", from: "m", to: "in", factor: 39.3701 },
        { label: "Meters ↔ Feet", from: "m", to: "ft", factor: 3.28084 },
        { label: "Miles ↔ Kilometers", from: "mi", to: "km", factor: 1.60934 },
    ],
    weight: [
        { label: "Kilograms ↔ Grams", from: "kg", to: "g", factor: 1000 },
        { label: "Kilograms ↔ Pounds", from: "kg", to: "lb", factor: 2.20462 },
        { label: "Grams ↔ Ounces", from: "g", to: "oz", factor: 0.035274 },
        { label: "Pounds ↔ Ounces", from: "lb", to: "oz", factor: 16 },
    ],
    volume: [
        { label: "Liters ↔ Milliliters", from: "l", to: "ml", factor: 1000 },
        {
            label: "Liters ↔ Gallons (US)",
            from: "l",
            to: "gal",
            factor: 0.264172,
        },
        { label: "Liters ↔ Cups", from: "l", to: "cup", factor: 4.22675 },
    ],
    temperature: [
        { label: "Celsius ↔ Fahrenheit", from: "C", to: "F" },
        { label: "Celsius ↔ Kelvin", from: "C", to: "K" },
        { label: "Fahrenheit ↔ Kelvin", from: "F", to: "K" },
    ],
    speed: [
        { label: "km/h ↔ m/s", from: "km/h", to: "m/s", factor: 0.277778 },
        { label: "km/h ↔ mph", from: "km/h", to: "mph", factor: 0.621371 },
        { label: "m/s ↔ mph", from: "m/s", to: "mph", factor: 2.23694 },
    ],
    time: [
        { label: "Seconds ↔ Minutes", from: "s", to: "min", factor: 1 / 60 },
        { label: "Minutes ↔ Hours", from: "min", to: "h", factor: 1 / 60 },
        { label: "Hours ↔ Days", from: "h", to: "d", factor: 1 / 24 },
    ],
    data: [
        { label: "Bits ↔ Bytes", from: "bit", to: "B", factor: 1 / 8 },
        { label: "Bytes ↔ Kilobytes", from: "B", to: "KB", factor: 1 / 1024 },
        {
            label: "Kilobytes ↔ Megabytes",
            from: "KB",
            to: "MB",
            factor: 1 / 1024,
        },
    ],
    energy: [
        { label: "Joules ↔ Calories", from: "J", to: "cal", factor: 0.239006 },
        {
            label: "Watts ↔ Horsepower",
            from: "W",
            to: "hp",
            factor: 0.00134102,
        },
    ],
    pressure: [
        { label: "Pascal ↔ Bar", from: "Pa", to: "bar", factor: 1e-5 },
        { label: "Pascal ↔ PSI", from: "Pa", to: "psi", factor: 0.000145038 },
    ],
    area: [
        {
            label: "Square meters ↔ Square kilometers",
            from: "m²",
            to: "km²",
            factor: 1e-6,
        },
        {
            label: "Square meters ↔ Square feet",
            from: "m²",
            to: "ft²",
            factor: 10.7639,
        },
        { label: "Square miles ↔ Acres", from: "mi²", to: "ac", factor: 640 },
    ],
};

export default function UnitConverter({ unitType }) {
    const { showTimedToast } = useToast();
    const [value, setValue] = useState("");
    const [reverse, setReverse] = useState(false);
    const options = useMemo(
        () => conversionOptions[unitType] || [],
        [unitType]
    );
    const [selected, setSelected] = useState(options[0] || {});

    useEffect(() => {
        if (options.length > 0) {
            setSelected(options[0]);
        }
    }, [options]);

    const handleCopy = () => {
        if (!converted) return;
        navigator.clipboard
            .writeText(converted)
            .then(() => showTimedToast("Converted value copied!", "success"))
            .catch(() => showTimedToast("Failed to copy!", "error"));
    };

    const converted = useMemo(() => {
        if (!selected || value === "") return "";
        const v = parseFloat(value);
        if (isNaN(v)) return "Invalid input";

        let from = reverse ? selected.to : selected.from;
        let to = reverse ? selected.from : selected.to;

        if (unitType === "temperature") {
            if (from === "C" && to === "F") return (v * 9) / 5 + 32;
            if (from === "F" && to === "C") return ((v - 32) * 5) / 9;
            if (from === "C" && to === "K") return v + 273.15;
            if (from === "K" && to === "C") return v - 273.15;
            if (from === "F" && to === "K") return ((v - 32) * 5) / 9 + 273.15;
            if (from === "K" && to === "F") return ((v - 273.15) * 9) / 5 + 32;
            return v;
        }

        return (v * (reverse ? 1 / selected.factor : selected.factor)).toFixed(
            4
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, selected, reverse]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">
                    Conversion
                </InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
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
                    disabled={converted === "" || converted === "Invalid input"}
                >
                    Copy
                </Button>
                <Button variant="outlined" onClick={() => setValue("")}>
                    Clear
                </Button>
            </Stack>

            <ToolCard
                sx={{
                    width: "100%",
                    minHeight: "300px",
                }}
            >
                <Typography variant="h5" sx={{ margin: "15px" }}>
                    {converted !== ""
                        ? `${converted} ${
                              reverse ? selected.from : selected.to
                          }`
                        : ""}
                </Typography>
            </ToolCard>
        </Box>
    );
}
