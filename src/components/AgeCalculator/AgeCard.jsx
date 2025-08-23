import { Box, Grid, Stack, Paper, Typography, IconButton } from "@mui/material";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { useToast } from "../../contexts/ToastContext";

export default function AgeCard({ age }) {
    return (
        <Paper
            variant="outlined"
            sx={{
                width: "100%",
                minHeight: "300px",
            }}
        >
            <Box sx={{ margin: "15px" }}>
                <Typography variant="h5" gutterBottom>
                    🎉 Age Summary
                </Typography>

                {age.age ? (
                    <AgeSummary age={age.age} />
                ) : (
                    <Typography variant="h5" color="primary" gutterBottom>
                        —
                    </Typography>
                )}

                <Grid container spacing={2}>
                    <GridItem label="Years" value={age.year} />
                    <GridItem label="Months" value={age.month} />
                    <GridItem label="Days" value={age.day} />
                    <GridItem label="Weeks" value={age.week} />
                    <GridItem label="Hours" value={age.hour} />
                    <GridItem label="Minutes" value={age.minute} />

                    <Grid size={12}>
                        <InfoBox
                            label="Next Birthday In"
                            value={
                                age.nextBirthdayMonth && age.nextBirthdayDay
                                    ? `${age.nextBirthdayMonth} months ${age.nextBirthdayDay} days`
                                    : "—"
                            }
                        />
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}

const GridItem = ({ label, value }) => (
    <Grid
        size={{
            xs: 6,
            sm: 4,
            md: 2,
            lg: 2,
        }}
    >
        <InfoBox label={label} value={value} />
    </Grid>
);

const AgeSummary = ({ age }) => {
    const { showTimedToast } = useToast();
    const handleCopy = () => {
        navigator.clipboard
            .writeText(age)
            .then(() => {
                showTimedToast("Result copied to clipboard!", "success");
            })
            .catch(() => {
                showTimedToast("Failed to copy!", "error");
            });
    };

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
                variant="h3"
                color="primary"
                sx={{ padding: "20px 0 30px" }}
            >
                {age}
            </Typography>
            <IconButton onClick={handleCopy} size="small">
                <ContentCopyRoundedIcon fontSize="small" />
            </IconButton>
        </Stack>
    );
};

const InfoBox = ({ label, value }) => (
    <Box
        sx={{
            p: 2,
            borderRadius: 2,
            height: "100%",
            textAlign: "center",
        }}
    >
        <Typography variant="subtitle2" color="text.secondary">
            {label}
        </Typography>
        <Typography variant="h6">{value !== "" ? value : "—"}</Typography>
    </Box>
);
