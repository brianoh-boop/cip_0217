import { Bell, Activity, Clock, CheckCircle2, Info, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ActivityCenter() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
            {/* Notifications */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                    <Bell className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                </div>
                <div className="space-y-3 flex-1">
                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg flex gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-semibold text-emerald-900">Batch Upload #2402 Completed</p>
                            <p className="text-[10px] text-emerald-700 mt-1">25/25 files ready for analysis.</p>
                        </div>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex gap-3">
                        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-semibold text-blue-900">New Database Update</p>
                            <p className="text-[10px] text-blue-700 mt-1">Nature 2026 citation added to CUBRICS.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ongoing Queries */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-sm font-semibold text-slate-900">Ongoing Queries</h3>
                </div>
                <div className="space-y-4 flex-1">
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium text-slate-700">Stage III vs IV Survival</span>
                            <span className="text-slate-500">Running (78%)</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 rounded-full w-[78%] animate-pulse" />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium text-slate-700">Ingestion: Sample_PK_092</span>
                            <span className="text-slate-500 flex items-center gap-1">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Alignment
                            </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full w-[45%]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* History Log */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <h3 className="text-sm font-semibold text-slate-900">History Log</h3>
                </div>
                <div className="relative pl-4 border-l border-slate-200 space-y-6 flex-1">
                    <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 border-2 border-white" />
                        <p className="text-xs font-medium text-slate-800">Exported VCF Bundle</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">2 hours ago</p>
                    </div>
                    <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 border-2 border-white" />
                        <p className="text-xs font-medium text-slate-800">Modified Filter: 'EGFR Positive'</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Yesterday</p>
                    </div>
                    <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 border-2 border-white" />
                        <p className="text-xs font-medium text-slate-800">Login from New Device</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">3 days ago</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
