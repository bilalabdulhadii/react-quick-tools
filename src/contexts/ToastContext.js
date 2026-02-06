import { createContext, useContext, useEffect, useRef, useState } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "",
    });
    const timerRef = useRef(null);

    const showToast = (message, type) => {
        setToast({ show: true, message, type });
    };

    const showTimedToast = (message, type = "error", duration = 5000) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setToast({ show: true, message, type });

        timerRef.current = setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
        }, duration);
    };

    const onClose = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        setToast((prev) => ({
            ...prev,
            show: false,
        }));
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

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
