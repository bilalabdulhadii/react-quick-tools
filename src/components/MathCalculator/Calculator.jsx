import { Box } from "@mui/material";
import DisplayPanel from "./DisplayPanel";
import Keypad from "./Keypad";
import { useToast } from "../../contexts/ToastContext";
import { useState } from "react";
import { evaluate } from "mathjs";

export default function Home() {
    const { showTimedToast } = useToast();
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [evaluated, setEvaluated] = useState(false);

    const handleEvaluate = () => {
        if (!isBalanced(input)) {
            showTimedToast("Unmatched parentheses", "error");
            return;
        }

        try {
            const result = evaluate(input);
            setResult(result);
            setEvaluated(true);

            const item = `${input} = ${result}`;
            const history =
                JSON.parse(localStorage.getItem("calc-history")) || [];
            history.push(item);
            localStorage.setItem("calc-history", JSON.stringify(history));
        } catch {
            showTimedToast("Invalid expression", "error");
            setEvaluated(true);
        }
    };

    const handleBackspace = () => {
        setInput((prev) => prev.slice(0, -1));
    };

    const handleInput = (value) => {
        const isOperator = ["+", "-", "*", "/", "%"].includes(value);

        if (input === "") {
            if (["+", "*", "/"].includes(value)) {
                setInput("0" + value);
                return;
            }

            if (value === ".") {
                setInput("0.");
                return;
            }

            if (value === "%") {
                return;
            }

            if (value === "^2") {
                return;
            }
        }

        if (value === ")") {
            const open = (input.match(/\(/g) || []).length;
            const close = (input.match(/\)/g) || []).length;
            if (close >= open) {
                return;
            }
        }

        if (evaluated) {
            if (isOperator) {
                setInput(result + value);
            } else {
                setInput(value);
            }
            setResult("");
            setEvaluated(false);
            return;
        }

        const lastChar = input.slice(-1);
        const isLastOp = ["+", "-", "*", "/", "%"].includes(lastChar);

        if (isOperator && isLastOp) {
            setInput((prev) => prev.slice(0, -1) + value);
        } else {
            setInput((prev) => prev + value);
        }
    };
    const handleClear = () => {
        setResult("");
        setInput("");
    };

    const isBalanced = () => {
        let count = 0;
        for (let char of input) {
            if (char === "(") count++;
            if (char === ")") count--;
            if (count < 0) return false;
        }
        return count === 0;
    };

    return (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Box
                sx={{
                    bgcolor: "background.paper",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "5px 5px 0px #a8aaac",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    boxSizing: "border-box",
                    maxWidth: "500px",
                }}
            >
                <DisplayPanel input={input} result={result} />
                <Keypad
                    result={result}
                    onClick={handleInput}
                    handleEvaluate={handleEvaluate}
                    clear={handleClear}
                    handleBackspace={handleBackspace}
                />
            </Box>
        </Box>
    );
}
