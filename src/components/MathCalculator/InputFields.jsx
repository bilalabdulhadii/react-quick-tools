import { Box, TextField } from "@mui/material";

export default function InputFields({ calc, setCalc }) {
    return (
        <Box
            component="form"
            sx={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-basic"
                label="First Number"
                variant="outlined"
                multiline
                value={calc.first}
                onChange={(e) =>
                    setCalc({
                        ...calc,
                        first: e.target.value,
                    })
                }
                sx={{ width: "50%", height: "100%" }}
            />
            <TextField
                id="outlined-basic"
                label="Second Number"
                variant="outlined"
                multiline
                value={calc.second}
                onChange={(e) =>
                    setCalc({
                        ...calc,
                        second: e.target.value,
                    })
                }
                sx={{ width: "50%", height: "100%" }}
            />
        </Box>
    );
}
