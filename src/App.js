import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import toolsList from "./toolsList";
import ListViewer from "./components/ListViewer";
import { useState, useEffect } from "react";

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        const storedTheme = localStorage.getItem("quick_tools_theme");
        return storedTheme === "dark";
    });

    useEffect(() => {
        const html = document.documentElement;
        const theme = darkMode ? "dark" : "light";
        html.setAttribute("data-theme", theme);
        localStorage.setItem("quick_tools_theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const setThemeMode = (isDark) => {
        setDarkMode(isDark);
    };

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={<HomeLayout setThemeMode={setThemeMode} />}
                    >
                        <Route
                            index
                            element={<ListViewer toolsList={toolsList} />}
                        />

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
                            <Route
                                index
                                element={
                                    <ListViewer
                                        toolsList={toolsList.filter(
                                            (tool) =>
                                                tool.group === "unit-converter"
                                        )}
                                    />
                                }
                            />
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

                        {/* Parent route for math-tools tools */}
                        <Route path="math-tools">
                            <Route
                                index
                                element={
                                    <ListViewer
                                        toolsList={toolsList.filter(
                                            (tool) =>
                                                tool.group === "math-tools"
                                        )}
                                    />
                                }
                            />
                            {toolsList
                                .filter(
                                    (tool) =>
                                        tool.isActive &&
                                        tool.group === "math-tools"
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
                            <Route
                                index
                                element={
                                    <ListViewer
                                        toolsList={toolsList.filter(
                                            (tool) =>
                                                tool.group === "number-system"
                                        )}
                                    />
                                }
                            />
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
                            <Route
                                index
                                element={
                                    <ListViewer
                                        toolsList={toolsList.filter(
                                            (tool) =>
                                                tool.group === "color-converter"
                                        )}
                                    />
                                }
                            />
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
                            <Route
                                index
                                element={
                                    <ListViewer
                                        toolsList={toolsList.filter(
                                            (tool) => tool.group === "text-case"
                                        )}
                                    />
                                }
                            />
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
