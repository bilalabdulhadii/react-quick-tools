import { useState } from "react";
import {
    Box,
    TextField,
    Typography,
    InputAdornment,
    Grid,
    Paper,
    Stack,
    Button,
    IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useToast } from "../../contexts/ToastContext";

export default function ColorConverter({ type }) {
    const { showTimedToast } = useToast();
    const [hex, setHex] = useState("FFFFFF");
    const [rgb, setRgb] = useState({ r: "255", g: "255", b: "255" });
    const [hsl, setHsl] = useState({ h: "180", s: "0", l: "100" });

    // Helper functions
    const hexToRgb = (hex) => {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return { r, g, b };
    };

    const rgbToHex = (r, g, b) => {
        const toHex = (n) => n.toString(16).padStart(2, "0").toUpperCase();
        return `${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    const rgbToHsl = ({ r, g, b }) => {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        let h = 0,
            s = 0,
            l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            // eslint-disable-next-line default-case
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100),
        };
    };

    const hslToRgb = ({ h, s, l }) => {
        h = Number(h) / 360;
        s = Number(s) / 100;
        l = Number(l) / 100;
        let r, g, b;

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255),
        };
    };

    // Update all formats when one changes
    const updateFromHex = (val) => {
        setHex(val);
        if (val.length === 6) {
            const newRgb = hexToRgb(val);
            setRgb({ r: newRgb.r, g: newRgb.g, b: newRgb.b });
            setHsl(rgbToHsl(newRgb));
        }
    };

    const updateFromRgb = (newRgb) => {
        setRgb(newRgb);
        const newHex = rgbToHex(
            Number(newRgb.r),
            Number(newRgb.g),
            Number(newRgb.b)
        );
        setHex(newHex);
        setHsl(rgbToHsl(newRgb));
    };

    const updateFromHsl = (newHsl) => {
        setHsl(newHsl);
        const newRgb = hslToRgb({
            h: Number(newHsl.h),
            s: Number(newHsl.s),
            l: Number(newHsl.l),
        });
        setRgb(newRgb);
        setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    };

    const getPreviewColor = () => `#${hex}`;

    const handleCopy = (val) => {
        navigator.clipboard
            .writeText(val)
            .then(() => showTimedToast("Copied!", "success"))
            .catch(() => showTimedToast("Failed!", "error"));
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* HEX Input */}
            {type === "hex" && (
                <TextField
                    label="Hex Code"
                    value={hex}
                    onChange={(e) =>
                        updateFromHex(
                            e.target.value
                                .replace(/[^0-9a-fA-F]/g, "")
                                .slice(0, 6)
                                .toUpperCase()
                        )
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">#</InputAdornment>
                        ),
                    }}
                    fullWidth
                    sx={{
                        backgroundColor: "background.paper",
                        borderRadius: "12px",
                    }}
                />
            )}

            {/* RGB Input */}
            {type === "rgb" && (
                <Grid container spacing={2}>
                    {["r", "g", "b"].map((key) => (
                        <Grid size={4} key={key}>
                            <TextField
                                type="number"
                                label={key.toUpperCase()}
                                value={rgb[key]}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (
                                        val === "" ||
                                        (val >= 0 && val <= 255)
                                    ) {
                                        updateFromRgb({ ...rgb, [key]: val });
                                    }
                                }}
                                inputProps={{ min: 0, max: 255 }}
                                fullWidth
                                sx={{
                                    backgroundColor: "background.paper",
                                    borderRadius: "12px",
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* HSL Inputs */}
            {type === "hsl" && (
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <TextField
                            type="number"
                            label="H"
                            value={hsl.h}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === "" || (val >= 0 && val <= 360)) {
                                    updateFromHsl({ ...hsl, h: val });
                                }
                            }}
                            inputProps={{ min: 0, max: 360 }}
                            fullWidth
                            sx={{
                                backgroundColor: "background.paper",
                                borderRadius: "12px",
                            }}
                        />
                    </Grid>
                    {["s", "l"].map((key) => (
                        <Grid size={4} key={key}>
                            <TextField
                                type="number"
                                label={key.toUpperCase()}
                                value={hsl[key]}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (
                                        val === "" ||
                                        (val >= 0 && val <= 100)
                                    ) {
                                        updateFromHsl({ ...hsl, [key]: val });
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            %
                                        </InputAdornment>
                                    ),
                                }}
                                inputProps={{ min: 0, max: 100 }}
                                fullWidth
                                sx={{
                                    backgroundColor: "background.paper",
                                    borderRadius: "12px",
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            <Stack direction="row" mb={3}>
                <Button
                    variant="outlined"
                    onClick={() => {
                        setHex("");
                        setRgb({ r: "", g: "", b: "" });
                        setHsl({ h: "", s: "", l: "" });
                    }}
                >
                    Clear
                </Button>
            </Stack>

            <Stack direction="column" spacing={2}>
                {/* HEX */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{ minWidth: 100 }}
                        color="text.primary"
                    >{`HEX: #${hex}`}</Typography>
                    <IconButton
                        size="medium"
                        onClick={() => handleCopy(`#${hex}`)}
                    >
                        <ContentCopyIcon />
                    </IconButton>
                </Box>

                {/* RGB */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{ minWidth: 100 }}
                        color="text.primary"
                    >
                        {`RGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                    </Typography>
                    <IconButton
                        size="medium"
                        onClick={() =>
                            handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)
                        }
                    >
                        <ContentCopyIcon />
                    </IconButton>
                </Box>

                {/* HSL */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{ minWidth: 100 }}
                        color="text.primary"
                    >
                        {`HSL: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                    </Typography>
                    <IconButton
                        size="medium"
                        onClick={() =>
                            handleCopy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)
                        }
                    >
                        <ContentCopyIcon />
                    </IconButton>
                </Box>
            </Stack>

            <Paper
                variant="outlined"
                sx={{
                    width: "100%",
                    minHeight: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: getPreviewColor(),
                }}
            />
        </Box>
    );
}
