"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User, Lock, Mail, Building, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface UserProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
    const router = useRouter();
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordStatus, setPasswordStatus] = useState<"idle" | "success">("idle");

    const handleLogout = () => {
        // Simulate clearing session
        router.push("/");
    };

    const handlePasswordUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordStatus("success");
        setTimeout(() => {
            setPasswordStatus("idle");
            setIsChangingPassword(false);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="fixed top-16 right-8 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-slate-900 px-6 py-6 text-white text-center">
                            <div className="w-16 h-16 mx-auto bg-indigo-500 rounded-full flex items-center justify-center text-2xl font-bold mb-3 shadow-lg">
                                DK
                            </div>
                            <h3 className="text-lg font-bold">Dr. David Kim</h3>
                            <p className="text-indigo-200 text-sm">Oncologist</p>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            {/* User Info */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    <span>david.kim@mskcc.org</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Building className="w-4 h-4 text-slate-400" />
                                    <span>Memorial Sloan Kettering</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-slate-600">
                                    <Briefcase className="w-4 h-4 text-slate-400 mt-0.5" />
                                    <span className="line-clamp-2">Research Focus: Genomic instability in gastric cancer & immunotherapy biomarkers.</span>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Actions */}
                            {!isChangingPassword ? (
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setIsChangingPassword(true)}
                                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors text-sm font-medium"
                                    >
                                        <Lock className="w-4 h-4" />
                                        Change Password
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors text-sm font-medium"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handlePasswordUpdate} className="space-y-3 bg-gray-50 p-4 rounded-lg animate-in slide-in-from-right-4">
                                    <h4 className="text-xs font-bold text-slate-900 uppercase">Update Password</h4>
                                    <input type="password" placeholder="Current Password" className="w-full text-xs px-3 py-2 rounded border border-gray-300" required />
                                    <input type="password" placeholder="New Password" className="w-full text-xs px-3 py-2 rounded border border-gray-300" required />
                                    <div className="flex gap-2 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsChangingPassword(false)}
                                            className="flex-1 text-xs py-1.5 text-slate-500 hover:bg-slate-200 rounded"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 text-xs py-1.5 bg-slate-900 text-white rounded hover:bg-slate-800"
                                        >
                                            {passwordStatus === "success" ? "Updated!" : "Update"}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
