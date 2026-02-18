"use client";

import { AlertCircle, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QCModalProps {
    isOpen: boolean;
    onReset: () => void;
    fileName?: string;
}

export function QCModal({ isOpen, onReset, fileName = "sample_04.fastq" }: QCModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-red-900/20 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-2xl border-2 border-red-100 z-50 overflow-hidden"
                    >
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <AlertCircle className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Batch QC Failed</h3>
                            <p className="text-slate-600 mb-6">
                                Random sampling detected low quality reads in <span className="font-mono font-bold text-red-600 bg-red-50 px-1 rounded">{fileName}</span>.
                                <br />
                                The entire batch upload has been halted to preserve data integrity.
                            </p>

                            <button
                                onClick={onReset}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset Upload
                            </button>
                        </div>
                        <div className="bg-red-50 px-6 py-3 text-xs text-red-600 text-center border-t border-red-100">
                            Error Code: LOW_Q_SCORE_THRESHOLD_20
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
