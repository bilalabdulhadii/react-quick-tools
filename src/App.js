import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import toolsList from "./toolsList";
import ListViewer from "./components/ListViewer";
import { useState, useEffect } from "react";
import NotFound from "./components/NotFound";
import { Box, CssBaseline } from "@mui/material";
import { groupToolsByGroup } from "./utils/tools";

const activeTools = toolsList.filter((tool) => tool.isActive);
const standaloneTools = activeTools.filter((tool) => !tool.group);
const groupedTools = groupToolsByGroup(activeTools);
const groupedEntries = Object.entries(groupedTools);

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
            <CssBaseline />
            <Box
                sx={{
                    width: "100%",
                    minHeight: "100vh",
                    background: "transparent",
                }}
            >
                <div className="App">
                    <Routes>
                        <Route
                            path="/"
                            element={<HomeLayout setThemeMode={setThemeMode} />}
                        >
                            <Route
                                index
                                element={<ListViewer toolsList={activeTools} />}
                            />

                            {/* Map simple top-level tools */}
                            {standaloneTools.map((tool) => (
                                <Route
                                    key={tool.id}
                                    path={tool.path}
                                    element={tool.component}
                                />
                            ))}

                            {/* Grouped tools */}
                            {groupedEntries.map(([group, tools]) => (
                                <Route key={group} path={group}>
                                    <Route
                                        index
                                        element={
                                            <ListViewer toolsList={tools} />
                                        }
                                    />
                                    {tools.map((tool) => (
                                        <Route
                                            key={tool.id}
                                            path={tool.path}
                                            element={tool.component}
                                        />
                                    ))}
                                </Route>
                            ))}
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </Box>
        </ThemeProvider>
    );
}

export default App;
