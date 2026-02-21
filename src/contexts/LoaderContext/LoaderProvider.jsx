import { useState } from "react";
import { LoaderContext } from "./LoaderContext";

export const LoaderProvider = ({ children }) => {
    const [loader, setLoader] = useState({
        show: false,
        message: "",
    });

    const showLoader = (message) => {
        setLoader({
            show: true,
            message
        })
    }

    const hideLoader = () => {
        setLoader((prev) => ({ ...prev, show: false }));
    };

    return (
        <LoaderContext.Provider value={{ loader, showLoader, hideLoader }}>
            {children}
        </LoaderContext.Provider>
    );
};