"use client";

import { useCallback, useState } from "react";
import { Upload, X, File as FileIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { QCAlert } from "./qc-alert";

interface UploadZoneProps {
    onUploadComplete: () => void;
}

export function UploadZone({ onUploadComplete }: UploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [showQCAlert, setShowQCAlert] = useState(false);
    const [failedFile, setFailedFile] = useState<string>("");

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const processFiles = useCallback((uploadedFiles: File[]) => {
        setFiles(prev => [...prev, ...uploadedFiles]);

        // Check for "fail" in filename
        const failure = uploadedFiles.find(f => f.name.toLowerCase().includes("fail"));

        if (failure) {
            setFailedFile(failure.name);
            setShowQCAlert(true);
        } else {
            // Simulate random sampling delay then proceed
            setTimeout(() => {
                onUploadComplete();
            }, 1500);
        }
    }, [onUploadComplete]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        processFiles(droppedFiles);
    }, [processFiles]);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            processFiles(selectedFiles);
        }
    }, [processFiles]);

    return (
        <>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                    "w-full max-w-3xl mx-auto h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors cursor-pointer",
                    isDragging
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                )}
            >
                <div className="flex flex-col items-center gap-4 text-center p-6">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                        <Upload className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                            Upload Cohort Sequence Data
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                            Drag & drop FASTQ files here, or click to select
                        </p>
                    </div>
                    <p className="text-xs text-slate-400">
                        Supports .fastq, .fastq.gz (Min 10 files for batch processing)
                    </p>
                    <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileInput}
                        id="file-upload"
                    />
                    <label
                        htmlFor="file-upload"
                        className="mt-2 text-indigo-600 font-medium hover:text-indigo-800 cursor-pointer"
                    >
                        Browse Files
                    </label>
                </div>
            </div>

            {files.length > 0 && (
                <div className="w-full max-w-3xl mx-auto mt-6 space-y-2">
                    <h4 className="text-sm font-medium text-slate-900">Files queued for QC ({files.length})</h4>
                    <div className="max-h-32 overflow-y-auto border border-gray-200 rounded-md bg-white">
                        {files.map((file, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 border-b border-gray-100 last:border-0 text-sm">
                                <FileIcon className="w-4 h-4 text-slate-400" />
                                <span className="text-slate-700 truncate">{file.name}</span>
                                <span className="text-slate-400 text-xs ml-auto">
                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <QCAlert
                isOpen={showQCAlert}
                onClose={() => {
                    setShowQCAlert(false);
                    setFiles([]); // Reset on failure
                }}
                failedFile={failedFile}
            />
        </>
    );
}
