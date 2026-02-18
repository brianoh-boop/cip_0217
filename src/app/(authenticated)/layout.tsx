"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { UserProfileModal } from "@/components/user-profile-modal";

export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <div className="flex bg-white min-h-screen relative">
            <Sidebar />

            {/* Global User Avatar */}
            <div className="fixed top-4 right-6 z-50">
                <button
                    onClick={() => setIsProfileOpen(true)}
                    className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold text-sm hover:ring-4 hover:ring-slate-100 transition-all shadow-md"
                >
                    DK
                </button>
            </div>

            <UserProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

            <main className="flex-1 overflow-y-auto p-8 bg-white pt-20">
                {children}
            </main>
        </div>
    );
}
