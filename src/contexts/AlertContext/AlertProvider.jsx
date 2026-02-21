import { useState } from "react";
import { AlertContext } from "./AlertContext";

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({
        show: false,
        title: "",
        message: "",
        type: "info", // success | error | info
    });

    const showAlert = ({ title, message, type = "info" }) => {
        setAlert({
            show: true,
            title,
            message,
            type,
        });

        setTimeout(() => {
            hideAlert()
        }, 3000)
    };

    const hideAlert = () => {
        setAlert((prev) => ({ ...prev, show: false }));
    };

    return (
        <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
            {children}
        </AlertContext.Provider>
    );
};