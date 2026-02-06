import { useMemo, useState } from "react";
import {
    Box,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox,
    Stack,
} from "@mui/material";
import ToolCard from "../ToolCard";

export default function TextCounter() {
    const [text, setText] = useState("");
    const [excludeSpaces, setExcludeSpaces] = useState(false);

    const counts = useMemo(() => {
        const value = text || "";
        const countChars = (str) =>
            excludeSpaces ? str.replace(/\s/g, "").length : str.length;

        const countWordsSmart = (str) => {
            const trimmed = str.trim();
            if (!trimmed) return 0;

            try {
                const seg = new Intl.Segmenter(undefined, {
                    granularity: "word",
                });
                let n = 0;
                for (const s of seg.segment(str)) {
                    if (s.isWordLike) n++;
                }
                return n;
            } catch {
                return trimmed.split(/\s+/).filter(Boolean).length;
            }
        };

        const countSpaces = (str) => (str.match(/\s/g) || []).length;

        return {
            words: countWordsSmart(value),
            characters: countChars(value),
            lines: value ? value.split(/\r?\n/).length : 0,
            spaces: countSpaces(value),
        };
    }, [text, excludeSpaces]);

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <TextField
                label="Enter your text"
                multiline
                minRows={12}
                maxRows={12}
                fullWidth
                value={text}
                onChange={(e) => setText(e.target.value)}
                sx={{
                    backgroundColor: "background.paper",
                    borderRadius: "12px",
                }}
            />

            <FormControlLabel
                sx={{ color: "text.primary" }}
                control={
                    <Checkbox
                        checked={excludeSpaces}
                        onChange={(e) => setExcludeSpaces(e.target.checked)}
                    />
                }
                label="Exclude spaces from character count"
            />

            <ToolCard
                sx={{
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        minHeight: "300px",
                        margin: "15px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                        overflowY: "auto",
                    }}
                >
                    <Typography variant="overline" sx={{ opacity: 0.8 }}>
                        Results
                    </Typography>

                    <Box>
                        <Typography variant="h3" sx={{ lineHeight: 1 }}>
                            {counts.characters}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            Characters {excludeSpaces ? "(no spaces)" : ""}
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={5} sx={{ mt: "auto" }}>
                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{ opacity: 0.7 }}
                            >
                                Words
                            </Typography>
                            <Typography variant="h6">{counts.words}</Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{ opacity: 0.7 }}
                            >
                                Characters
                            </Typography>
                            <Typography variant="h6">
                                {counts.characters}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{ opacity: 0.7 }}
                            >
                                Spaces
                            </Typography>
                            <Typography variant="h6">
                                {counts.spaces}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{ opacity: 0.7 }}
                            >
                                Lines
                            </Typography>
                            <Typography variant="h6">{counts.lines}</Typography>
                        </Box>
                    </Stack>
                </Box>
            </ToolCard>
        </Box>
    );
}
