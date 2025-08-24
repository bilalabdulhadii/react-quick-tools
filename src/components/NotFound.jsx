import { useNavigate } from "react-router-dom";
import { Button, Container, Box, Typography } from "@mui/material";

export default function NotFound({ setThemeMode }) {
    const navigate = useNavigate();

    return (
        <div className="App">
            <Container maxWidth="md">
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="90vh"
                    textAlign="center"
                    p={2}
                >
                    <Typography variant="h2" color="error" gutterBottom>
                        404
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Oops! Page not found.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={3}>
                        The page you're looking for doesn't exist or was moved.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/")}
                    >
                        Go Home
                    </Button>
                </Box>
            </Container>
        </div>
    );
}
