"use client";

import { CheckCircle2, Circle, Truck, Package, Microscope, FileText, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
    { id: 1, label: "Kit Sent", date: "Feb 10", icon: Package, status: "completed" },
    { id: 2, label: "Received", date: "Feb 12", icon: Truck, status: "completed" },
    { id: 3, label: "Sequencing", date: "Feb 15", icon: Microscope, status: "active" },
    { id: 4, label: "Pipeline", date: "Est. Feb 18", icon: FileText, status: "pending" },
    { id: 5, label: "Email Alert", date: "-", icon: Mail, status: "pending" },
];

export function SpecimenTracker() {
    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <Microscope className="w-5 h-5 text-indigo-600" />
                Specimen Tracking: #KIT-2024-8892
            </h3>

            <div className="relative flex justify-between">
                {/* Progress Bar Background */}
                <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 -z-10" />

                {/* Active Progress Bar */}
                <div className="absolute top-5 left-0 h-1 bg-indigo-600 -z-10 w-[50%]" />

                {STEPS.map((step) => {
                    const isCompleted = step.status === "completed";
                    const isActive = step.status === "active";

                    return (
                        <div key={step.id} className="flex flex-col items-center gap-3 bg-white px-2">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300",
                                    isCompleted ? "bg-indigo-600 border-indigo-600 text-white" :
                                        isActive ? "bg-white border-indigo-600 text-indigo-600 ring-4 ring-indigo-50" :
                                            "bg-white border-gray-200 text-gray-300"
                                )}
                            >
                                <step.icon className="w-5 h-5" />
                            </div>

                            <div className="text-center">
                                <span className={cn(
                                    "text-xs font-semibold block",
                                    isActive || isCompleted ? "text-slate-900" : "text-gray-400"
                                )}>
                                    {step.label}
                                </span>
                                <span className="text-[10px] text-slate-500 font-medium block mt-1">
                                    {step.date}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-100 rounded-md flex items-start gap-3">
                <div className="p-1 bg-yellow-100 rounded text-yellow-700 mt-0.5">
                    <FileText className="w-4 h-4" />
                </div>
                <div>
                    <h4 className="text-sm font-medium text-yellow-800">CLIA Report Disclaimer</h4>
                    <p className="text-xs text-yellow-700 mt-1">
                        This tracking information is for research use only. Final clinical reports require HCP prescription and adhering to CLIA regulations.
                    </p>
                </div>
            </div>
        </div>
    );
}
