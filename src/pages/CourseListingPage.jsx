import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

const CourseCard = ({ title, category, image, duration, rating, reviews, price, badge, badgeColor }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate("/plans")}
            className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col cursor-pointer"
        >
            <div className="relative aspect-video overflow-hidden">
                <img
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={image}
                />
                {badge && (
                    <div className="absolute top-4 left-4">
                        <span className={`${badgeColor || 'bg-primary'} text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider`}>
                            {badge}
                        </span>
                    </div>
                )}
            </div>
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">{category}</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">schedule</span> {duration}
                    </span>
                </div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-1 line-clamp-2">
                    Master midjourney and parametric AI tools to revolutionize your design workflow and conceptual speed.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-yellow-500 filled-icon text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="font-bold">{rating}</span>
                        <span className="text-slate-400 text-xs">({reviews})</span>
                    </div>
                    <div className="text-xl font-bold text-primary">${price}</div>
                </div>
            </div>
        </div>
    );
};

const CourseListingPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { t } = useTranslation();

    const courses = [
        {
            id: 1,
            title: t("course.foundationsTitle"),
            instructor: "Dr. Aris Thorne",
            rating: 4.9,
            reviews: 1240,
            price: 89,
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
            category: "Architecture"
        },
        {
            id: 2,
            title: t("course.dataDrivenTitle"),
            instructor: "Sarah Chen",
            rating: 4.8,
            reviews: 856,
            price: 129,
            image: "https://images.unsplash.com/photo-1573164713988-862a3b56ff3b?q=80&w=800&auto=format&fit=crop",
            category: "Urban Planning"
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col antialiased">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-white">public</span>
                        </div>
                        <div className="leading-none">
                            <h1 className="text-sm font-black uppercase tracking-tighter text-primary">Global AI</h1>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">City Builders</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        <button className="relative p-2 text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
                        </button>
                        {user ? (
                            <div
                                onClick={() => navigate("/profile")}
                                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/30 overflow-hidden cursor-pointer"
                            >
                                <img alt="User Profile" src={user.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuBiLzk5dXrluoXVvFMB43BwrpcaO9sT32t6IzZY9Nm-kJPW0UdzRHUaGACYNh4wrWmksPtln4cw5Qrlnp9C2sEz-CXIoaQsEMdsQWO9nJACjp1CyCNYh0g5WNguhL3U7IiZZ66NkDg89d-njS--HQYXMYglc3_njprFdtGM6TpDHZIxo78KV-jfPE5JRDKi1_ea3kIJrzdS7eQHV_wxnPMBYWYsXij_qQIMRKllLwoMi8kc7Nq8KyW9D1CCssYSdi3vQLzNcrbcK8Hy"} />
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate("/login")}
                                className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                            >
                                {t("common.login")}
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-1 pb-24">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-slate-900 py-16 px-4 mb-8">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #1142d4 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>
                    <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-start gap-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider">
                            <span className="material-symbols-outlined text-sm">bolt</span>
                            {t("common.nextGenLearning")}
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white max-w-2xl leading-tight">
                            {t("course.heroTitle")}
                        </h2>
                        <p className="text-slate-400 text-lg max-w-xl">
                            {t("course.heroDesc")}
                        </p>
                        <div className="flex flex-wrap gap-4 w-full md:w-auto">
                            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2">
                                {t("course.exploreCourses")} <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold backdrop-blur-sm border border-white/10 transition-all">
                                {t("course.viewRoadmap")}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Search and Filters */}
                <div className="max-w-7xl mx-auto px-4 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
                        <div className="relative w-full md:flex-1">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input className="w-full pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary shadow-sm" placeholder={t("course.searchPlaceholder")} type="text" />
                        </div>
                        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            <button className="whitespace-nowrap px-6 py-4 rounded-xl bg-primary text-white font-medium">{t("course.topics.all")}</button>
                            <button className="whitespace-nowrap px-6 py-4 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors">{t("course.topics.architecture")}</button>
                            <button className="whitespace-nowrap px-6 py-4 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors">{t("course.topics.urbanPlanning")}</button>
                            <button className="whitespace-nowrap px-6 py-4 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors">{t("course.topics.dataScience")}</button>
                        </div>
                    </div>
                </div>

                {/* Featured Courses Grid */}
                <section className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold">{t("common.featuredCourses")}</h3>
                        <a className="text-primary font-bold flex items-center gap-1 hover:underline" href="#">
                            {t("common.viewAll")} <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <CourseCard
                            title="GenAI for Architects: Designing 2050"
                            category={t("course.topics.architecture")}
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuCpSHeByhH_A0vTNa48vmk1J4qo-Aly-U4pO9QK4TztY7ntcuzhLpZTQ8dwDN8iWIlQ92MhKXT01hz2yI17_86RmMxaFPo8oNlqpSKqkRLy2VGqDgNmTpzGrE1sexLUgIPrDJN4qyL9_P8b-LlqY9J3v64uJiBXHqIPZxXdHoUkHb6WXU5PHyotRh89L18HDefOPETqqMcMKMSk8CrXmd1jmDwmmTtkogax1cQNrm5jz-M4kEFyBJfiNuLew3mQ2oYRfPJWV92ubn1k"
                            duration="12h 30m"
                            rating="4.9"
                            reviews="1.2k"
                            price="199.00"
                            badge="Bestseller"
                        />
                        <CourseCard
                            title="AI City Planning & Smart Infrastructure"
                            category={t("course.topics.urbanPlanning")}
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuDqEpe55m4U-BRgeZWbghzSeD4Z8meNt1i_aUN8NFmyg8ngXh4J2wteu3o1JQjrKumuWNu8HGL8m7rRGHQhm1pferKRgR3l28cpuxqClUKrlDK1LZ3xB0u_KbWA08_C5DUWJoj4rS-kBkNqvB1H_R-QnY0rB877oZjVdzc-c_VVlhn3rP7KJc1h4_URJZjM3eApKAA6aw1_jwXPp-tGGXKe9tworW7hwbhPvpI7ZFKk5-i5hc7For0hWx5A9AfWnBdG6AF8HtM5ACEG"
                            duration="24h 00m"
                            rating="4.8"
                            reviews="856"
                            price="249.00"
                            badge="Trending"
                            badgeColor="bg-slate-900"
                        />
                        <CourseCard
                            title="Data Science for Builders & Logistics"
                            category={t("course.topics.dataScience")}
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuBCOGawLx7hKVPbJhkMiMMT9d6MjYQTDCa_zsiJ5T0B-VETowNQcuZK9XIsya65IBAJo-Kd4sPKgWH6NX2plnse6ymU53tdWW-oAsx4COWEP7VkTxTX2P5S7HtFiqoE-VuT1Oi08HyM7gyByjAJQVvoZ3OkXC7uqzROo9l_HQpDKaie8XVRuxqte-5gF7ezmwa7YO3NsFlRQw1hhqfvvVP0JPhqYVez5PRjUtl9lqbtEuYqbaOextvmww7UYzIU73YJ0UPTOHXNBktj"
                            duration="18h 15m"
                            rating="4.9"
                            reviews="2.1k"
                            price="179.00"
                            badge="Top Rated"
                        />
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="max-w-7xl mx-auto px-4 mt-16 mb-8">
                    <div className="bg-primary rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden">
                        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="relative z-10 max-w-lg">
                            <h3 className="text-3xl font-bold mb-4">{t("common.joinCommunity")}</h3>
                            <p className="text-white/80">{t("common.newsletterDesc")}</p>
                        </div>
                        <div className="relative z-10 w-full md:w-auto flex flex-col sm:flex-row gap-3">
                            <input className="px-6 py-4 rounded-xl bg-white/10 border border-white/20 placeholder:text-white/60 focus:bg-white/20 focus:ring-0 w-full sm:w-64 outline-none" placeholder={t("common.enterEmail")} type="email" />
                            <button className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-slate-100 transition-colors">{t("common.subscribe")}</button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-4 py-3 z-50">
                <div className="max-w-md mx-auto flex justify-between items-center">
                    <div className="flex flex-col items-center gap-1 text-primary cursor-pointer">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                        <span className="text-[10px] font-bold uppercase tracking-tight">{t("common.home")}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors cursor-pointer">
                        <span className="material-symbols-outlined">search</span>
                        <span className="text-[10px] font-bold uppercase tracking-tight">{t("common.search")}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors cursor-pointer">
                        <span className="material-symbols-outlined">book_4</span>
                        <span className="text-[10px] font-bold uppercase tracking-tight">{t("common.learning")}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors cursor-pointer">
                        <span className="material-symbols-outlined">person</span>
                        <span className="text-[10px] font-bold uppercase tracking-tight">{t("common.profile")}</span>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default CourseListingPage;
