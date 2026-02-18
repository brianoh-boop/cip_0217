"use client";

import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Message {
    role: "user" | "ai";
    content: string;
    isThinking?: boolean;
}

interface ChatInterfaceProps {
    onScenarioTrigger: () => void;
}

export function ChatInterface({ onScenarioTrigger }: ChatInterfaceProps) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { role: "ai", content: "Hello Dr. Smith. I have analyzed your 1,250 patient cohort. How can I assist with your survival analysis today?" }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

        // Start Thinking Process
        setIsTyping(true);

        if (userMessage.toLowerCase().includes("survival") || userMessage.toLowerCase().includes("stage")) {
            // Step 1: Thinking
            setTimeout(() => {
                setMessages(prev => [...prev, { role: "ai", content: "Thinking: Identifying Cohort Groups (Stage III vs IV)...", isThinking: true }]);
            }, 500);

            // Step 2: Decision
            setTimeout(() => {
                setMessages(prev => {
                    const newMsgs = [...prev];
                    newMsgs.pop(); // Remove previous thinking step
                    return [...newMsgs, { role: "ai", content: "Thinking: Selecting Statistical Method (Log-rank Test)...", isThinking: true }];
                });
            }, 1500);

            // Step 3: Final Response
            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => {
                    const newMsgs = [...prev];
                    newMsgs.pop(); // Remove thinking
                    return [...newMsgs, { role: "ai", content: "I have identified the groups. Running a Kaplan-Meier survival analysis with Log-rank test to compare Stage III and IV outcomes." }];
                });
                onScenarioTrigger(); // Trigger notebook animation
            }, 2500);
        } else {
            setTimeout(() => {
                setIsTyping(false);
                setMessages((prev) => [
                    ...prev,
                    { role: "ai", content: "I can help with survival analysis, biomarker correlation, and cohort stratification. Please ask about 'survival' or 'stages'." }
                ]);
            }, 1000);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                            "flex gap-3 max-w-[85%]",
                            msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                        )}
                    >
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                            msg.role === "user" ? "bg-slate-200" : "bg-indigo-100 text-indigo-600"
                        )}>
                            {msg.role === "user" ? <User className="w-4 h-4 text-slate-600" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className={cn(
                            "p-3 rounded-lg text-sm leading-relaxed",
                            msg.role === "user"
                                ? "bg-slate-900 text-white rounded-tr-none"
                                : "bg-gray-100 text-slate-800 rounded-tl-none"
                        )}>
                            <div className={cn(
                                "flex items-center gap-2",
                                msg.isThinking ? "text-slate-500 italic text-xs" : ""
                            )}>
                                {msg.isThinking && <Loader2 className="w-3 h-3 animate-spin" />}
                                {msg.content}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <div className="flex gap-3 mr-auto max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                            <Bot className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 space-y-3">
                {/* Suggested Chips */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                    <button
                        onClick={() => setInput("Analyze HRD Score")}
                        className="whitespace-nowrap px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full border border-indigo-100 hover:bg-indigo-100 transition-colors"
                    >
                        Analyze HRD Score
                    </button>
                    <button
                        onClick={() => setInput("Compare Survival Stage III vs IV")}
                        className="whitespace-nowrap px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full border border-indigo-100 hover:bg-indigo-100 transition-colors"
                    >
                        Compare Survival
                    </button>
                    <button
                        onClick={() => setInput("Stratify by Mutation")}
                        className="whitespace-nowrap px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full border border-indigo-100 hover:bg-indigo-100 transition-colors"
                    >
                        Stratify by Mutation
                    </button>
                </div>

                <form onSubmit={handleSend} className="relative">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask AI Copilot to analyze cohort..."
                        className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-md disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
                <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-400 justify-center">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    <span>AI outputs can be misleading. Verify with clinical data.</span>
                </div>
            </div>
        </div>
    );
}
