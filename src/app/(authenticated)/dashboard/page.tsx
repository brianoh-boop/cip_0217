"use client";

import { Activity, Users, Database, ArrowUpRight } from "lucide-react";
import { MetricsCard } from "@/components/dashboard/metrics-card";
import { CancerTypeChart } from "@/components/dashboard/cancer-type-chart";
import { GenderChart } from "@/components/dashboard/gender-chart";
import { AgeChart } from "@/components/dashboard/age-chart";
import { ActivityCenter } from "@/components/dashboard/activity-center";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-slate-50 p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Researcher Dashboard</h1>
                    <p className="text-slate-500 text-sm mt-1">Situational awareness of your genomic cohort and analysis pipeline.</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-slate-400 font-mono">LAST SYNC</p>
                    <p className="text-sm font-medium text-slate-700">Just now</p>
                </div>
            </div>

            {/* Section A: Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MetricsCard
                    label="Active Pipeline"
                    value="12"
                    icon={Activity}
                    description="Samples analyzing..."
                    trend="Running"
                    trendUp={true}
                    className="border-l-4 border-l-emerald-500"
                />
                <MetricsCard
                    label="Total Cases"
                    value="1,250"
                    icon={Users}
                    trend="+25 this week"
                    trendUp={true}
                />
            </div>

            {/* Section B: Cohort Demographics (Bento Grid) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
                {/* Cancer Type (Bar) */}
                <div className="lg:col-span-1 h-full">
                    <CancerTypeChart />
                </div>

                {/* Gender (Donut) */}
                <div className="lg:col-span-1 h-full">
                    <GenderChart />
                </div>

                {/* Age (Area) */}
                <div className="lg:col-span-1 h-full">
                    <AgeChart />
                </div>
            </div>

            {/* Section C: Activity Center */}
            <div className="h-[350px]">
                <ActivityCenter />
            </div>
        </div>
    );
}
