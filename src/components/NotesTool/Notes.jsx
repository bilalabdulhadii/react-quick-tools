import { useState, useEffect } from "react";
import {
    IconButton,
    Box,
    Drawer,
    TextField,
    Button,
    Typography,
    Stack,
    useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

export default function NotesApp() {
    const [notes, setNotes] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isNewNote, setIsNewNote] = useState(false);
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";
    useEffect(() => {
        try {
            const savedNotes = JSON.parse(
                localStorage.getItem("quick_tools_notes")
            );
            if (savedNotes && Array.isArray(savedNotes)) {
                setNotes(savedNotes);
            }
        } catch (err) {
            console.error("Error loading notes:", err);
        }
    }, []);

    useEffect(() => {
        if (notes.length > 0) {
            localStorage.setItem("quick_tools_notes", JSON.stringify(notes));
        } else {
            localStorage.removeItem("quick_tools_notes");
        }
    }, [notes]);

    const handleDelete = (index) => {
        const updatedNotes = notes.filter((_, i) => i !== index);
        setNotes(updatedNotes);
        if (selectedIndex === index) handleCloseDrawer();
    };

    const handleOpenDrawer = (index = null) => {
        if (index === null) {
            setSelectedIndex(notes.length);
            setNotes([...notes, { title: "", note: "" }]);
            setIsNewNote(true);
        } else {
            setSelectedIndex(index);
            setIsNewNote(false);
        }
        setOpenDrawer(true);
    };

    const handleCloseDrawer = () => {
        if (
            isNewNote &&
            notes[selectedIndex].note.trim() === "" &&
            notes[selectedIndex].title.trim() === ""
        ) {
            const updatedNotes = [...notes];
            updatedNotes.pop();
            setNotes(updatedNotes);
        } else {
            const updatedNotes = [...notes];
            const currentNote = updatedNotes[selectedIndex];
            if (!currentNote.title.trim() && currentNote.note.trim()) {
                currentNote.title = currentNote.note
                    .split(" ")
                    .slice(0, 3)
                    .join(" ");
                setNotes(updatedNotes);
            }
        }
        setOpenDrawer(false);
        setSelectedIndex(null);
        setIsNewNote(false);
    };

    const handleDrawerChange = (field, value) => {
        if (selectedIndex === null) return;
        const updatedNotes = [...notes];
        updatedNotes[selectedIndex][field] = value;
        setNotes(updatedNotes);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                minHeight: "75vh",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                }}
            >
                <Typography color="text.primary" variant="h4">
                    Your Notes
                </Typography>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpenDrawer(null)}
                    endIcon={<AddRoundedIcon />}
                >
                    New Note
                </Button>
            </Box>

            {/* Notes list */}
            {notes.length > 0 ? (
                <Stack spacing={2}>
                    {notes.map((n, index) => (
                        <Box
                            key={index}
                            onClick={() => handleOpenDrawer(index)}
                            sx={{
                                bgcolor: "background.paper",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "10px",
                                borderRadius: "12px",
                                cursor: "pointer",
                                transition: "0.3s ease",
                                "&:hover": {
                                    bgcolor: isDarkMode
                                        ? "rgba(255,255,255,0.1)"
                                        : "rgba(0,0,0,0.1)",
                                },
                            }}
                        >
                            <Typography color="text.primary">
                                {n.title.trim()
                                    ? n.title
                                    : n.note.split(" ").slice(0, 3).join(" ")}
                            </Typography>
                            <IconButton>
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Stack>
            ) : (
                <Typography
                    color="text.secondary"
                    sx={{
                        textAlign: "center",
                        padding: 4,
                        fontStyle: "italic",
                    }}
                >
                    No notes yet. Click "New Note" to add your first note!
                </Typography>
            )}

            {/* Drawer */}
            <Drawer
                anchor="right"
                open={openDrawer}
                onClose={handleCloseDrawer}
            >
                <Box
                    sx={{
                        width: "100vw",
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        padding: "25px",
                        boxSizing: "border-box",
                    }}
                >
                    {selectedIndex !== null && (
                        <>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "10px",
                                    bgcolor: "background.default",
                                    borderRadius: "12px",
                                }}
                            >
                                <IconButton onClick={handleCloseDrawer}>
                                    <KeyboardBackspaceIcon />
                                </IconButton>
                                <Typography
                                    color="text.primary"
                                    sx={{
                                        margin: "0 10px",
                                        flexGrow: "1",
                                        userSelect: "none",
                                    }}
                                >
                                    {isNewNote && !notes[selectedIndex].title
                                        ? "New Note"
                                        : notes[selectedIndex].title}
                                </Typography>

                                <IconButton
                                    onClick={() => {
                                        handleCloseDrawer();
                                        handleDelete(selectedIndex);
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                            <Box
                                sx={{
                                    padding: "20px",
                                    flexGrow: "1",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        gap: "10px",
                                        mb: 1,
                                    }}
                                >
                                    <TextField
                                        variant="standard"
                                        placeholder="title..."
                                        value={notes[selectedIndex].title}
                                        onChange={(e) =>
                                            handleDrawerChange(
                                                "title",
                                                e.target.value.slice(0, 30)
                                            )
                                        }
                                        InputProps={{
                                            maxLength: 50,
                                            disableUnderline: true,
                                            sx: {
                                                fontSize: "1.3rem",
                                                fontWeight: "bold",
                                            },
                                        }}
                                        sx={{ flexGrow: "1" }}
                                    />
                                    <Typography
                                        variant="caption"
                                        color="textSecondary"
                                    >
                                        {notes[selectedIndex].title.length} / 30
                                    </Typography>
                                </Box>

                                {/* <TextField
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    placeholder="content..."
                                    value={notes[selectedIndex].note}
                                    onChange={(e) =>
                                        handleDrawerChange(
                                            "note",
                                            e.target.value
                                        )
                                    }
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: { fontSize: "1rem" },
                                    }}
                                    sx={{ flexGrow: 1, height: "100%" }}
                                /> */}
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        position: "relative",
                                        display: "flex",
                                        flexDirection: "column",
                                        backgroundImage: `linear-gradient(to bottom, ${
                                            isDarkMode
                                                ? "rgba(255,255,255,0.1)"
                                                : "rgba(0,0,0,0.1)"
                                        }  1px, transparent 1px)`,
                                        backgroundSize: `100% 24px`,
                                        boxSizing: "border-box",
                                        overflow: "hidden",
                                    }}
                                >
                                    <TextField
                                        variant="standard"
                                        placeholder="content..."
                                        value={notes[selectedIndex].note}
                                        onChange={(e) =>
                                            handleDrawerChange(
                                                "note",
                                                e.target.value
                                            )
                                        }
                                        multiline
                                        fullWidth
                                        sx={{
                                            flexGrow: 1,
                                            background: "transparent",
                                            "& .MuiInputBase-input": {
                                                height: "100%",
                                                padding: 0,
                                                margin: 0,
                                                lineHeight: "24px",
                                                fontSize: "1rem",
                                                whiteSpace: "pre-wrap",
                                                overflow: "auto",
                                            },
                                        }}
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                    />
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>
            </Drawer>
        </Box>
    );
}
