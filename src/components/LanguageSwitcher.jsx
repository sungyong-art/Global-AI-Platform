import { useTranslation } from "react-i18next";
import { useState } from "react";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: "en", name: "English", flag: "🇺🇸" },
        { code: "ko", name: "한국어", flag: "🇰🇷" },
    ];

    const currentLanguage = languages.find((lang) => lang.code === i18n.language.split("-")[0]) || languages[0];

    const changeLanguage = (code) => {
        i18n.changeLanguage(code);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors text-slate-700 dark:text-slate-300"
            >
                <span className="text-xl">{currentLanguage.flag}</span>
                <span className="text-sm font-bold uppercase tracking-wider">{currentLanguage.code}</span>
                <span className={`material-symbols-outlined text-sm transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                </span>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-primary/5 transition-colors ${i18n.language.startsWith(lang.code) ? 'text-primary font-bold bg-primary/5' : 'text-slate-600 dark:text-slate-400'
                                    }`}
                            >
                                <span className="text-lg">{lang.flag}</span>
                                {lang.name}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default LanguageSwitcher;
