"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle2,
    Loader2,
    FileText,
    Activity,
    Database,
    Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

type Stage = "Integrity" | "Alignment" | "Variant Calling" | "Security Cleanup";

const STAGES: { id: Stage; label: string; icon: React.ElementType }[] = [
    { id: "Integrity", label: "Integrity Check", icon: FileText },
    { id: "Alignment", label: "Alignment (BWA)", icon: Activity },
    { id: "Variant Calling", label: "Variant Calling (GATK)", icon: Database },
    { id: "Security Cleanup", label: "Security Cleanup", icon: Shield },
];

interface PipelineVisualizerProps {
    onComplete: () => void;
}

export function PipelineVisualizer({ onComplete }: PipelineVisualizerProps) {
    const [currentStageIndex, setCurrentStageIndex] = useState(0);

    useEffect(() => {
        if (currentStageIndex >= STAGES.length) {
            onComplete();
            return;
        }

        const timer = setTimeout(() => {
            setCurrentStageIndex((prev) => prev + 1);
        }, 2000); // 2 seconds per stage

        return () => clearTimeout(timer);
    }, [currentStageIndex, onComplete]);

    return (
        <div className="w-full max-w-3xl mx-auto space-y-8 p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
            <div className="text-center mb-8">
                <h3 className="text-lg font-semibold text-slate-900">Processing Cohort Pipeline</h3>
                <p className="text-sm text-slate-500">Executing Standardized Cancer Genome Pipeline (Nature 2026)</p>
            </div>

            <div className="relative flex justify-between items-center">
                {/* Progress Line Background */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10" />

                {/* Active Progress Line */}
                <motion.div
                    className="absolute top-1/2 left-0 h-1 bg-indigo-600 -z-10"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(currentStageIndex / (STAGES.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />

                {STAGES.map((stage, index) => {
                    const isCompleted = index < currentStageIndex;
                    const isCurrent = index === currentStageIndex;
                    const isPending = index > currentStageIndex;

                    return (
                        <div key={stage.id} className="flex flex-col items-center gap-3">
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isCurrent ? 1.1 : 1,
                                    backgroundColor: isCompleted || isCurrent ? "#4f46e5" : "#f3f4f6", // Indigo-600 or Gray-100
                                    borderColor: isCompleted || isCurrent ? "#4f46e5" : "#e5e7eb",
                                }}
                                className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center border-2 z-10 transition-colors duration-300",
                                    isPending && "bg-white border-gray-200"
                                )}
                            >
                                {isCompleted ? (
                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                ) : isCurrent ? (
                                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                                ) : (
                                    <stage.icon className="w-5 h-5 text-gray-400" />
                                )}
                            </motion.div>

                            <div className="text-center space-y-1">
                                <span className={cn(
                                    "text-xs font-semibold block transition-colors duration-300",
                                    isCurrent || isCompleted ? "text-indigo-900" : "text-gray-400"
                                )}>
                                    {stage.label}
                                </span>
                                {isCurrent && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-[10px] text-indigo-600 font-medium block"
                                    >
                                        Processing...
                                    </motion.span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
