import { useEffect, useMemo, useRef, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import QRCodeStyling from "qr-code-styling";
import { useToast } from "../../contexts/ToastContext";

const escapeValue = (value = "") =>
    value
        .replace(/\\/g, "\\\\")
        .replace(/;/g, "\\;")
        .replace(/,/g, "\\,")
        .replace(/:/g, "\\:");

const escapeVCard = (value = "") =>
    value.replace(/\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");

const normalizeHex = (value = "") => {
    const trimmed = value.trim();
    if (!trimmed) return "";
    const withHash = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
    return withHash.toLowerCase();
};

const isValidHex = (value = "") =>
    /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);

const formatDateTime = (value) => {
    if (!value) return "";
    const compact = value.replace(/[-:]/g, "");
    return compact.length === 13 ? `${compact}00` : compact;
};

const getInitialState = (type) => {
    switch (type) {
        case "wifi":
            return {
                ssid: "",
                password: "",
                security: "WPA",
                hidden: false,
            };
        case "contact":
            return {
                firstName: "",
                lastName: "",
                organization: "",
                title: "",
                phone: "",
                email: "",
                url: "",
                address: "",
                note: "",
            };
        case "email":
            return { to: "", subject: "", body: "" };
        case "sms":
            return { number: "", message: "" };
        case "phone":
            return { number: "" };
        case "location":
            return { latitude: "", longitude: "", label: "" };
        case "event":
            return {
                title: "",
                location: "",
                description: "",
                start: "",
                end: "",
            };
        default:
            return { text: "" };
    }
};

const buildQrData = (type, values) => {
    switch (type) {
        case "wifi": {
            const ssid = escapeValue(values.ssid);
            const security = values.security || "WPA";
            const hiddenPart = values.hidden ? "H:true;" : "";
            const passwordPart =
                security === "nopass"
                    ? ""
                    : `P:${escapeValue(values.password)};`;
            return `WIFI:T:${security};S:${ssid};${passwordPart}${hiddenPart};`;
        }
        case "contact": {
            const lines = ["BEGIN:VCARD", "VERSION:3.0"];
            const first = escapeVCard(values.firstName);
            const last = escapeVCard(values.lastName);
            const fullName = [values.firstName, values.lastName]
                .filter(Boolean)
                .join(" ")
                .trim();

            if (first || last) lines.push(`N:${last};${first};;;`);
            if (fullName) lines.push(`FN:${escapeVCard(fullName)}`);
            if (values.organization)
                lines.push(`ORG:${escapeVCard(values.organization)}`);
            if (values.title) lines.push(`TITLE:${escapeVCard(values.title)}`);
            if (values.phone) lines.push(`TEL:${escapeVCard(values.phone)}`);
            if (values.email) lines.push(`EMAIL:${escapeVCard(values.email)}`);
            if (values.url) lines.push(`URL:${escapeVCard(values.url)}`);
            if (values.address)
                lines.push(`ADR:;;${escapeVCard(values.address)};;;;`);
            if (values.note) lines.push(`NOTE:${escapeVCard(values.note)}`);
            lines.push("END:VCARD");
            return lines.join("\n");
        }
        case "email": {
            const to = values.to || "";
            const params = new URLSearchParams();
            if (values.subject) params.set("subject", values.subject);
            if (values.body) params.set("body", values.body);
            const query = params.toString();
            return `mailto:${to}${query ? `?${query}` : ""}`;
        }
        case "sms": {
            const number = values.number || "";
            const message = values.message || "";
            return `SMSTO:${number}:${message}`;
        }
        case "phone":
            return values.number ? `tel:${values.number}` : "";
        case "location": {
            const lat = values.latitude;
            const lon = values.longitude;
            if (!lat || !lon) return "";
            const label = values.label
                ? `?q=${encodeURIComponent(values.label)}`
                : "";
            return `geo:${lat},${lon}${label}`;
        }
        case "event": {
            const start = formatDateTime(values.start);
            const end = formatDateTime(values.end);
            if (!values.title && !start) return "";
            const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT"];
            if (values.title)
                lines.push(`SUMMARY:${escapeValue(values.title)}`);
            if (start) lines.push(`DTSTART:${start}`);
            if (end) lines.push(`DTEND:${end}`);
            if (values.location)
                lines.push(`LOCATION:${escapeValue(values.location)}`);
            if (values.description)
                lines.push(`DESCRIPTION:${escapeValue(values.description)}`);
            lines.push("END:VEVENT", "END:VCALENDAR");
            return lines.join("\n");
        }
        default:
            return values.text || "";
    }
};

export default function QrGenerator({ type = "text", title }) {
    const { showTimedToast } = useToast();
    const [values, setValues] = useState(() => getInitialState(type));
    const [foregroundColor, setForegroundColor] = useState("#000000");
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [transparentBg, setTransparentBg] = useState(false);
    const [foregroundInput, setForegroundInput] = useState("#000000");
    const [backgroundInput, setBackgroundInput] = useState("#ffffff");
    const qrRef = useRef(null);
    const qrInstance = useRef(null);

    useEffect(() => {
        setValues(getInitialState(type));
    }, [type]);

    const data = useMemo(() => buildQrData(type, values), [type, values]);

    useEffect(() => {
        if (!qrInstance.current) {
            qrInstance.current = new QRCodeStyling({
                width: 220,
                height: 220,
                data: " ",
                dotsOptions: {
                    color: "#000000",
                    type: "rounded",
                },
                cornersSquareOptions: {
                    color: "#000000",
                },
                backgroundOptions: {
                    color: "#ffffff",
                },
            });
        }

        if (qrRef.current) {
            qrRef.current.innerHTML = "";
            qrInstance.current.append(qrRef.current);
        }
    }, []);

    useEffect(() => {
        if (!qrInstance.current) return;
        qrInstance.current.update({
            data: data || " ",
            dotsOptions: {
                color: foregroundColor,
                type: "rounded",
            },
            cornersSquareOptions: {
                color: foregroundColor,
            },
            backgroundOptions: {
                color: transparentBg ? "transparent" : backgroundColor,
            },
        });
    }, [data, foregroundColor, backgroundColor, transparentBg]);

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

    const updateValue = (key) => (event) => {
        setValues((prev) => ({
            ...prev,
            [key]: event.target.value,
        }));
    };

    const handleDownload = (extension) => {
        if (!data) {
            showTimedToast(
                "Enter details to generate a QR code first.",
                "info",
            );
            return;
        }
        qrInstance.current?.download({
            extension,
            name: `${type}-qr`,
        });
    };

    const renderFields = () => {
        switch (type) {
            case "wifi":
                return (
                    <Stack spacing={2}>
                        <TextField
                            label="Network name (SSID)"
                            value={values.ssid}
                            onChange={updateValue("ssid")}
                            fullWidth
                        />
                        <FormControl fullWidth>
                            <InputLabel>Security</InputLabel>
                            <Select
                                label="Security"
                                value={values.security}
                                onChange={updateValue("security")}>
                                <MenuItem value="WPA">WPA/WPA2</MenuItem>
                                <MenuItem value="WEP">WEP</MenuItem>
                                <MenuItem value="nopass">No Password</MenuItem>
                            </Select>
                        </FormControl>
                        {values.security !== "nopass" && (
                            <TextField
                                label="Password"
                                type="password"
                                value={values.password}
                                onChange={updateValue("password")}
                                fullWidth
                            />
                        )}
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={values.hidden}
                                    onChange={(event) =>
                                        setValues((prev) => ({
                                            ...prev,
                                            hidden: event.target.checked,
                                        }))
                                    }
                                />
                            }
                            label="Hidden network"
                        />
                    </Stack>
                );
            case "contact":
                return (
                    <Stack spacing={2}>
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}>
                            <TextField
                                label="First name"
                                value={values.firstName}
                                onChange={updateValue("firstName")}
                                fullWidth
                            />
                            <TextField
                                label="Last name"
                                value={values.lastName}
                                onChange={updateValue("lastName")}
                                fullWidth
                            />
                        </Stack>
                        <TextField
                            label="Organization"
                            value={values.organization}
                            onChange={updateValue("organization")}
                            fullWidth
                        />
                        <TextField
                            label="Job title"
                            value={values.title}
                            onChange={updateValue("title")}
                            fullWidth
                        />
                        <TextField
                            label="Phone"
                            value={values.phone}
                            onChange={updateValue("phone")}
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            value={values.email}
                            onChange={updateValue("email")}
                            fullWidth
                        />
                        <TextField
                            label="Website"
                            value={values.url}
                            onChange={updateValue("url")}
                            fullWidth
                        />
                        <TextField
                            label="Address"
                            value={values.address}
                            onChange={updateValue("address")}
                            fullWidth
                        />
                        <TextField
                            label="Note"
                            value={values.note}
                            onChange={updateValue("note")}
                            fullWidth
                            multiline
                            minRows={2}
                        />
                    </Stack>
                );
            case "email":
                return (
                    <Stack spacing={2}>
                        <TextField
                            label="To"
                            value={values.to}
                            onChange={updateValue("to")}
                            fullWidth
                        />
                        <TextField
                            label="Subject"
                            value={values.subject}
                            onChange={updateValue("subject")}
                            fullWidth
                        />
                        <TextField
                            label="Message"
                            value={values.body}
                            onChange={updateValue("body")}
                            fullWidth
                            multiline
                            minRows={3}
                        />
                    </Stack>
                );
            case "sms":
                return (
                    <Stack spacing={2}>
                        <TextField
                            label="Phone number"
                            value={values.number}
                            onChange={updateValue("number")}
                            fullWidth
                        />
                        <TextField
                            label="Message"
                            value={values.message}
                            onChange={updateValue("message")}
                            fullWidth
                            multiline
                            minRows={3}
                        />
                    </Stack>
                );
            case "phone":
                return (
                    <TextField
                        label="Phone number"
                        value={values.number}
                        onChange={updateValue("number")}
                        fullWidth
                    />
                );
            case "location":
                return (
                    <Stack spacing={2}>
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}>
                            <TextField
                                label="Latitude"
                                value={values.latitude}
                                onChange={updateValue("latitude")}
                                fullWidth
                            />
                            <TextField
                                label="Longitude"
                                value={values.longitude}
                                onChange={updateValue("longitude")}
                                fullWidth
                            />
                        </Stack>
                        <TextField
                            label="Label (optional)"
                            value={values.label}
                            onChange={updateValue("label")}
                            fullWidth
                        />
                    </Stack>
                );
            case "event":
                return (
                    <Stack spacing={2}>
                        <TextField
                            label="Event title"
                            value={values.title}
                            onChange={updateValue("title")}
                            fullWidth
                        />
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}>
                            <TextField
                                label="Start"
                                type="datetime-local"
                                value={values.start}
                                onChange={updateValue("start")}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                            />
                            <TextField
                                label="End"
                                type="datetime-local"
                                value={values.end}
                                onChange={updateValue("end")}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                            />
                        </Stack>
                        <TextField
                            label="Location"
                            value={values.location}
                            onChange={updateValue("location")}
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            value={values.description}
                            onChange={updateValue("description")}
                            fullWidth
                            multiline
                            minRows={3}
                        />
                    </Stack>
                );
            default:
                return (
                    <TextField
                        label="Text or URL"
                        value={values.text}
                        onChange={updateValue("text")}
                        fullWidth
                        multiline
                        minRows={4}
                    />
                );
        }
    };

    const previewBackground = transparentBg
        ? "linear-gradient(45deg, rgba(0,0,0,0.08) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.08) 75%, rgba(0,0,0,0.08)), linear-gradient(45deg, rgba(0,0,0,0.08) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.08) 75%, rgba(0,0,0,0.08))"
        : backgroundColor;

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
                }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {title || "QR Generator"}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}>
                    Fill in the details and download a ready-to-share QR code.
                </Typography>
                {renderFields()}
                <Box sx={{ mt: 3 }}>
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ mb: 1 }}>
                        QR Styling
                    </Typography>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "start",
                                gap: 1,
                                flex: 1,
                            }}>
                            <TextField
                                type="color"
                                value={foregroundColor}
                                onChange={handleColorPick(
                                    setForegroundColor,
                                    setForegroundInput,
                                )}
                                sx={{ width: 72, "& input": { cursor: "pointer" } }}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="QR Color"
                                value={foregroundInput}
                                onChange={handleColorInput(
                                    setForegroundInput,
                                    setForegroundColor,
                                )}
                                onBlur={handleColorBlur(
                                    foregroundInput,
                                    setForegroundInput,
                                    foregroundColor,
                                )}
                                error={
                                    Boolean(foregroundInput) &&
                                    !isValidHex(foregroundInput)
                                }
                                helperText="Hex like #ffee22"
                                fullWidth
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "start",
                                gap: 1,
                                flex: 1,
                            }}>
                            <TextField
                                type="color"
                                value={backgroundColor}
                                onChange={handleColorPick(
                                    setBackgroundColor,
                                    setBackgroundInput,
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
                                    setBackgroundColor,
                                )}
                                onBlur={handleColorBlur(
                                    backgroundInput,
                                    setBackgroundInput,
                                    backgroundColor,
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
                        sx={{ mt: 1 }}
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
                </Box>
            </Paper>

            <Paper
                variant="outlined"
                sx={{
                    width: { xs: "100%", lg: 320 },
                    p: 3,
                    borderRadius: 3,
                    background: "var(--app-card)",
                    borderColor: "var(--app-border)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                }}>
                <Typography variant="subtitle2" color="text.secondary">
                    Preview
                </Typography>
                <Box
                    ref={qrRef}
                    sx={{
                        width: 220,
                        height: 220,
                        borderRadius: "16px",
                        background: previewBackground,
                        backgroundSize: transparentBg
                            ? "16px 16px, 16px 16px"
                            : "auto",
                        backgroundPosition: transparentBg
                            ? "0 0, 8px 8px"
                            : "0 0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "var(--app-shadow)",
                    }}
                />
                <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handleDownload("png")}>
                        Download PNG
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => handleDownload("svg")}>
                        SVG
                    </Button>
                </Stack>
            </Paper>
        </Stack>
    );
}
