import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    trend?: string;
    trendUp?: boolean;
    className?: string;
}

export function MetricsCard({ label, value, icon: Icon, description, trend, trendUp, className }: MetricsCardProps) {
    return (
        <div className={cn("p-6 bg-white rounded-lg border border-gray-200 shadow-sm", className)}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">{label}</p>
                    <div className="mt-2">
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-slate-900">{value}</span>
                            {trend && (
                                <span className={cn("text-xs font-medium", trendUp ? "text-emerald-600" : "text-red-600")}>
                                    {trend}
                                </span>
                            )}
                        </div>
                        {description && (
                            <p className="text-xs text-slate-400 mt-1">{description}</p>
                        )}
                    </div>
                </div>
                <div className="p-3 bg-indigo-50 rounded-full">
                    <Icon className="w-6 h-6 text-indigo-600" />
                </div>
            </div>
        </div>
    );
}
