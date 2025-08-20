import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "",
    });

    const showToast = (message, type) => {
        setToast({ show: true, message, type });
    };

    const showTimedToast = (message, type = "error", duration = 5000) => {
        setToast({ show: true, message, type });

        setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
        }, duration);
    };

    const onClose = () => {
        setToast((prev) => ({
            ...prev,
            show: false,
        }));
    };

    return (
        <ToastContext.Provider value={{ showToast, showTimedToast }}>
            {toast.show && <Toast toast={toast} onClose={onClose} />}
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    return useContext(ToastContext);
};
