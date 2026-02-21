import { useAlert } from "../../contexts/AlertContext/useAlert"

export const Alert = () => {
    const { alert, hideAlert } = useAlert();

    if (!alert.show) return null;

    const typeStyles = {
        success: "bg-blue-900 border-blue-700 text-blue-200",
        error: "bg-red-900 border-red-700 text-red-200",
        info: "bg-slate-800 border-slate-600 text-blue-300",
    };

    return (
        <div 
            className={`
                fixed top-6 right-6 w-96 p-5 rounded-xl shadow-lg border
                transition-all duration-300 ease-out
                ${alert.show 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 -translate-y-4 pointer-events-none"}
                ${typeStyles[alert.type]}
            `}
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-lg">{alert.title}</h3>
                    <p className="text-sm mt-1">{alert.message}</p>
                </div>

                <button
                    onClick={hideAlert}
                    className="ml-4 text-sm opacity-70 hover:opacity-100 cursor-pointer"
                >
                ✕
                </button>
            </div>
        </div>
    );
};