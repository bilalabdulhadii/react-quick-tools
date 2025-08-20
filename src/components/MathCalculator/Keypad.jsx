import { Box, Grid } from "@mui/material";
import KeypadButton from "./KeypadButton";
import BackspaceIcon from "@mui/icons-material/Backspace";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useToast } from "../../contexts/ToastContext";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import { useState } from "react";
import HistoryModal from "./HistoryModal";

export default function Keypad({
    result,
    onClick,
    handleEvaluate,
    clear,
    handleBackspace,
}) {
    const { showTimedToast } = useToast();
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const handleCopy = () => {
        if (!result) return;

        navigator.clipboard
            .writeText(result)
            .then(() => {
                showTimedToast("Result copied to clipboard!", "success");
            })
            .catch(() => {
                showTimedToast("Failed to copy!", "error");
            });
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Grid container spacing={2}>
                <Grid size={3}>
                    <KeypadButton text={"AC"} onClick={() => clear()} />
                </Grid>
                <Grid size={3}>
                    <KeypadButton
                        text={<BackspaceIcon fontSize="small" />}
                        onClick={() => handleBackspace()}
                    />
                </Grid>

                <Grid size={3}>
                    <KeypadButton
                        text={<ContentCopyIcon fontSize="medium" />}
                        onClick={() => handleCopy()}
                    />
                </Grid>
                <Grid size={3}>
                    <KeypadButton
                        text={<HistoryToggleOffIcon fontSize="medium" />}
                        onClick={() => handleOpen()}
                    />
                </Grid>
                <Grid size={3}>
                    <KeypadButton text={"("} onClick={() => onClick("(")} />
                </Grid>
                <Grid size={3}>
                    <KeypadButton text={")"} onClick={() => onClick(")")} />
                </Grid>
                <Grid size={3}>
                    <KeypadButton text={"%"} onClick={() => onClick("%")} />
                </Grid>
                <Grid size={3}>
                    <KeypadButton text={"/"} onClick={() => onClick("/")} />
                </Grid>
                <Grid size={3}>
                    <KeypadButton text={"7"} onClick={() => onClick("7")} />
                </Grid>
                <Grid size={3}>
                    <KeypadButton text={"8"} onClick={() => onClick("8")} />
                </Grid>
                <Grid size={3}>
                    <KeypadButton text={"9"} onClick={() => onClick("9")} />
                </Grid>
                <Grid size={3}>
                    <KeypadButton text={"*"} onClick={() => onClick("*")} />
                </Grid>

                <Grid size={3}>
                    <KeypadButton text={"4"} onClick={() => onClick("4")} />
                </Grid>
                <Grid size={3}>
                    <KeypadButton text={"5"} onClick={() => onClick("5")} />
                </Grid>
                <Grid size={3}>
                    <KeypadButton text={"6"} onClick={() => onClick("6")} />
                </Grid>
                <Grid size={3}>
                    <KeypadButton text={"-"} onClick={() => onClick("-")} />
                </Grid>
                <Grid size={3}>
                    <KeypadButton text={"1"} onClick={() => onClick("1")} />
                </Grid>
                <Grid size={3}>
                    <KeypadButton text={"2"} onClick={() => onClick("2")} />
                </Grid>
                <Grid size={3}>
                    <KeypadButton text={"3"} onClick={() => onClick("3")} />
                </Grid>
                <Grid size={3}>
                    <KeypadButton text={"+"} onClick={() => onClick("+")} />
                </Grid>
                <Grid size={3}>
                    <KeypadButton text={"0"} onClick={() => onClick("0")} />
                </Grid>
                <Grid size={3}>
                    <KeypadButton text={"."} onClick={() => onClick(".")} />
                </Grid>
                <Grid size={6}>
                    <KeypadButton text={"="} onClick={() => handleEvaluate()} />
                </Grid>
            </Grid>

            <HistoryModal openModal={openModal} onClose={handleClose} />
        </Box>
    );
}
