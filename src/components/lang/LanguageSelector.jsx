import { useTranslation } from "react-i18next";

export const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;

    const isEnglish = currentLang === "en";

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang)
        localStorage.setItem("lang", lang);
    }


    return (
    <div className="absolute top-4 left-4">
        <div
            onClick={() => handleLanguageChange(isEnglish ? "es" : "en")}
            className="relative w-24 h-10 bg-gray-200 rounded-full cursor-pointer flex items-center p-1 transition-all duration-300"
        >
            {/* Thumb (fondo activo) */}
            <div
                className={`absolute top-1 left-1 w-1/2 h-8 bg-indigo-600 rounded-full shadow-md transform transition-all duration-300 ${
                    isEnglish ? "translate-x-10" : "translate-x-0"
                }`}
            />

            {/* Labels */}
            <div className="relative w-full flex justify-center text-sm font-semibold">
                <button
                    onClick={() => handleLanguageChange("es")}
                    className="w-1/2 text-center z-10 transition-colors duration-300 cursor-pointer flex justify-center items-center"
                >
                    <img
                        src="https://flagcdn.com/es.svg"
                        width="25"
                        alt="Spain"
                    />
                </button>

                <button
                    onClick={() => handleLanguageChange("en")}
                    className="w-1/2 text-center z-10 transition-colors duration-300 cursor-pointer flex justify-center items-center"
                >
                    <img
                        src="https://flagcdn.com/gb.svg"
                        width="25"
                        alt="United Kingdom"
                    />
                </button>
            </div>
        </div>
    </div>
    );
};