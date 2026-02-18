import { FileText, Database, Activity, Search, Clock } from "lucide-react";

const ACTIVITIES = [
    {
        id: 1,
        action: "Batch Upload #2024-02-15",
        details: "Uploaded 45 Gastric Cancer FASTQ files",
        time: "2 hours ago",
        icon: FileText,
        type: "upload"
    },
    {
        id: 2,
        action: "Pipeline Completion",
        details: "Variant Calling finished for Cohort A",
        time: "5 hours ago",
        icon: Activity,
        type: "system"
    },
    {
        id: 3,
        action: "Cohort Query",
        details: "Filtered for 'Stage III' & 'HRD High'",
        time: "1 day ago",
        icon: Search,
        type: "query"
    },
    {
        id: 4,
        action: "Data Export",
        details: "Downloaded VCF Bundle (1.2GB)",
        time: "2 days ago",
        icon: Database,
        type: "export"
    },
];

export function RecentActivity() {
    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-slate-900">Recent Activity</h3>
                <Clock className="w-4 h-4 text-slate-400" />
            </div>
            <div className="space-y-6">
                {ACTIVITIES.map((activity) => (
                    <div key={activity.id} className="flex gap-4">
                        <div className="mt-1">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                <activity.icon className="w-4 h-4 text-slate-600" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{activity.details}</p>
                            <p className="text-[10px] text-slate-400 mt-1">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
