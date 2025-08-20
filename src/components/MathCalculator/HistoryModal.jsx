import { Box, Typography, Modal, IconButton } from "@mui/material";
import { useToast } from "../../contexts/ToastContext";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

export default function HistoryModal({ openModal, onClose }) {
    const { showTimedToast } = useToast();

    const getHistory = () =>
        JSON.parse(localStorage.getItem("calc-history")) || [];

    const style = {
        position: "absolute",
        minWidth: "400px",
        maxWidth: "50%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        border: "1px solid #ccc",
        boxShadow: 24,
        p: 4,
        borderRadius: "12px",
        overflowWrap: "break-word",
    };

    return (
        <Modal
            open={openModal}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box
                    sx={{
                        fontWeight: "bold",
                        mb: 3,
                        borderBottom: "1px solid #ddd",
                        pb: 2,
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography id="modal-modal-title" variant="h5">
                        Calculation History
                    </Typography>
                    <IconButton
                        onClick={() => {
                            const history =
                                JSON.parse(
                                    localStorage.getItem("calc-history")
                                ) || [];

                            if (history.length > 0) {
                                localStorage.removeItem("calc-history");
                                showTimedToast("History cleared!", "success");
                            } else {
                                showTimedToast("No history to clear", "info");
                            }
                        }}
                    >
                        <DeleteOutlineRoundedIcon />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        maxHeight: "45vh",
                        overflowY: "auto",
                        pr: 1,
                    }}
                >
                    {getHistory().length === 0 ? (
                        <Box
                            sx={{
                                backgroundColor: "#f9f9f9",
                                padding: "10px 12px",
                                borderRadius: "8px",
                                mb: 1,
                                border: "1px solid #ddd",
                                fontSize: "1rem",
                                fontWeight: 500,
                                color: "#333",
                                letterSpacing: "1px",
                                boxShadow: "1px 1px 3px rgba(0,0,0,0.05)",
                            }}
                        >
                            <Typography variant="body1">
                                No history yet.
                            </Typography>
                        </Box>
                    ) : (
                        getHistory()
                            .slice()
                            .reverse()
                            .map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        backgroundColor: "#f9f9f9",
                                        padding: "10px 12px",
                                        borderRadius: "8px",
                                        mb: 1,
                                        border: "1px solid #ddd",
                                        fontSize: "1rem",
                                        fontWeight: 500,
                                        color: "#333",
                                        letterSpacing: "1px",
                                        boxShadow:
                                            "1px 1px 3px rgba(0,0,0,0.05)",
                                    }}
                                >
                                    <Typography variant="body1">
                                        {item}
                                    </Typography>
                                </Box>
                            ))
                    )}
                </Box>
            </Box>
        </Modal>
    );
}
