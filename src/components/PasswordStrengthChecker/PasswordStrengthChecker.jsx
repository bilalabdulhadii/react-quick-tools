import React, { useState } from "react";
import {
    Box,
    TextField,
    Typography,
    LinearProgress,
    Stack,
    Button,
    IconButton,
    InputAdornment,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useToast } from "../../contexts/ToastContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function PasswordStrengthChecker() {
    const { showTimedToast } = useToast();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Password strength evaluation
    const evaluatePassword = (pwd) => {
        let score = 0;
        const criteria = {
            length: pwd.length >= 8,
            lowercase: /[a-z]/.test(pwd),
            uppercase: /[A-Z]/.test(pwd),
            number: /[0-9]/.test(pwd),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
        };

        score = Object.values(criteria).filter(Boolean).length; // 0-5
        return { score, criteria };
    };

    const { score, criteria } = evaluatePassword(password);

    const getStrengthLabel = () => {
        switch (score) {
            case 0:
            case 1:
                return "Very Weak";
            case 2:
                return "Weak";
            case 3:
                return "Medium";
            case 4:
                return "Strong";
            case 5:
                return "Very Strong";
            default:
                return "";
        }
    };

    const getStrengthColor = () => {
        switch (score) {
            case 0:
            case 1:
                return "error";
            case 2:
                return "warning";
            case 3:
                return "info";
            case 4:
                return "primary";
            case 5:
                return "success";
            default:
                return "primary";
        }
    };

    const handleCopy = () => {
        if (!password) return;
        navigator.clipboard
            .writeText(password)
            .then(() => showTimedToast("Password copied!", "success"))
            .catch(() => showTimedToast("Failed to copy!", "error"));
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
                label="Enter Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                autoComplete={false}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword((prev) => !prev)}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOffIcon />
                                ) : (
                                    <VisibilityIcon />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    endIcon={<ContentCopyIcon />}
                    onClick={handleCopy}
                    disabled={!password}
                >
                    Copy
                </Button>
            </Stack>

            {password && (
                <>
                    {/* Strength Bar */}
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" gutterBottom>
                            Strength: {getStrengthLabel()}
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={(score / 5) * 100}
                            color={getStrengthColor()}
                            sx={{ height: 10, borderRadius: 5 }}
                        />
                    </Box>

                    {/* Criteria Checklist */}
                    <Stack spacing={1} sx={{ mt: 2 }}>
                        <Typography
                            color={
                                criteria.length ? "success.main" : "error.main"
                            }
                        >
                            • Minimum 8 characters
                        </Typography>
                        <Typography
                            color={
                                criteria.lowercase
                                    ? "success.main"
                                    : "error.main"
                            }
                        >
                            • Lowercase letter
                        </Typography>
                        <Typography
                            color={
                                criteria.uppercase
                                    ? "success.main"
                                    : "error.main"
                            }
                        >
                            • Uppercase letter
                        </Typography>
                        <Typography
                            color={
                                criteria.number ? "success.main" : "error.main"
                            }
                        >
                            • Number
                        </Typography>
                        <Typography
                            color={
                                criteria.special ? "success.main" : "error.main"
                            }
                        >
                            • Special character (!@#$%^&*)
                        </Typography>
                    </Stack>
                </>
            )}
        </Box>
    );
}
