/* import CalculateIcon from "@mui/icons-material/Calculate"; */
import Calculator from "./components/MathCalculator/Calculator";
import AgeCalculator from "./components/AgeCalculator/AgeCalculator";
import TextCaseConverter from "./components/TextCases/TextCaseConverter";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import TextCounter from "./components/TextCounter/TextCounter";
import SpaceRemover from "./components/SpaceRemover/SpaceRemover";
import TextReverser from "./components/TextReverser/TextReverser";
import PalindromeChecker from "./components/PalindromeChecker/PalindromeChecker";
import BMICalculator from "./components/BMICalculator/BMICalculator";
import UnitConverter from "./components/UnitConverter/UnitConverter";
import PrimeNumberChecker from "./components/PrimeNumberChecker/PrimeNumberChecker";
import GreatestCommonDivisor from "./components/GreatestCommonDivisor/GreatestCommonDivisor";
import LeastCommonMultiple from "./components/LeastCommonMultiple/LeastCommonMultiple";
import StatisticsCalculator from "./components/StatisticsCalculator/StatisticsCalculator";
import NumberSystemConverter from "./components/NumberSystemConverter/NumberSystemConverter";
import ColorConverter from "./components/ColorConverter/ColorConverter";
import PasswordGenerator from "./components/PasswordGenerator/PasswordGenerator";
import LoremIpsumGenerator from "./components/LoremIpsumGenerator/LoremIpsumGenerator";
import PasswordStrengthChecker from "./components/PasswordStrengthChecker/PasswordStrengthChecker";
import RandomDraw from "./components/RandomDraw/RandomDraw";
import RockPaperScissors from "./components/RockPaperScissors/RockPaperScissors";

