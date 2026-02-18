"use client";

import { useForm } from "react-hook-form";

export function MetadataForm() {
    const { register } = useForm();

    return (
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="col-span-2">
                <h4 className="text-sm font-semibold text-slate-900 mb-2">Cohort Metadata (OMOP-CDM)</h4>
            </div>
            <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Age Range</label>
                <select {...register("age")} className="w-full text-sm border-gray-300 rounded-md">
                    <option>18-30</option>
                    <option>30-50</option>
                    <option>50-70</option>
                    <option>70+</option>
                </select>
            </div>
            <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Sex</label>
                <select {...register("sex")} className="w-full text-sm border-gray-300 rounded-md">
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </div>
            <div className="col-span-2">
                <label className="block text-xs font-medium text-slate-500 mb-1">Primary Diagnosis</label>
                <input {...register("diagnosis")} placeholder="e.g., Gastric Adenocarcinoma" className="w-full text-sm border-gray-300 rounded-md" />
            </div>
        </div>
    );
}
