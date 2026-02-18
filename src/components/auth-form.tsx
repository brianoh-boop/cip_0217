"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FieldValues } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const OCCUPATION_OPTIONS = [
    "Oncologist",
    "Pathologist",
    "Surgeon",
    "Other Clinician",
    "Biotech/Pharma - Drug Discovery",
    "Biotech/Pharma - Clinical Development",
    "Biotech/Pharma - Business Development",
    "Biotech/Pharma - Others",
    "Diagnostic Company",
    "Academic Researcher",
    "Researcher / Bioinformatician",
    "Investor",
    "Others"
];

export function AuthForm() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: FieldValues) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            router.push("/dashboard");
        }, 1500);
    };

    const toggleView = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold text-slate-900">
                            {isLogin ? "Welcome back" : "Create an account"}
                        </h2>
                        <p className="text-sm text-slate-500 mt-2">
                            {isLogin
                                ? "Enter your credentials to access the platform."
                                : "Join the Global Cancer Intelligence Platform."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <AnimatePresence mode="wait">
                            {isLogin ? (
                                <motion.div
                                    key="login"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                        <input
                                            {...register("email", { required: true })}
                                            type="email"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                            placeholder="name@institution.org"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                        <input
                                            {...register("password", { required: true })}
                                            type="password"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="signup"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-700 mb-1">First Name</label>
                                            <input {...register("firstName", { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-700 mb-1">Last Name</label>
                                            <input {...register("lastName", { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Email</label>
                                        <input {...register("email", { required: true })} type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-700 mb-1">Job Title</label>
                                            <input {...register("jobTitle", { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-700 mb-1">Institution</label>
                                            <input {...register("institution", { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Occupation / Industry</label>
                                        <select {...register("occupation", { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                                            <option value="">Select...</option>
                                            {OCCUPATION_OPTIONS.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Research Focus</label>
                                        <textarea
                                            {...register("researchFocus")}
                                            rows={2}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
                                            placeholder="e.g., Genomic instability in gastric cancer..."
                                        />
                                    </div>

                                    <div className="space-y-2 pt-2">
                                        <label className="flex items-start gap-2 cursor-pointer">
                                            <input type="checkbox" {...register("terms", { required: true })} className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                            <span className="text-xs text-slate-500">I agree to the Terms & Conditions and Privacy Policy.</span>
                                        </label>
                                        <label className="flex items-start gap-2 cursor-pointer">
                                            <input type="checkbox" {...register("newsletter")} className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                            <span className="text-xs text-slate-500">Subscribe to Inocras’ monthly newsletter.</span>
                                        </label>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70 mt-6"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? "Log In" : "Create Account"}
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-500">
                            {isLogin ? "New to Inocras? " : "Already have an account? "}
                            <button
                                onClick={toggleView}
                                className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline transition-all"
                            >
                                {isLogin ? "Sign up" : "Log in"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
