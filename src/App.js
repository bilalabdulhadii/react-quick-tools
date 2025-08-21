import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "./theme";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import toolsList from "./toolsList";
import Calculator from "./components/MathCalculator/Calculator";

function App() {
    return (
        <ThemeProvider theme={lightTheme}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomeLayout />}>
                        <Route index element={<Calculator />} />
                        {/* Map simple top-level tools */}
                        {toolsList
                            .filter((tool) => tool.isActive && !tool.group)
                            .map((tool) => (
                                <Route
                                    key={tool.id}
                                    path={tool.path}
                                    element={tool.component}
                                />
                            ))}

                        {/* Parent route for unit-converter tools */}
                        <Route path="unit-converter">
                            <Route index element={<h1>unit converter</h1>} />
                            {toolsList
                                .filter(
                                    (tool) =>
                                        tool.isActive &&
                                        tool.group === "unit-converter"
                                )
                                .map((tool) => (
                                    <Route
                                        key={tool.id}
                                        path={tool.path}
                                        element={tool.component}
                                    />
                                ))}
                        </Route>

                        {/* Parent route for statistics-calculator tools */}
                        <Route path="statistics-calculator">
                            <Route
                                index
                                element={<h1>statistics calculator</h1>}
                            />
                            {toolsList
                                .filter(
                                    (tool) =>
                                        tool.isActive &&
                                        tool.group === "statistics-calculator"
                                )
                                .map((tool) => (
                                    <Route
                                        key={tool.id}
                                        path={tool.path}
                                        element={tool.component}
                                    />
                                ))}
                        </Route>

                        {/* Parent route for number-system tools */}
                        <Route path="number-system">
                            <Route index element={<h1>number system</h1>} />
                            {toolsList
                                .filter(
                                    (tool) =>
                                        tool.isActive &&
                                        tool.group === "number-system"
                                )
                                .map((tool) => (
                                    <Route
                                        key={tool.id}
                                        path={tool.path}
                                        element={tool.component}
                                    />
                                ))}
                        </Route>

                        {/* Parent route for color-converter tools */}
                        <Route path="color-converter">
                            <Route index element={<h1>color converter</h1>} />
                            {toolsList
                                .filter(
                                    (tool) =>
                                        tool.isActive &&
                                        tool.group === "color-converter"
                                )
                                .map((tool) => (
                                    <Route
                                        key={tool.id}
                                        path={tool.path}
                                        element={tool.component}
                                    />
                                ))}
                        </Route>

                        {/* Parent route for text-case tools */}
                        <Route path="text-case">
                            <Route index element={<h1>text cases</h1>} />
                            {toolsList
                                .filter(
                                    (tool) =>
                                        tool.isActive &&
                                        tool.group === "text-case"
                                )
                                .map((tool) => (
                                    <Route
                                        key={tool.id}
                                        path={tool.path}
                                        element={tool.component}
                                    />
                                ))}
                        </Route>
                    </Route>
                    <Route path="*" element={<h1>404</h1>} />
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
