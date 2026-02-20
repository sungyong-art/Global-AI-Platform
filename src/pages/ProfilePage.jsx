import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (!user) {
        navigate("/login");
        return null;
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col antialiased">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
                <div className="max-w-xl mx-auto flex items-center justify-between px-4 py-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-primary">arrow_back</span>
                    </button>
                    <h1 className="text-sm font-bold uppercase tracking-widest text-primary/80">{t("common.profile")}</h1>
                    <LanguageSwitcher />
                </div>
            </header>

            <main className="max-w-xl mx-auto w-full flex-grow px-4 py-8">
                {/* Profile Info */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-primary/5 border border-primary/10 text-center mb-8">
                    <div className="relative inline-block mb-6">
                        <div className="size-24 rounded-full bg-primary/20 p-1 border-2 border-primary/30 overflow-hidden mx-auto">
                            <img
                                src={user.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuBiLzk5dXrluoXVvFMB43BwrpcaO9sT32t6IzZY9Nm-kJPW0UdzRHUaGACYNh4wrWmksPtln4cw5Qrlnp9C2sEz-CXIoaQsEMdsQWO9nJACjp1CyCNYh0g5WNguhL3U7IiZZ66NkDg89d-njS--HQYXMYglc3_njprFdtGM6TpDHZIxo78KV-jfPE5JRDKi1_ea3kIJrzdS7eQHV_wxnPMBYWYsXij_qQIMRKllLwoMi8kc7Nq8KyW9D1CCssYSdi3vQLzNcrbcK8Hy"}
                                alt="User Profile"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 bg-primary text-white size-8 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-lg">
                            <span className="material-symbols-outlined text-sm">edit</span>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-1">{user.displayName}</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{user.email}</p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">{t("profile.status")}</p>
                            <p className="text-sm font-bold text-emerald-500">{t("profile.freeUser")}</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">{t("profile.enrolled")}</p>
                            <p className="text-sm font-bold">{t("profile.courses", { count: 0 })}</p>
                        </div>
                    </div>
                </div>

                {/* Settings List */}
                <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="size-10 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined">settings</span>
                            </div>
                            <span className="font-bold">{t("profile.accountSettings")}</span>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="size-10 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined">history</span>
                            </div>
                            <span className="font-bold">{t("profile.orderHistory")}</span>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="size-10 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined">notifications</span>
                            </div>
                            <span className="font-bold">{t("profile.notifications")}</span>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/20 transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="size-10 bg-red-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
                                <span className="material-symbols-outlined">logout</span>
                            </div>
                            <span className="font-bold text-red-600 dark:text-red-400">{t("common.logout")}</span>
                        </div>
                        <span className="material-symbols-outlined text-red-300 group-hover:text-red-500 transition-colors">power_settings_new</span>
                    </button>
                </div>
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-background-dark border-t border-primary/10 px-4 pb-3 pt-2 z-50">
                <div className="max-w-xl mx-auto flex gap-2">
                    <div className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400 cursor-pointer" onClick={() => navigate("/")}>
                        <span className="material-symbols-outlined">home</span>
                        <p className="text-[10px] font-medium leading-normal">{t("common.home")}</p>
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400 cursor-pointer">
                        <span className="material-symbols-outlined">menu_book</span>
                        <p className="text-[10px] font-medium leading-normal">{t("common.learning")}</p>
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400 cursor-pointer">
                        <span className="material-symbols-outlined">search</span>
                        <p className="text-[10px] font-medium leading-normal">{t("common.search")}</p>
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-end gap-1 text-primary cursor-pointer">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                        <p className="text-[10px] font-medium leading-normal">{t("common.profile")}</p>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default ProfilePage;
