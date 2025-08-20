import { Button } from "@mui/material";

export default function KeypadNumberButton({ text, onClick }) {
    return (
        <Button
            className={"calcBtn"}
            variant="contained"
            sx={{
                width: "100%",
                height: "52px",
                padding: 0,
                minWidth: 0,
            }}
            onClick={onClick}
        >
            <span className="buttonSpan">{text}</span>
        </Button>
    );
}
