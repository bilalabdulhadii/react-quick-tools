import { useEffect, useMemo, useRef, useState } from "react";
import {
    Box,
    Button,
    FormControlLabel,
    Paper,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import bwipjs from "bwip-js";
import { useToast } from "../../contexts/ToastContext";

const BARCODE_CONFIG = {
    code128: {
        label: "Code 128",
        helper: "General-purpose barcode for products, shipping, and inventory. Input: most ASCII characters.",
        sample: "CODE128",
    },
    code39: {
        label: "Code 39",
        helper: "Simple industrial barcode using letters, numbers, and a few symbols. Input: A–Z, 0–9, - . space $ / + %.",
        sample: "CODE39",
    },
    code93: {
        label: "Code 93",
        helper: "Compact, high-density barcode for labels and internal tracking. Input: A–Z, 0–9, - . space $ / + %.",
        sample: "CODE93",
    },
    ean13: {
        label: "EAN-13",
        helper: "Retail barcode used worldwide for products (12 digits + checksum). Input: 12 digits.",
        sample: "590123412345",
    },
    ean8: {
        label: "EAN-8",
        helper: "Short retail barcode for small packages (7 digits + checksum). Input: 7 digits.",
        sample: "9638507",
    },
    upca: {
        label: "UPC-A",
        helper: "Retail barcode used mainly in North America (11 digits + checksum). Input: 11 digits.",
        sample: "03600029145",
    },
    upce: {
        label: "UPC-E",
        helper: "Compressed UPC for small packages; digits are expanded to UPC-A. Input: 7 or 8 digits.",
        sample: "01234565",
    },
    itf: {
        label: "ITF (Interleaved 2 of 5)",
        helper: "Digits-only barcode common in cartons and warehousing. Input: even number of digits.",
        sample: "12345670",
        bcid: "interleaved2of5",
    },
    itf14: {
        label: "ITF-14",
        helper: "Used for logistics and shipping case labels (GTIN-14). Input: 13 or 14 digits.",
        sample: "1234567890123",
    },
    codabar: {
        label: "Codabar",
        helper: "Legacy barcode still seen in libraries, blood banks, and logistics. Input: digits and - $ : / . + with A–D guards.",
        sample: "A123456A",
        bcid: "rationalizedCodabar",
    },
    msi: {
        label: "MSI",
        helper: "Digits-only barcode for inventory and warehouse systems. Input: digits only.",
        sample: "1234567",
    },
    pharmacode: {
        label: "Pharmacode",
        helper: "Pharmaceutical packaging control code for validation. Input: number 3–131070.",
        sample: "12345",
    },
};

const normalizeHex = (value = "") => {
    const trimmed = value.trim();
    if (!trimmed) return "";
    const withHash = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
    return withHash.toLowerCase();
};

const isValidHex = (value = "") =>
    /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);

const toSafeNumber = (value, fallback) => {
    const num = Number(value);
    if (Number.isNaN(num)) return fallback;
    return num;
};

