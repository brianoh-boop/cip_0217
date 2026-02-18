"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QCAlertProps {
    isOpen: boolean;
    onClose: () => void;
    failedFile: string;
}

export function QCAlert({ isOpen, onClose, failedFile }: QCAlertProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden"
                    >
                        <div className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-red-100 rounded-full">
                                    <AlertCircle className="w-6 h-6 text-red-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                                        Batch QC Failed
                                    </h3>
                                    <p className="text-sm text-slate-500 mb-4">
                                        Random sampling quality control detected issues. Upload has been halted to prevent data contamination.
                                    </p>

                                    <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                                        <p className="text-xs font-bold text-red-800 mb-1 uppercase tracking-wider">QC Failure Detected</p>
                                        <div className="flex items-center justify-between">
                                            <code className="text-sm text-red-700 font-mono font-bold">{failedFile}</code>
                                            <Badge variant="destructive" className="animate-pulse">CRITICAL FAIL</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-red-100">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 rounded-md transition-colors"
                                >
                                    Reset Upload
                                </button>
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors shadow-sm"
                                >
                                    View QC Report
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
