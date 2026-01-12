"use client";

import React from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "next-themes";

interface ChartProps {
    option: any;
    height?: string;
    className?: string;
}

export const BasicChart: React.FC<ChartProps> = ({ option, height = "400px", className = "" }) => {
    return (
        <div className={`w-full ${className}`}>
            <ReactECharts
                option={option}
                style={{ height }}
                opts={{ renderer: "svg" }}
                theme="dark" // Always dark as per layout
            />
        </div>
    );
};
