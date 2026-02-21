import { useLoader } from "../../contexts/LoaderContext/useLoader";

export const LoaderOverlay = () => {
    const { loader } = useLoader();

    if (!loader.show) return null;

    return (
        <div className="
            fixed inset-0 
            z-100 
            flex items-center justify-center 
            bg-slate-950/80 
            backdrop-blur-sm
        ">
            <div className="
                flex flex-col items-center 
                bg-slate-900 
                px-8 py-6 
                rounded-2xl 
                shadow-2xl 
                border border-slate-700
            ">
                {/* Spinner */}
                <div className="
                    w-12 h-12 
                    border-4 
                    border-blue-800 
                    border-t-blue-400 
                    rounded-full 
                    animate-spin
                "></div>

                {/* Message */}
                <p className="mt-4 text-blue-300 font-medium">
                    {loader.message}
                </p>
            </div>
        </div>
    );
};