"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileText, CheckCircle2, Shield, Loader2, AlertTriangle, File } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { QCModal } from "./qc-modal";

export function DigitalIngestion() {
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [showTCModal, setShowTCModal] = useState(true);
    const [files, setFiles] = useState<File[]>([]);
    const [metadata, setMetadata] = useState({ age: "", sex: "", cancerType: "" });
    const [uploadState, setUploadState] = useState<"idle" | "sampling" | "uploading" | "processing" | "complete">("idle");
    const [qcFailed, setQcFailed] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showDeletionToast, setShowDeletionToast] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files) {
            setFiles(Array.from(e.dataTransfer.files));
        }
    };

    const startUpload = () => {
        if (files.length > 10) {
            // Random Sampling Logic
            setUploadState("sampling");
            setTimeout(() => {
                // Check for mock failure condition
                const hasFailFile = files.some(f => f.name.toLowerCase().includes("fail"));
                if (hasFailFile) {
                    setQcFailed(true);
                    setUploadState("idle");
                } else {
                    setUploadState("uploading");
                    simulateProgress();
                }
            }, 2000);
        } else {
            // Single/Small batch direct upload
            setUploadState("uploading");
            simulateProgress();
        }
    };

    const simulateProgress = () => {
        let p = 0;
        const interval = setInterval(() => {
            p += 5;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setUploadState("processing");
                setTimeout(() => {
                    setUploadState("complete");
                    setShowDeletionToast(true);
                    setTimeout(() => setShowDeletionToast(false), 4000);
                }, 2000);
            }
        }, 100);
    };

    const reset = () => {
        setFiles([]);
        setUploadState("idle");
        setQcFailed(false);
        setProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="space-y-6 relative">
            {/* T&C Modal */}
            <AnimatePresence>
                {!agreedToTerms && showTCModal && (
                    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6"
                        >
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Terms & Data Responsibility</h2>
                            <div className="prose prose-sm text-slate-600 mb-6 bg-slate-50 p-4 rounded-lg border border-gray-100">
                                <ul className="list-disc pl-4 space-y-2">
                                    <li>Metadata and VCF results will be used for the Initiative&apos;s follow-up analysis.</li>
                                    <li>Uploaded FASTQ/CRAM files are strictly <strong>deleted</strong> after processing pipeline completion.</li>
                                    <li>You are responsible for obtaining necessary IRB approval when submitting additional medical data.</li>
                                </ul>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button onClick={() => setAgreedToTerms(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
                                    I Agree
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* QC Failing Modal */}
            <QCModal isOpen={qcFailed} onReset={reset} />

            {/* Main UI */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Upload Zone */}
                <div className="lg:col-span-2 space-y-6">
                    <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        className={cn(
                            "border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer",
                            files.length > 0 ? "border-indigo-200 bg-indigo-50/50" : "border-gray-300 hover:border-indigo-400 hover:bg-slate-50"
                        )}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />

                        {files.length === 0 ? (
                            <>
                                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <UploadCloud className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">Upload Patient Cohort</h3>
                                <p className="text-sm text-slate-500 mt-2">Drag & drop FASTQ/CRAM pairs or click to browse</p>
                                <p className="text-xs text-slate-400 mt-4">Support for Tumor-Normal Pairs (e.g., Sample_01_T.fastq / Sample_01_N.cram)</p>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                    <File className="w-6 h-6" />
                                </div>
                                <div className="text-slate-900 font-medium">
                                    {files.length} files selected
                                </div>
                                {files.length > 10 && (
                                    <div className="text-xs text-amber-600 bg-amber-50 inline-block px-3 py-1 rounded-full border border-amber-200">
                                        Batch size {">"} 10: Random Sampling QC will be applied
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Upload Progress / States */}
                    {uploadState !== "idle" && (
                        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
                            {uploadState === "sampling" && (
                                <div className="flex items-center gap-3 text-indigo-600">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span className="font-medium">Verifying Cohort Integrity (Random Sampling)...</span>
                                </div>
                            )}

                            {uploadState === "uploading" && (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span>Uploading Batch...</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${progress}%` }} />
                                    </div>
                                </div>
                            )}

                            {uploadState === "processing" && (
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-center gap-1 opacity-50">
                                        <FileText className="w-5 h-5" />
                                        <span className="text-[10px]">Integrity</span>
                                    </div>
                                    <div className="h-px bg-gray-300 w-8" />
                                    <div className="flex flex-col items-center gap-1 text-indigo-600 animate-pulse">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-indigo-400 rounded-full animate-ping opacity-20" />
                                            <AlertTriangle className="w-5 h-5 relative z-10" />
                                        </div>
                                        <span className="text-[10px] font-bold">Alignment</span>
                                    </div>
                                    <div className="h-px bg-gray-300 w-8" />
                                    <div className="flex flex-col items-center gap-1 opacity-50">
                                        <Shield className="w-5 h-5" />
                                        <span className="text-[10px]">Security</span>
                                    </div>
                                </div>
                            )}

                            {uploadState === "complete" && (
                                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span className="font-medium text-sm">Analysis Complete. VCF Bundle Ready.</span>
                                    <button className="ml-auto text-xs underline hover:text-emerald-800">Download Results</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right: Metadata Form */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 h-fit">
                    <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-500" />
                        Cohort Metadata
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">Cancer Type</label>
                            <select className="w-full text-sm border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <option>Gastric Cancer</option>
                                <option>Lung Adenocarcinoma</option>
                                <option>Colorectal Cancer</option>
                                <option>Breast Cancer</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Sex</label>
                                <select className="w-full text-sm border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Avg Age</label>
                                <input type="number" className="w-full text-sm border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="e.g. 62" />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                                + Link OMOP-CDM Medical Record
                            </button>
                        </div>

                        <button
                            disabled={files.length === 0 || uploadState !== "idle"}
                            onClick={startUpload}
                            className="w-full py-2.5 bg-slate-900 text-white rounded-lg font-medium text-sm hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {uploadState === "idle" ? "Start Analysis Pipeline" : "Processing..."}
                        </button>
                    </div>
                </div>
            </div>

            {/* Security Toast */}
            <AnimatePresence>
                {showDeletionToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 z-50 capitalize"
                    >
                        <Shield className="w-4 h-4 text-emerald-400" />
                        <div className="text-sm">
                            <span className="font-semibold block">Security Protocol Active</span>
                            <span className="text-slate-300 text-xs">Raw FASTQ files deleted. VCFs preserved.</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
