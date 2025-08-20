
export default function Toast({ toast, onClose }) {
    const bgColor =
        {
            error: "#e44336",
            success: "#4caf50",
            info: "#2196f3",
            warning: "#ff9800",
        }[toast.type] || "#333333";
    return (
        <div
            style={{
                padding: "10px 16px",
                marginRight:"20px",
                backgroundColor: bgColor,
                color: "white",
                position: "fixed",
                bottom: "20px",
                left: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                zIndex: 10000,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minWidth: "200px",
            }}
        >
            <span>{toast.message}</span>
            <button
                onClick={onClose}
                style={{
                    background: "transparent",
                    border: "none",
                    color: "white",
                    fontSize: "1.2rem",
                    marginLeft: "12px",
                    cursor: "pointer",
                }}
                aria-label="Close toast"
            >
                &times;
            </button>
        </div>
    );
}
