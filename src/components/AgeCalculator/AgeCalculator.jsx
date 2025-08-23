import { Box, Grid, Select, Button, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import AgeCard from "./AgeCard";
import { useToast } from "../../contexts/ToastContext";

export default function AgeCalculator() {
    const { showTimedToast } = useToast();
    const [birth, setBirth] = useState({
        day: "",
        month: "",
        year: "",
    });
    const [age, setAge] = useState({
        age: "",
        day: "",
        month: "",
        year: "",
        week: "",
        hour: "",
        minute: "",
        nextBirthdayMonth: "",
        nextBirthdayDay: "",
    });

    const months = [
        { name: "January", value: 1 },
        { name: "February", value: 2 },
        { name: "March", value: 3 },
        { name: "April", value: 4 },
        { name: "May", value: 5 },
        { name: "June", value: 6 },
        { name: "July", value: 7 },
        { name: "August", value: 8 },
        { name: "September", value: 9 },
        { name: "October", value: 10 },
        { name: "November", value: 11 },
        { name: "December", value: 12 },
    ];
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: currentYear - 1900 + 1 },
        (_, i) => currentYear - i
    );

    function calculateAge() {
        const now = new Date();
        const birthDate = new Date(birth.year, birth.month - 1, birth.day);

        if (birthDate > now) {
            setAge({
                age: "",
                day: "",
                month: "",
                year: "",
                week: "",
                hour: "",
                minute: "",
                nextBirthdayMonth: "",
                nextBirthdayDay: "",
            });
            showTimedToast(
                "The selected birthdate is in the future. Please choose a valid past date.",
                "error"
            );
            return;
        }

        const diffMs = now - birthDate;

        const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
        const totalMinutes = Math.floor(diffMs / (1000 * 60));

        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        const totalMonths = years * 12 + months;

        const formattedAge = `${years} year${
            years !== 1 ? "s" : ""
        } - ${months} month${months !== 1 ? "s" : ""} - ${days} day${
            days !== 1 ? "s" : ""
        }`;

        let nextBirthday = new Date(
            now.getFullYear(),
            birth.month - 1,
            birth.day
        );
        if (now >= nextBirthday) {
            nextBirthday.setFullYear(now.getFullYear() + 1);
        }

        const nextDiff = nextBirthday - now;
        const nextDaysTotal = Math.floor(nextDiff / (1000 * 60 * 60 * 24));
        const estMonths = Math.floor(nextDaysTotal / 30.44);
        const estDays = Math.round(nextDaysTotal - estMonths * 30.44);

        setAge({
            age: formattedAge,
            year: years,
            month: totalMonths,
            day: totalDays,
            week: totalWeeks,
            hour: totalHours,
            minute: totalMinutes,
            nextBirthdayMonth: estMonths,
            nextBirthdayDay: estDays,
        });
    }

    return (
        <Box>
            <Typography variant="h5" color="text.primary" gutterBottom>
                Date of Birth
            </Typography>
            <Grid container spacing={2}>
                <Grid
                    size={{
                        xs: 12,
                        sm: 4,
                        md: 4,
                        lg: 4,
                    }}
                >
                    <FormControl fullWidth>
                        <InputLabel id="day-label">Day</InputLabel>
                        <Select
                            labelId="day-label"
                            value={birth.day}
                            label="Day"
                            onChange={(e) =>
                                setBirth({ ...birth, day: e.target.value })
                            }
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.background.paper,
                            }}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 300,
                                    },
                                },
                            }}
                        >
                            {days.map((day) => (
                                <MenuItem key={day} value={day}>
                                    {day}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    size={{
                        xs: 12,
                        sm: 4,
                        md: 4,
                        lg: 4,
                    }}
                >
                    <FormControl fullWidth>
                        <InputLabel id="day-label">Month</InputLabel>
                        <Select
                            labelId="day-label"
                            value={birth.month}
                            label="Month"
                            onChange={(e) =>
                                setBirth({ ...birth, month: e.target.value })
                            }
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.background.paper,
                            }}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 300,
                                    },
                                },
                            }}
                        >
                            {months.map((month) => (
                                <MenuItem key={month.value} value={month.value}>
                                    {month.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    size={{
                        xs: 12,
                        sm: 4,
                        md: 4,
                        lg: 4,
                    }}
                >
                    <FormControl fullWidth>
                        <InputLabel id="day-label">Year</InputLabel>
                        <Select
                            labelId="day-label"
                            value={birth.year}
                            label="Year"
                            onChange={(e) =>
                                setBirth({ ...birth, year: e.target.value })
                            }
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.background.paper,
                            }}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 300,
                                    },
                                },
                            }}
                        >
                            {years.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Button
                variant="contained"
                disabled={!birth.year || !birth.month || !birth.day}
                onClick={calculateAge}
                sx={{ marginTop: "30px" }}
            >
                Calculate
            </Button>
            <Box
                sx={{
                    width: "100%",
                    marginTop: "30px",
                }}
            >
                <AgeCard age={age} />
            </Box>
        </Box>
    );
}
