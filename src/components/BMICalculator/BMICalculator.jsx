import { useState, useMemo } from "react";
import {
    Box,
    TextField,
    Typography,
    Button,
    Stack,
    FormControlLabel,
    Switch,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useToast } from "../../contexts/ToastContext";
import ToolCard from "../ToolCard";

export default function BMICalculator() {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [isMetric, setIsMetric] = useState(true);
    const { showTimedToast } = useToast();

    const bmi = useMemo(() => {
        const w = parseFloat(weight);
        const h = parseFloat(height);

        if (!w || !h) return null;

        let heightMeters = h;
        let weightKg = w;

        if (!isMetric) {
            // Imperial: height in inches, weight in pounds
            heightMeters = h * 0.0254;
            weightKg = w * 0.453592;
        } else {
            // Metric in cm -> convert to meters
            heightMeters = h / 100;
            weightKg = w;
        }

        const bmiValue = weightKg / (heightMeters * heightMeters);
        return parseFloat(bmiValue.toFixed(1));
    }, [weight, height, isMetric]);

    const category = useMemo(() => {
        if (bmi === null) return "";
        if (bmi < 18.5) return "Underweight";
        if (bmi < 25) return "Normal weight";
        if (bmi < 30) return "Overweight";
        if (bmi < 35) return "Obesity Class I";
        if (bmi < 40) return "Obesity Class II";
        return "Obesity Class III";
    }, [bmi]);

    const handleCopy = () => {
        if (!bmi) return;
        navigator.clipboard
            .writeText(`${bmi} (${category})`)
            .then(() => showTimedToast("BMI copied!", "success"))
            .catch(() => showTimedToast("Failed to copy!", "error"));
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControlLabel
                control={
                    <Switch
                        checked={isMetric}
                        onChange={(e) => setIsMetric(e.target.checked)}
                    />
                }
                sx={{ color: "text.primary" }}
                label={isMetric ? "Metric (kg / cm)" : "Imperial (lbs / in)"}
            />

            <TextField
                label={`Weight (${isMetric ? "kg" : "lbs"})`}
                variant="outlined"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                fullWidth
                sx={{
                    backgroundColor: (theme) => theme.palette.background.paper,
                    borderRadius: "12px",
                }}
            />

            <TextField
                label={`Height (${isMetric ? "cm" : "in"})`}
                variant="outlined"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                fullWidth
                sx={{
                    backgroundColor: (theme) => theme.palette.background.paper,
                    borderRadius: "12px",
                }}
            />

            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    endIcon={<ContentCopyIcon />}
                    onClick={handleCopy}
                    disabled={!bmi}
                >
                    Copy
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        setWeight("");
                        setHeight("");
                    }}
                >
                    Clear
                </Button>
            </Stack>

            <ToolCard
                sx={{ width: "100%", minHeight: "300px", overflowY: "auto" }}
            >
                <Box sx={{ margin: "15px" }}>
                    {bmi ? (
                        <>
                            <Typography variant="h3">{bmi}</Typography>
                            <Typography variant="h6" sx={{ opacity: 0.7 }}>
                                {category}
                            </Typography>
                        </>
                    ) : (
                        <Typography variant="body1" sx={{ opacity: 0.7 }}>
                            Enter your weight and height to calculate BMI.
                        </Typography>
                    )}
                </Box>
            </ToolCard>
        </Box>
    );
}
