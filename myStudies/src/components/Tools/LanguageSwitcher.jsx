import React, { useState } from "react";

const LanguageSwitcher = () => {
    const [language, setLanguage] = useState("el");

    const changeLanguage = ({ language }) => {
        setLanguage(language);
    }

    return (
        <div>
            {language === "en" ? (
                <button onClick={() => changeLanguage("en")}> EN </button>
            ) : (
                <button onClick={() => changeLanguage("el")}> GR </button>
            )}
        </div>
    );
};

export default LanguageSwitcher;