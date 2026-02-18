"use client";

import { useState } from "react";
import { ChatInterface } from "@/components/cohort/chat-interface";
import { NotebookPanel } from "@/components/cohort/notebook-panel";
import { CohortSelectionGrid } from "@/components/cohort/cohort-selection-grid";
import { ArrowLeft } from "lucide-react";

export default function CohortPage() {
    const [viewMode, setViewMode] = useState<"dashboard" | "analysis">("dashboard");
    const [isRunning, setIsRunning] = useState(false);

    const handleScenarioTrigger = () => {
        setIsRunning(true);
    };

    const handleRunComplete = () => {
        setIsRunning(false);
    };

    const handleCohortSelect = (id: string) => {
        setViewMode("analysis");
    };

    return (
        <div className="h-[calc(100vh-theme(spacing.20))] flex flex-col">
            {/* Header / Navigation */}
            <div className="flex items-center justify-between mb-4 shrink-0">
                <div className="flex items-center gap-3">
                    {viewMode === "analysis" && (
                        <button
                            onClick={() => setViewMode("dashboard")}
                            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-slate-500" />
                        </button>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Cohort Studio</h1>
                        <p className="text-slate-500 text-sm">
                            {viewMode === "dashboard" ? "Select a cohort to begin analysis" : "AI-Assisted Comparative Analysis"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-h-0 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                {viewMode === "dashboard" ? (
                    <div className="h-full overflow-y-auto p-8 bg-slate-50/50">
                        <CohortSelectionGrid onSelect={handleCohortSelect} />
                    </div>
                ) : (
                    <div className="flex h-full">
                        {/* Left Panel: Chat (40%) */}
                        <div className="w-[40%] border-r border-gray-200 h-full">
                            <ChatInterface onScenarioTrigger={handleScenarioTrigger} />
                        </div>

                        {/* Right Panel: Notebook (60%) */}
                        <div className="w-[60%] h-full">
                            <NotebookPanel
                                isRunning={isRunning}
                                onRunComplete={handleRunComplete}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
