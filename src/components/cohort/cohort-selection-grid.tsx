"use client";

import { Users, Database, Globe, Share2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CohortCardProps {
    title: string;
    source: string;
    count: string;
    description: string;
    icon: any;
    isActive?: boolean;
    isVerified?: boolean;
    onClick: () => void;
    color: string;
}

function CohortCard({ title, source, count, description, icon: Icon, isActive, isVerified, onClick, color }: CohortCardProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "relative p-6 rounded-2xl border transition-all cursor-pointer hover:shadow-lg group",
                isActive ? "bg-white border-indigo-600 shadow-md ring-1 ring-indigo-600" : "bg-white border-gray-200 hover:border-indigo-300"
            )}
        >
            <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-xl", color)}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                {isVerified && (
                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 transition-colors">
                        Nature 2025 Certified
                    </Badge>
                )}
            </div>

            <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{source}</p>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">{title}</h3>
            </div>

            <div className="mt-4 flex items-end justify-between">
                <div>
                    <span className="text-2xl font-bold text-slate-900">{count}</span>
                    <span className="text-sm text-slate-500 ml-1">cases</span>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}

interface CohortSelectionGridProps {
    onSelect: (cohortId: string) => void;
}

export function CohortSelectionGrid({ onSelect }: CohortSelectionGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <CohortCard
                title="CUBRICS Nature 2025"
                source="CUBRICS Initiative"
                count="12,450"
                description="Verified Whole Genome Sequencing data from the Pan-Cancer Analysis of Whole Genomes (PCAWG) consortium update."
                icon={Database}
                color="bg-indigo-600"
                isVerified={true}
                onClick={() => onSelect("cubrics")}
            />
            <CohortCard
                title="TCGA WGS Benchmark"
                source="GDC Portal"
                count="33,000"
                description="Standardized reference dataset from The Cancer Genome Atlas across 33 tumor types."
                icon={Globe}
                color="bg-slate-700"
                onClick={() => onSelect("tcga")}
            />
            <CohortCard
                title="My Active Cohort"
                source="Local Upload"
                count="128"
                description="Currently active workspace data including recently ingested FASTQ/BAM samples."
                icon={Users}
                color="bg-emerald-500"
                isActive={true}
                onClick={() => onSelect("active")}
            />
            <CohortCard
                title="Shared Projects"
                source="Collaborators"
                count="4"
                description="Cohorts shared by Dr. K. Lee (SNU) and Dr. J. Smith (MSKCC) for validation studies."
                icon={Share2}
                color="bg-violet-500"
                onClick={() => onSelect("shared")}
            />
        </div>
    );
}
