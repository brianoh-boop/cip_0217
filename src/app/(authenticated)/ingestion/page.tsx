"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { DigitalIngestion } from "@/components/ingestion/digital-ingestion";
import { PhysicalIngestion } from "@/components/ingestion/physical-ingestion";
import { Badge } from "@/components/ui/badge";

export default function IngestionPage() {
    const [activeTab, setActiveTab] = useState<"digital" | "physical">("digital");

    return (
        <div className="min-h-screen bg-slate-50 p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Ingestion & Pipeline</h1>
                    <p className="text-slate-500 text-sm mt-1">Securely upload cohorts or request physical specimen pickup.</p>
                </div>
                {/* Nature 2026 Badge */}
                <Badge className="bg-gradient-to-r from-blue-700 to-amber-500 text-white border-0 px-4 py-1.5 shadow-md flex items-center gap-2 w-fit">
                    <span className="font-serif italic font-bold">Nature</span>
                    <span className="text-xs font-medium opacity-90">| Standardized Pipeline 2026</span>
                </Badge>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-white p-1 rounded-lg border border-gray-200 w-fit">
                <button
                    onClick={() => setActiveTab("digital")}
                    className={cn(
                        "px-4 py-2 text-sm font-medium rounded-md transition-all",
                        activeTab === "digital" ? "bg-slate-100 text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                >
                    Digital Cohort (FASTQ/CRAM)
                </button>
                <button
                    onClick={() => setActiveTab("physical")}
                    className={cn(
                        "px-4 py-2 text-sm font-medium rounded-md transition-all",
                        activeTab === "physical" ? "bg-slate-100 text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                >
                    Physical Specimen
                </button>
            </div>

            {/* Content Area */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === "digital" ? <DigitalIngestion /> : <PhysicalIngestion />}
            </div>
        </div>
    );
}
