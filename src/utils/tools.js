export const formatGroupTitle = (group) => {
    if (!group) return "";
    return group
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export const getToolHref = (tool) => {
    if (!tool) return "/";
    const base = tool.group ? `${tool.group}/${tool.path}` : tool.path;
    return `/${base}`;
};

export const groupToolsByGroup = (tools) =>
    tools.reduce((acc, tool) => {
        if (!tool.group) return acc;
        if (!acc[tool.group]) acc[tool.group] = [];
        acc[tool.group].push(tool);
        return acc;
    }, {});
