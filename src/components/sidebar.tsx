"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Dna,
    Users,
    Settings,
    LogOut,
    ChevronLeft
} from "lucide-react";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Ingestion Pipeline", href: "/ingestion", icon: Dna },
    { label: "Cohort Studio", href: "/cohort", icon: Users },
    { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen bg-gray-50 border-r border-gray-200 flex flex-col font-sans">
            {/* Header */}
            <div className="h-14 flex items-center px-4 border-b border-gray-200">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                    <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center text-white text-xs">
                        C
                    </div>
                    <span>Cancer Platform</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                                isActive
                                    ? "bg-gray-200 text-slate-900 font-medium"
                                    : "text-slate-500 hover:bg-gray-100 hover:text-slate-900"
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
                <button className="flex items-center gap-3 px-3 py-2 text-sm text-slate-500 hover:text-slate-900 w-full rounded-md hover:bg-gray-100 transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