export default function BarcodeGenerator({ format = "code128", title }) {
    const { showTimedToast } = useToast();
    const canvasRef = useRef(null);
    const [value, setValue] = useState(
        BARCODE_CONFIG[format]?.sample || ""
    );
    const [scale, setScale] = useState(3);
    const [height, setHeight] = useState(10);
    const [includeText, setIncludeText] = useState(true);
    const [barColor, setBarColor] = useState("#000000");
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [transparentBg, setTransparentBg] = useState(false);
    const [barInput, setBarInput] = useState("#000000");
    const [backgroundInput, setBackgroundInput] = useState("#ffffff");
    const [error, setError] = useState("");
    const supportsSvg = typeof bwipjs.toSVG === "function";

    const config = useMemo(
        () => BARCODE_CONFIG[format] || { label: format, helper: "" },
        [format]
    );
    const barcodeId = config.bcid || format;

    useEffect(() => {
        setValue(BARCODE_CONFIG[format]?.sample || "");
        setError("");
    }, [format]);

    useEffect(() => {
        if (!value) {
            setError("Enter a value to generate a barcode.");
            return;
        }

        try {
            if (!canvasRef.current) return;

            const options = {
                bcid: barcodeId,
                text: value,
                scale: toSafeNumber(scale, 3),
                height: toSafeNumber(height, 10),
                includetext: includeText,
                textxalign: "center",
            };

            const barColorValue = barColor.replace("#", "");
            const backgroundValue = backgroundColor.replace("#", "");
            if (!transparentBg) {
                options.backgroundcolor = backgroundValue;
            }
            options.barcolor = barColorValue;
            options.textcolor = barColorValue;

            bwipjs.toCanvas(canvasRef.current, options);
            setError("");
        } catch (err) {
            setError(err?.message || "Unable to generate barcode.");
        }
    }, [
        format,
        value,
        scale,
        height,
        includeText,
        barColor,
        backgroundColor,
        transparentBg,
        barcodeId,
    ]);

    const handleColorInput = (setter, colorSetter) => (event) => {
        const next = normalizeHex(event.target.value);
        setter(next);
        if (isValidHex(next)) {
            colorSetter(next);
        }
    };

    const handleColorBlur = (inputValue, setter, colorValue) => () => {
        if (!isValidHex(inputValue)) {
            setter(colorValue);
        }
    };

    const handleColorPick = (setter, inputSetter) => (event) => {
        const next = event.target.value;
        setter(next);
        inputSetter(next);
    };

    const downloadPng = () => {
        if (!canvasRef.current || error) {
            showTimedToast(
                "Fix the barcode input before downloading.",
                "error"
            );
            return;
        }
        const url = canvasRef.current.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = `${format}-barcode.png`;
        link.click();
    };

    const downloadSvg = () => {
        if (!supportsSvg || error) {
            showTimedToast(
                "SVG export is not available in this build.",
                "error"
            );
            return;
        }
        try {
            const options = {
                bcid: barcodeId,
                text: value,
                scale: toSafeNumber(scale, 3),
                height: toSafeNumber(height, 10),
                includetext: includeText,
                textxalign: "center",
                barcolor: barColor.replace("#", ""),
                textcolor: barColor.replace("#", ""),
            };
            if (!transparentBg) {
                options.backgroundcolor = backgroundColor.replace("#", "");
            }
            const svg = bwipjs.toSVG(options);
            const blob = new Blob([svg], { type: "image/svg+xml" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${format}-barcode.svg`;
            link.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            showTimedToast(
                err?.message || "Unable to export SVG for this barcode.",
                "error"
            );
        }
    };

    return (
        <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
            <Paper
                variant="outlined"
                sx={{
                    flex: 1,
                    p: 3,
                    borderRadius: 3,
                    background: "var(--app-card)",
                    borderColor: "var(--app-border)",
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {title || config.label}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {config.helper}
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        label="Barcode value"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        fullWidth
                    />
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <TextField
                            label="Scale"
                            type="number"
                            inputProps={{ min: 1, max: 10 }}
                            value={scale}
                            onChange={(event) =>
                                setScale(event.target.value)
                            }
                            fullWidth
                        />
                        <TextField
                            label="Height"
                            type="number"
                            inputProps={{ min: 5, max: 30 }}
                            value={height}
                            onChange={(event) =>
                                setHeight(event.target.value)
                            }
                            fullWidth
                        />
                    </Stack>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={includeText}
                                onChange={(event) =>
                                    setIncludeText(event.target.checked)
                                }
                            />
                        }
                        label="Show readable text"
                    />
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "start",
                                gap: 1,
                                flex: 1,
                            }}
                        >
                            <TextField
                                type="color"
                                value={barColor}
                                onChange={handleColorPick(
                                    setBarColor,
                                    setBarInput
                                )}
                                sx={{ width: 72, "& input": { cursor: "pointer" } }}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Bar color"
                                value={barInput}
                                onChange={handleColorInput(
                                    setBarInput,
                                    setBarColor
                                )}
                                onBlur={handleColorBlur(
                                    barInput,
                                    setBarInput,
                                    barColor
                                )}
                                error={
                                    Boolean(barInput) && !isValidHex(barInput)
                                }
                                helperText="Hex like #111111"
                                fullWidth
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "start",
                                gap: 1,
                                flex: 1,
                            }}
                        >
                            <TextField
                                type="color"
                                value={backgroundColor}
                                onChange={handleColorPick(
                                    setBackgroundColor,
                                    setBackgroundInput
                                )}
                                sx={{ width: 72, "& input": { cursor: "pointer" } }}
                                InputLabelProps={{ shrink: true }}
                                disabled={transparentBg}
                            />
                            <TextField
                                label="Background"
                                value={backgroundInput}
                                onChange={handleColorInput(
                                    setBackgroundInput,
                                    setBackgroundColor
                                )}
                                onBlur={handleColorBlur(
                                    backgroundInput,
                                    setBackgroundInput,
                                    backgroundColor
                                )}
                                error={
                                    Boolean(backgroundInput) &&
                                    !isValidHex(backgroundInput)
                                }
                                helperText="Hex like #ffffff"
                                fullWidth
                                disabled={transparentBg}
                            />
                        </Box>
                    </Stack>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={transparentBg}
                                onChange={(event) =>
                                    setTransparentBg(event.target.checked)
                                }
                            />
                        }
                        label="Transparent background"
                    />
                </Stack>
            </Paper>

            <Paper
                variant="outlined"
                sx={{
                    width: { xs: "100%", lg: 360 },
                    p: 3,
                    borderRadius: 3,
                    background: "var(--app-card)",
                    borderColor: "var(--app-border)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <Typography variant="subtitle2" color="text.secondary">
                    Preview
                </Typography>
                <Box
                    sx={{
                        width: "100%",
                        minHeight: 160,
                        background: transparentBg
                            ? "linear-gradient(45deg, rgba(0,0,0,0.08) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.08) 75%, rgba(0,0,0,0.08)), linear-gradient(45deg, rgba(0,0,0,0.08) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.08) 75%, rgba(0,0,0,0.08))"
                            : backgroundColor,
                        backgroundSize: transparentBg
                            ? "16px 16px, 16px 16px"
                            : "auto",
                        backgroundPosition: transparentBg
                            ? "0 0, 8px 8px"
                            : "0 0",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 2,
                        boxShadow: "var(--app-shadow)",
                        position: "relative",
                    }}
                >
                    <canvas ref={canvasRef} />
                    {error && (
                        <Box
                            sx={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 2,
                                background: "rgba(255, 255, 255, 0.9)",
                                borderRadius: "16px",
                            }}
                        >
                            <Typography variant="body2" color="error">
                                {error}
                            </Typography>
                        </Box>
                    )}
                </Box>
                <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={downloadPng}
                    >
                        Download PNG
                    </Button>
                    {supportsSvg && (
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={downloadSvg}
                        >
                            SVG
                        </Button>
                    )}
                </Stack>
            </Paper>
        </Stack>
    );
}
