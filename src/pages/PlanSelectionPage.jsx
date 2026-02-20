import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

const PlanCard = ({ title, price, description, features, recommended, onSelect }) => {
    const { t } = useTranslation();
    return (
        <div className={`relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border-2 p-6 transition-all hover:shadow-xl ${recommended ? 'border-primary shadow-2xl shadow-primary/10 ring-4 ring-primary/5' : 'border-slate-200 dark:border-slate-800'}`}>
            {recommended && (
                <div className="absolute top-0 right-0">
                    <div className="bg-primary text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest">{t("plans.recommended")}</div>
                </div>
            )}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h4 className={`text-xl font-bold ${recommended ? 'text-primary' : ''}`}>{title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{description}</p>
                </div>
                <div className="text-right">
                    <span className="text-3xl font-bold">${price}</span>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">{t("plans.oneTime")}</p>
                </div>
            </div>
            <ul className="space-y-4 mb-8">
                {features.map((feature, idx) => (
                    <li key={idx} className={`flex items-center gap-3 text-sm ${feature.included ? '' : 'opacity-40'}`}>
                        <span className={`material-symbols-outlined ${feature.included ? (recommended ? 'text-primary' : 'text-green-500') : ''}`}>
                            {feature.included ? (feature.icon || 'check_circle') : 'cancel'}
                        </span>
                        <span className={feature.included && recommended ? 'font-medium' : ''}>{feature.text}</span>
                    </li>
                ))}
            </ul>
            <button
                onClick={onSelect}
                className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg ${recommended ? 'bg-primary text-white hover:opacity-90 shadow-primary/30' : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'}`}
            >
                {recommended ? t("plans.enroll", { title }) : t("plans.select", { title })}
            </button>
        </div>
    );
};

const PlanSelectionPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { t } = useTranslation();

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col antialiased">
            {/* Sticky Header */}
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
                <div className="max-w-xl mx-auto flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors"
                        >
                            <span className="material-symbols-outlined text-primary">arrow_back</span>
                        </button>
                        <h1 className="text-[10px] font-bold uppercase tracking-widest text-primary/80 hidden xs:block">{t("plans.overview")}</h1>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
                        <LanguageSwitcher />
                        {user ? (
                            <div
                                onClick={() => navigate("/profile")}
                                className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/30 overflow-hidden cursor-pointer"
                            >
                                <img alt="User Profile" src={user.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuBiLzk5dXrluoXVvFMB43BwrpcaO9sT32t6IzZY9Nm-kJPW0UdzRHUaGACYNh4wrWmksPtln4cw5Qrlnp9C2sEz-CXIoaQsEMdsQWO9nJACjp1CyCNYh0g5WNguhL3U7IiZZ66NkDg89d-njS--HQYXMYglc3_njprFdtGM6TpDHZIxo78KV-jfPE5JRDKi1_ea3kIJrzdS7eQHV_wxnPMBYWYsXij_qQIMRKllLwoMi8kc7Nq8KyW9D1CCssYSdi3vQLzNcrbcK8Hy"} />
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate("/login")}
                                className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors"
                            >
                                <span className="material-symbols-outlined text-primary text-2xl">account_circle</span>
                            </button>
                        )}
                        <button className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors">
                            <span className="material-symbols-outlined text-primary text-xl">share</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-xl mx-auto pb-24">
                {/* Hero Section */}
                <div className="px-4 py-4">
                    <div className="relative h-64 w-full overflow-hidden rounded-xl shadow-lg group">
                        <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1O7Hrh49sTZBi3z96hFSjSjTm61I5ZPsN5XZyknV7kID-jLuGHJO8ZfGfmz58-Qs2ucqkwXSZV9q5BbGcz8YUIWuLugDtlSkk6kzY5kxUeQ0fjsVv4eNJCBYddwFJTOgcc9HP-T_d73meC1J48p8jDyf1bgNMq2y9YuI8gzgAqR_RkVToXEzMc44Qfb63KDzbCOVbOleh8DsB3fPggD9mxrpTkb8bXuYUEUh9IflioH0u5XtxmJySDobbzyV9PyQldJJjN2po9FQo" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6">
                            <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-3">AI & ARCHITECTURE</span>
                            <h2 className="text-2xl font-bold text-white leading-tight">Mastering Generative AI for Urban Development</h2>
                        </div>
                    </div>
                </div>

                {/* Metadata Chips */}
                <div className="flex gap-3 px-4 py-2 overflow-x-auto no-scrollbar">
                    {[
                        { icon: 'bar_chart', text: 'Intermediate' },
                        { icon: 'schedule', text: '12 Weeks' },
                        { icon: 'group', text: '1.2k Students' }
                    ].map((chip, idx) => (
                        <div key={idx} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-primary/5 border border-primary/10 px-4">
                            <span className="material-symbols-outlined text-primary text-xl">{chip.icon}</span>
                            <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold">{chip.text}</p>
                        </div>
                    ))}
                </div>

                {/* Description */}
                <section className="px-4 pt-6">
                    <h3 className="text-xl font-bold mb-3">{t("plans.about")}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {t("plans.aboutDesc")}
                    </p>
                </section>

                {/* Curriculum Section */}
                <section className="px-4 pt-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold">{t("plans.curriculum")}</h3>
                        <span className="text-xs font-bold text-primary uppercase">5 {t("plans.modules")}</span>
                    </div>
                    <div className="space-y-3">
                        {[
                            { id: 1, title: 'Intro to Parametric Design', meta: '45 mins • Video', icon: 'play_circle' },
                            { id: 2, title: 'AI in Zoning & Regulation', meta: '60 mins • Video', icon: 'play_circle' },
                            { id: 3, title: 'Sustainability Simulations', meta: '90 mins • Case Study', icon: 'lock' },
                            { id: 4, title: 'Procedural City Generation', meta: '120 mins • Project', icon: 'lock' }
                        ].map((module) => (
                            <div key={module.id} className="group flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">{module.id}</div>
                                    <div>
                                        <p className="text-sm font-bold">{module.title}</p>
                                        <p className="text-xs text-slate-500">{module.meta}</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">{module.icon}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Plan Selection Section */}
                <section className="px-4 pt-12">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-2">{t("plans.selectPlan")}</h3>
                        <p className="text-slate-500 dark:text-slate-400">{t("plans.planDesc")}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        <PlanCard
                            title={t("plans.basic")}
                            price="199"
                            description="Essentials only"
                            features={[
                                { text: 'On-demand Video Access', included: true },
                                { text: 'Resource Library', included: true },
                                { text: 'Live Workshops', included: false },
                                { text: 'Professional Certification', included: false },
                            ]}
                            onSelect={() => navigate("/checkout")}
                        />
                        <PlanCard
                            title={t("plans.pro")}
                            price="499"
                            description="Full immersion"
                            recommended={true}
                            features={[
                                { text: 'Everything in Basic', included: true, icon: 'verified' },
                                { text: 'Weekly Live Workshops', included: true, icon: 'groups' },
                                { text: 'Certified AI City Builder Badge', included: true, icon: 'workspace_premium' },
                                { text: '1-on-1 Mentorship Session', included: true, icon: 'forum' },
                            ]}
                            onSelect={() => navigate("/checkout")}
                        />
                    </div>
                </section>

                {/* Extra Info */}
                <section className="px-4 py-12 border-t border-slate-200 dark:border-slate-800 mt-12 text-center">
                    <p className="text-sm text-slate-500">Need corporate training for your firm?</p>
                    <a className="text-sm font-bold text-primary hover:underline mt-1 inline-block" href="#">Contact our enterprise team</a>
                </section>
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-background-dark border-t border-primary/10 px-4 pb-3 pt-2 z-50">
                <div className="max-w-xl mx-auto flex gap-2">
                    <div className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400 cursor-pointer" onClick={() => navigate("/")}>
                        <span className="material-symbols-outlined">home</span>
                        <p className="text-[10px] font-medium leading-normal">{t("common.home")}</p>
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-end gap-1 text-primary cursor-pointer">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
                        <p className="text-[10px] font-medium leading-normal">{t("common.learning")}</p>
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400 cursor-pointer">
                        <span className="material-symbols-outlined">search</span>
                        <p className="text-[10px] font-medium leading-normal">{t("common.search")}</p>
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400 cursor-pointer">
                        <span className="material-symbols-outlined">person</span>
                        <p className="text-[10px] font-medium leading-normal">{t("common.profile")}</p>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default PlanSelectionPage;
