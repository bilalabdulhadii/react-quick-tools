import { useState } from "react";
import {
    Typography,
    Button,
    Box,
    Stack,
    Paper,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

const choices = ["Rock", "Paper", "Scissors"];

function getResult(player, computer) {
    if (player === computer) return "Draw";
    if (
        (player === "Rock" && computer === "Scissors") ||
        (player === "Paper" && computer === "Rock") ||
        (player === "Scissors" && computer === "Paper")
    ) {
        return "You Win 🎉";
    }
    return "You Lose 😢";
}

export default function RockPaperScissors() {
    const [history, setHistory] = useState([]);
    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState(null);

    const playGame = (choice) => {
        const computer = choices[Math.floor(Math.random() * choices.length)];
        const outcome = getResult(choice, computer);

        setPlayerChoice(choice);
        setComputerChoice(computer);
        setResult(outcome);

        setHistory((prev) => [{ player: choice, computer, outcome }, ...prev]);
    };

    const resetGame = () => {
        setHistory([]);
        setPlayerChoice(null);
        setComputerChoice(null);
        setResult(null);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                {choices.map((choice) => (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => playGame(choice)}
                        key={choice}
                    >
                        {choice}
                    </Button>
                ))}
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={resetGame}
                >
                    Reset Game
                </Button>
            </Stack>

            <Paper
                variant="outlined"
                sx={{
                    width: "100%",
                }}
            >
                <Stack
                    direction="column"
                    spacing={0}
                    alignItems="left"
                    sx={{ margin: "15px" }}
                >
                    <Typography variant="h5" mb={3}>
                        Result: {result}
                    </Typography>
                    <Typography>
                        You chose: <b>{playerChoice}</b>
                    </Typography>
                    <Typography>
                        Computer chose: <b>{computerChoice}</b>
                    </Typography>
                </Stack>
            </Paper>

            <Paper
                variant="outlined"
                sx={{
                    width: "100%",
                }}
            >
                <Stack
                    direction="column"
                    spacing={0}
                    alignItems="left"
                    sx={{ margin: "15px" }}
                >
                    <Typography variant="h6">Game History</Typography>
                    <List>
                        {history.map((round, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={`You: ${round.player} | Computer: ${round.computer}`}
                                    secondary={`Result: ${round.outcome}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Stack>
            </Paper>

            {/* {history.length > 0 && (
                
            )} */}
        </Box>
    );
}
