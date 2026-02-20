import { useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useAuth } from "../lib/AuthContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [paid, setPaid] = useState(false);
    const { t } = useTranslation();

    const handleApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            setPaid(true);
            setTimeout(() => {
                navigate("/");
            }, 3000);
        });
    };

    if (paid) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center py-12 px-8 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-emerald-100 dark:border-emerald-900/30">
                    <div className="size-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                        <span className="material-symbols-outlined text-white text-4xl">check_circle</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-2 text-emerald-600 dark:text-emerald-400">{t("checkout.successTitle")}</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">
                        {t("checkout.successDesc")}
                    </p>
                    <div className="w-12 h-1 bg-emerald-100 dark:bg-emerald-900/30 mx-auto rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 animate-[loading_3s_linear]"></div>
                    </div>
                    <style>{`
                        @keyframes loading {
                            from { width: 0%; }
                            to { width: 100%; }
                        }
                    `}</style>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased min-h-screen">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-xl mx-auto flex items-center justify-between px-4 py-3">
                    <button
                        onClick={() => navigate("/plans")}
                        className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        <span className="text-sm font-medium hidden xs:block">{t("plans.overview")}</span>
                    </button>
                    <div className="flex items-center gap-2">
                        <LanguageSwitcher />
                        {user && (
                            <div
                                onClick={() => navigate("/profile")}
                                className="size-8 rounded-full overflow-hidden border border-primary/20 cursor-pointer"
                            >
                                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="max-w-xl mx-auto px-4 py-8">
                {/* Title Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-2">{t("checkout.title")}</h1>
                    <p className="text-slate-500 dark:text-slate-400">{t("checkout.desc")}</p>
                </div>

                {/* Order Summary Card */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-8">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="size-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-3xl">rocket_launch</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{t("checkout.proPlan")}</h3>
                                    <p className="text-sm text-slate-500">{t("checkout.infraAccess")}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl font-bold text-primary">$299</span>
                                <span className="text-sm text-slate-500">/mo</span>
                            </div>
                        </div>
                        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">{t("checkout.cycle")}</span>
                                <span className="font-medium">{t("checkout.monthly")}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">{t("checkout.fee")}</span>
                                <span className="font-medium text-emerald-600 dark:text-emerald-400">{t("checkout.waived")}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-2 border-t border-dashed border-slate-200 dark:border-slate-700">
                                <span>{t("checkout.totalDue")}</span>
                                <span>$299.00</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary">payments</span>
                        <h2 className="text-lg font-bold">{t("checkout.payment")}</h2>
                    </div>

                    <div className="relative z-0">
                        <PayPalButtons
                            style={{ layout: "vertical", shape: "rect", label: "pay" }}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: "299.00",
                                            },
                                            description: "AI City Builders Pro Plan",
                                        },
                                    ],
                                });
                            }}
                            onApprove={handleApprove}
                        />
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-col items-center gap-4 py-4 mt-4 bg-slate-100/50 dark:bg-slate-800/30 rounded-xl">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined text-sm">verified_user</span>
                            <span className="text-xs font-medium uppercase tracking-wider">{t("checkout.secureInfo")}</span>
                        </div>
                        <div className="flex items-center gap-6 opacity-60">
                            <img src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg" alt="Cards" className="h-8 rounded" />
                        </div>
                    </div>

                    <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 mt-4 leading-relaxed uppercase tracking-tighter">
                        {t("checkout.terms")}
                    </p>
                </div>

                {/* Footer Visual */}
                <div className="mt-12 opacity-20">
                    <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
                    <div className="flex justify-center mt-4">
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-slate-400">{t("checkout.verifiedNode")}</span>
                    </div>
                </div>
            </main>

            {/* Visual decoration */}
            <div className="fixed top-0 right-0 -z-10 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px]"></div>
            <div className="fixed bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]"></div>
        </div>
    );
};

export default CheckoutPage;