const toolsList = [
    // Basic calculator
    {
        id: "calculator",
        title: "Basic Calculator",
        path: "calculator",
        component: <Calculator />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        isActive: true,
    },

    // Age calculator
    {
        id: "age-calculator",
        title: "Age Calculator",
        path: "age-calculator",
        component: <AgeCalculator />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        isActive: true,
    },

    // BMI calculator
    {
        id: "bmi-calculator",
        title: "BMI Calculator",
        path: "bmi-calculator",
        component: <BMICalculator />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        isActive: true,
    },

    // Text counter
    {
        id: "text-counter",
        title: "Text Counter",
        path: "text-counter",
        component: <TextCounter />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        isActive: true,
    },

    // Space remover
    {
        id: "space-remover",
        title: "Space Remover",
        path: "space-remover",
        component: <SpaceRemover />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        isActive: true,
    },

    // Text reverser
    {
        id: "text-reverser",
        title: "Text Reverser",
        path: "text-reverser",
        component: <TextReverser />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        isActive: true,
    },

    // Palindrome checker
    {
        id: "palindrome-checker",
        title: "Palindrome Checker",
        path: "palindrome-checker",
        component: <PalindromeChecker />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        isActive: true,
    },

    // Password generator
    {
        id: "password-generator",
        title: "Password Generator",
        path: "password-generator",
        component: <PasswordGenerator />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        isActive: true,
    },

    // Password strength checker
    {
        id: "password-strength-checker",
        title: "Password Strength Checker",
        path: "password-strength-checker",
        component: <PasswordStrengthChecker />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        isActive: true,
    },

    // Lorem ipsum generator
    {
        id: "lorem-ipsum-generator",
        title: "Lorem Ipsum Generator",
        path: "lorem-ipsum-generator",
        component: <LoremIpsumGenerator />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        isActive: true,
    },

    // Random draw
    {
        id: "random-draw",
        title: "Random Draw",
        path: "random-draw",
        component: <RandomDraw />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        isActive: true,
    },

    // RockPaperScissors
    {
        id: "rock-paper-scissors",
        title: "Rock Paper Scissors",
        path: "rock-paper-scissors",
        component: <RockPaperScissors />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        isActive: true,
    },

    // Math tools
    {
        id: "mean-calculator",
        title: "Mean Calculator",
        path: "mean-calculator",
        component: <StatisticsCalculator type="mean" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "math-tools",
        isActive: true,
    },
    {
        id: "median-calculator",
        title: "Median Calculator",
        path: "median-calculator",
        component: <StatisticsCalculator type="median" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "math-tools",
        isActive: true,
    },
    {
        id: "mode-calculator",
        title: "Mode Calculator",
        path: "mode-calculator",
        component: <StatisticsCalculator type="mode" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "math-tools",
        isActive: true,
    },
    {
        id: "greatest-common-divisor",
        title: "Greatest Common Divisor",
        path: "greatest-common-divisor",
        component: <GreatestCommonDivisor />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "math-tools",
        isActive: true,
    },
    {
        id: "least-common-multiple",
        title: "Least Common Multiple",
        path: "least-common-multiple",
        component: <LeastCommonMultiple />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "math-tools",
        isActive: true,
    },
    {
        id: "prime-number-checker",
        title: "Prime Number Checker",
        path: "prime-number-checker",
        component: <PrimeNumberChecker />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "math-tools",
        isActive: true,
    },

    // Number system converters
    {
        id: "binary-converter",
        title: "Binary Converter",
        path: "binary-converter",
        component: <NumberSystemConverter numberSystem="binary" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "number-system",
        isActive: true,
    },
    {
        id: "octal-converter",
        title: "Octal Converter",
        path: "octal-converter",
        component: <NumberSystemConverter numberSystem="octal" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "number-system",
        isActive: true,
    },
    {
        id: "decimal-converter",
        title: "Decimal Converter",
        path: "decimal-converter",
        component: <NumberSystemConverter numberSystem="decimal" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "number-system",
        isActive: true,
    },
    {
        id: "hexadecimal-converter",
        title: "Hexadecimal Converter",
        path: "hexadecimal-converter",
        component: <NumberSystemConverter numberSystem="hexadecimal" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "number-system",
        isActive: true,
    },

    // Color converter tools
    {
        id: "hex-converter",
        title: "HEX Converter",
        path: "hex-converter",
        component: <ColorConverter type="hex" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "color-converter",
        isActive: true,
    },
    {
        id: "rgb-converter",
        title: "RGB Converter",
        path: "rgb-converter",
        component: <ColorConverter type="rgb" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "color-converter",
        isActive: true,
    },
    {
        id: "hsl-converter",
        title: "HSL Converter",
        path: "hsl-converter",
        component: <ColorConverter type="hsl" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "color-converter",
        isActive: true,
    },

    // Unit Converter tools
    {
        id: "length-converter",
        title: "Length Converter",
        path: "length-converter",
        component: <UnitConverter unitType="length" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "unit-converter",
        isActive: true,
    },
    {
        id: "weight-converter",
        title: "Weight Converter",
        path: "weight-converter",
        component: <UnitConverter unitType="weight" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "unit-converter",
        isActive: true,
    },
    {
        id: "volume-converter",
        title: "Volume Converter",
        path: "volume-converter",
        component: <UnitConverter unitType="volume" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "unit-converter",
        isActive: true,
    },
    {
        id: "temperature-converter",
        title: "Temperature Converter",
        path: "temperature-converter",
        component: <UnitConverter unitType="temperature" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "unit-converter",
        isActive: true,
    },
    {
        id: "speed-converter",
        title: "Speed Converter",
        path: "speed-converter",
        component: <UnitConverter unitType="speed" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "unit-converter",
        isActive: true,
    },
    {
        id: "time-converter",
        title: "Time Converter",
        path: "time-converter",
        component: <UnitConverter unitType="time" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "unit-converter",
        isActive: true,
    },
    {
        id: "data-converter",
        title: "Data Converter",
        path: "data-converter",
        component: <UnitConverter unitType="data" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "unit-converter",
        isActive: true,
    },
    {
        id: "energy-converter",
        title: "Energy Converter",
        path: "energy-converter",
        component: <UnitConverter unitType="energy" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "unit-converter",
        isActive: true,
    },
    {
        id: "pressure-converter",
        title: "Pressure Converter",
        path: "pressure-converter",
        component: <UnitConverter unitType="pressure" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "unit-converter",
        isActive: true,
    },
    {
        id: "area-converter",
        title: "Area Converter",
        path: "area-converter",
        component: <UnitConverter unitType="area" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "unit-converter",
        isActive: true,
    },

    // Text case tools
    {
        id: "uppercase",
        title: "Uppercase",
        path: "uppercase",
        component: <TextCaseConverter caseType="uppercase" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "text-case",
        isActive: true,
    },
    {
        id: "lowercase",
        title: "Lowercase",
        path: "lowercase",
        component: <TextCaseConverter caseType="lowercase" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "text-case",
        isActive: true,
    },
    {
        id: "capitalize",
        title: "Capitalize",
        path: "capitalize",
        component: <TextCaseConverter caseType="capitalize" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "text-case",
        isActive: true,
    },
    {
        id: "title-case",
        title: "Title Case",
        path: "title-case",
        component: <TextCaseConverter caseType="title-case" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "text-case",
        isActive: true,
    },
    {
        id: "sentence-case",
        title: "Sentence Case",
        path: "sentence-case",
        component: <TextCaseConverter caseType="sentence-case" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "text-case",
        isActive: true,
    },
    {
        id: "toggle-case",
        title: "Toggle Case",
        path: "toggle-case",
        component: <TextCaseConverter caseType="toggle-case" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "text-case",
        isActive: true,
    },
    {
        id: "camel-case",
        title: "Camel Case",
        path: "camel-case",
        component: <TextCaseConverter caseType="camel-case" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "text-case",
        isActive: true,
    },
    {
        id: "pascal-case",
        title: "Pascal Case",
        path: "pascal-case",
        component: <TextCaseConverter caseType="pascal-case" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "text-case",
        isActive: true,
    },
    {
        id: "snake-case",
        title: "Snake Case",
        path: "snake-case",
        component: <TextCaseConverter caseType="snake-case" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "text-case",
        isActive: true,
    },
    {
        id: "screaming-snake-case",
        title: "Screaming Snake Case",
        path: "screaming-snake-case",
        component: <TextCaseConverter caseType="screaming-snake-case" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "text-case",
        isActive: true,
    },
    {
        id: "kebab-case",
        title: "Kebab Case",
        path: "kebab-case",
        component: <TextCaseConverter caseType="kebab-case" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "text-case",
        isActive: true,
    },
    {
        id: "train-case",
        title: "Train Case",
        path: "train-case",
        component: <TextCaseConverter caseType="train-case" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "text-case",
        isActive: true,
    },
    {
        id: "dot-case",
        title: "Dot Case",
        path: "dot-case",
        component: <TextCaseConverter caseType="dot-case" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "text-case",
        isActive: true,
    },
    {
        id: "path-case",
        title: "Path Case",
        path: "path-case",
        component: <TextCaseConverter caseType="path-case" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "text-case",
        isActive: true,
    },
    {
        id: "cobol-case",
        title: "Cobol Case",
        path: "cobol-case",
        component: <TextCaseConverter caseType="cobol-case" />,
        icon: <KeyboardArrowRightOutlinedIcon />,
        description: "",
        group: "text-case",
        isActive: true,
    },
];

export default toolsList;
