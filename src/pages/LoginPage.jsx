import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

const LoginPage = () => {
    const { loginWithGoogle, user } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    if (user) {
        navigate("/");
    }

    const handleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 text-center relative overflow-hidden">
                {/* Language Switcher Positioned at Top Right */}
                <div className="absolute top-4 right-4 z-20">
                    <LanguageSwitcher />
                </div>

                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

                <div className="relative z-10">
                    <div className="size-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
                        <span className="material-symbols-outlined text-white text-3xl">domain</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{t("login.welcome")}</h1>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">
                        {t("login.desc")}
                    </p>

                    <button
                        onClick={handleLogin}
                        className="w-full h-14 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all font-semibold active:scale-[0.98]"
                    >
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="size-5" />
                        {t("login.google")}
                    </button>

                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-sm text-slate-400">
                            {t("login.newTo")}
                            <button className="text-primary font-bold ml-1 hover:underline">{t("login.createAccount")}</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
