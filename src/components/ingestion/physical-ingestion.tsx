"use client";

import { useState } from "react";
import { Truck, MapPin, Calendar, ClipboardCheck, Info, Package, TestTube, Microscope, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export function PhysicalIngestion() {
    const [trackingId, setTrackingId] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate ID generation
        const newId = `SP-2026-KR-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
        setTrackingId(newId);
    };

    return (
        <div className="space-y-6">
            {/* CLIA Disclaimer (Info Alert) */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                    <h4 className="text-sm font-semibold text-amber-900">CLIA Laboratory Disclaimer</h4>
                    <p className="text-xs text-amber-800 mt-1">
                        Analysis performed at certified CLIA Lab facilities.
                        For a formal clinical diagnostic report, a valid prescription by healthcare professionals is required.
                        Please contact the Lab Manager(lab@inocras.com) for requisition forms.
                    </p>
                </div>
            </div>

            {/* Forms */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                        <Package className="w-5 h-5 text-indigo-600" />
                        <h3 className="font-semibold text-slate-900">Specimen Kit Request</h3>
                    </div>
                    {!trackingId ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Shipping Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                    <input required className="w-full pl-9 text-sm border-gray-300 rounded-lg" placeholder="e.g. 123 Medical Center Blvd, Suite 400" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Recipient Name</label>
                                    <input required className="w-full text-sm border-gray-300 rounded-lg" placeholder="Dr. Smith" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Contact Number</label>
                                    <input required className="w-full text-sm border-gray-300 rounded-lg" placeholder="+1 (555) 000-0000" />
                                </div>
                            </div>
                            <div className="pt-4">
                                <button type="submit" className="w-full py-2 bg-slate-900 text-white font-medium text-sm rounded-lg hover:bg-slate-800 transition-colors">
                                    Request Kit Delivery
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ClipboardCheck className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Kit Request Confirmed</h3>
                            <p className="text-sm text-slate-500 mt-1">Tracking ID:</p>
                            <p className="text-2xl font-mono font-bold text-indigo-600 mt-2 bg-indigo-50 inline-block px-4 py-1 rounded-lg border border-indigo-100">
                                {trackingId}
                            </p>
                        </div>
                    )}
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                        <TestTube className="w-5 h-5 text-rose-500" />
                        <h3 className="font-semibold text-slate-900">Specimen Metadata</h3>
                    </div>
                    <div className="space-y-4 opacity-75">
                        {/* Simplified Metadata Form for visual context */}
                        <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">Cancer Type</label>
                            <select className="w-full text-sm border-gray-300 rounded-lg bg-gray-50">
                                <option>Gastric Cancer</option>
                                <option>Lung Adenocarcinoma</option>
                                <option>Colorectal Cancer</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Sex</label>
                                <select className="w-full text-sm border-gray-300 rounded-lg bg-gray-50">
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Age at Diagnosis</label>
                                <input type="number" className="w-full text-sm border-gray-300 rounded-lg" placeholder="e.g. 62" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Source</label>
                                <select className="w-full text-sm border-gray-300 rounded-lg bg-gray-50">
                                    <option>Biopsy (FFPE)</option>
                                    <option>Fresh Frozen</option>
                                    <option>Blood (PBMC)</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-blue-50 text-blue-800 text-xs rounded border border-blue-100">
                            OMOP-CDM Linkage Pending Pickup Verification.
                        </div>
                    </div>
                </div>
            </div>

            {/* Tracking Progress Bar */}
            {trackingId && (
                <div className="bg-white p-8 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-slate-900 mb-8 border-b border-gray-100 pb-4">Live Status: {trackingId}</h3>

                    <div className="relative">
                        {/* Line */}
                        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-100 -z-0">
                            <div className="h-full bg-emerald-500 w-[20%]" />
                        </div>

                        <div className="grid grid-cols-5 gap-4 relative z-10">
                            {/* Step 1 */}
                            <div className="text-center">
                                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mx-auto text-white shadow-md ring-4 ring-white">
                                    <Truck className="w-5 h-5" />
                                </div>
                                <p className="text-xs font-bold text-slate-900 mt-3">Pickup Scheduled</p>
                                <p className="text-[10px] text-slate-500">Feb 20 (Est)</p>
                            </div>
                            {/* Step 2 */}
                            <div className="text-center opacity-50">
                                <div className="w-10 h-10 bg-white border-2 border-slate-300 rounded-full flex items-center justify-center mx-auto text-slate-400">
                                    <Package className="w-5 h-5" />
                                </div>
                                <p className="text-xs font-bold text-slate-900 mt-3">Received</p>
                            </div>
                            {/* Step 3 */}
                            <div className="text-center opacity-50">
                                <div className="w-10 h-10 bg-white border-2 border-slate-300 rounded-full flex items-center justify-center mx-auto text-slate-400">
                                    <Microscope className="w-5 h-5" />
                                </div>
                                <p className="text-xs font-bold text-slate-900 mt-3">Sequencing</p>
                            </div>
                            {/* Step 4 */}
                            <div className="text-center opacity-50">
                                <div className="w-10 h-10 bg-white border-2 border-slate-300 rounded-full flex items-center justify-center mx-auto text-slate-400">
                                    <ClipboardCheck className="w-5 h-5" />
                                </div>
                                <p className="text-xs font-bold text-slate-900 mt-3">Pipeline Analysis</p>
                            </div>
                            {/* Step 5 */}
                            <div className="text-center opacity-50">
                                <div className="w-10 h-10 bg-white border-2 border-slate-300 rounded-full flex items-center justify-center mx-auto text-slate-400">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <p className="text-xs font-bold text-slate-900 mt-3">Email Alert</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
