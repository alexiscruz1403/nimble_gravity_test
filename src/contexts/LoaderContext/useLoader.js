import { useContext } from "react";
import { LoaderContext } from "./LoaderContext";

export const useLoader = () => {
    const context = useContext(LoaderContext);

    if (!context) {
        throw new Error("useLoader debe ser utilizado dentro de LoaderProvider");
    }

    return context;
};