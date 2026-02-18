"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DATA = [
    { time: 0, stage3: 1.0, stage4: 1.0 },
    { time: 10, stage3: 0.95, stage4: 0.85 },
    { time: 20, stage3: 0.90, stage4: 0.70 },
    { time: 30, stage3: 0.82, stage4: 0.55 },
    { time: 40, stage3: 0.75, stage4: 0.40 },
    { time: 50, stage3: 0.68, stage4: 0.25 },
    { time: 60, stage3: 0.60, stage4: 0.15 },
];

export function SurvivalChart() {
    return (
        <div className="w-full h-full flex flex-col">
            <h4 className="text-sm font-semibold text-slate-800 mb-2 text-center">Kaplan-Meier Survival Estimate</h4>
            <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={DATA} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="time"
                            label={{ value: 'Time (Months)', position: 'insideBottomRight', offset: -10, fontSize: 12 }}
                            tick={{ fontSize: 12, fill: "#64748b" }}
                        />
                        <YAxis
                            domain={[0, 1]}
                            label={{ value: 'Survival Probability', angle: -90, position: 'insideLeft', fontSize: 12 }}
                            tick={{ fontSize: 12, fill: "#64748b" }}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
                            formatter={(value: any) => [Number(value).toFixed(2), "Survival Probability"]}
                        />
                        <Legend verticalAlign="top" height={36} />
                        <Line
                            type="stepAfter"
                            dataKey="stage3"
                            name="Stage III"
                            stroke="#4f46e5"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            type="stepAfter"
                            dataKey="stage4"
                            name="Stage IV"
                            stroke="#ef4444"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
