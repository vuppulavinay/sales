"use client";

import React from "react";
import { EditableLabel } from "@/components/custom/EditableLabel";
import { BasicChart } from "@/components/custom/BasicChart";
import { salesData, topProducts } from "@/lib/mockData";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useLabelStore } from "@/store/useLabelStore";
import { BarChart, PieChart, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function Analytics() {
    const isLoading = useLabelStore((state) => state.isLoading);

    const barChartOption = {
        backgroundColor: "transparent",
        tooltip: { trigger: "axis" },
        xAxis: {
            type: "category",
            data: salesData.map((d) => d.month),
            axisLine: { lineStyle: { color: "#555" } },
        },
        yAxis: {
            type: "value",
            axisLine: { lineStyle: { color: "#555" } },
            splitLine: { lineStyle: { color: "#222" } },
        },
        series: [
            {
                data: salesData.map((d) => d.revenue),
                type: "bar",
                itemStyle: {
                    color: {
                        type: "linear",
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: "#a855f7" },
                            { offset: 1, color: "#7e22ce" },
                        ],
                    },
                    borderRadius: [4, 4, 0, 0],
                },
            },
        ],
        grid: { top: 20, right: 20, bottom: 40, left: 50 },
    };

    const comparisonOption = {
        backgroundColor: "transparent",
        legend: { textStyle: { color: "#ccc" }, bottom: 0 },
        tooltip: { trigger: "axis" },
        xAxis: {
            type: "category",
            data: salesData.map((d) => d.month),
            axisLine: { lineStyle: { color: "#555" } },
        },
        yAxis: {
            type: "value",
            axisLine: { lineStyle: { color: "#555" } },
            splitLine: { lineStyle: { color: "#222" } },
        },
        series: [
            {
                name: "Actual Revenue",
                data: salesData.map((d) => d.revenue),
                type: "line",
                smooth: true,
                lineStyle: { width: 3, color: "#3b82f6" },
            },
            {
                name: "Target Revenue",
                data: salesData.map((d) => d.target),
                type: "line",
                smooth: true,
                lineStyle: { width: 3, type: "dashed", color: "#ef4444" },
            },
        ],
        grid: { top: 40, right: 20, bottom: 60, left: 60 },
    };

    if (isLoading) {
        return (
            <div className="p-8 space-y-8">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-[250px]" />
                    <Skeleton className="h-4 w-[350px]" />
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-32 rounded-xl" />
                    ))}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <Skeleton className="h-[450px] rounded-xl" />
                    <Skeleton className="h-[450px] rounded-xl" />
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-1">
                <h1  id="page_analytics_title" className="text-3xl font-bold tracking-tight">
                    <EditableLabel
                        labelKey="page_analytics_title"
                        defaultText="In-depth Analytics"
                        page="Analytics"
                        component="Header"
                    />
                </h1>
                <p className="text-muted-foreground">Detailed breakdown of sales performance and targets.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-black/40 border-white/5 shadow-xl glass">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            Time Period
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Last 7 Months</div>
                        <p className="text-xs text-muted-foreground italic">Jan 2026 - Jul 2026</p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-500/10 to-transparent border-white/5 shadow-xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            <EditableLabel
                                labelKey="metric_revenue"
                                defaultText="Total Revenue"
                                page="Analytics"
                                component="Summary Card"
                            />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$399,231.00</div>
                        <p className="text-xs text-primary font-semibold flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" />
                            Projected: $420,000
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 border-white/5 shadow-xl">
                    <CardHeader className="pb-2">
                        <CardTitle  id="metric_customers" className="text-sm font-medium">
                            <EditableLabel
                                labelKey="metric_customers"
                                defaultText="Active Customers"
                                page="Analytics"
                                component="Summary Card"
                            />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,245</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3 text-green-500" />
                            Growth Rate: 12% YoY
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-primary/5 border-primary/10 shadow-lg">
                    <CardHeader>
                        <CardTitle>Performance vs Target</CardTitle>
                        <CardDescription>Comparing actual revenue against set benchmarks.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <BasicChart option={comparisonOption} height="400px" />
                    </CardContent>
                </Card>

                <Card className="bg-black/40 border-white/5 shadow-lg">
                    <CardHeader>
                        <CardTitle>Revenue Distribution</CardTitle>
                        <CardDescription>Monthly contribution to total revenue.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <BasicChart option={barChartOption} height="400px" />
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-black/40 border-white/5 shadow-xl">
                <CardHeader>
                    <CardTitle id="table_analytics_title">
                        <EditableLabel
                            labelKey="table_analytics_title"
                            defaultText="Detailed Performance Metrics"
                            page="Analytics"
                            component="Data Table"
                        />
                    </CardTitle>
                    <CardDescription>Monthly breakdown of key indicators.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Month</TableHead>
                                <TableHead>Revenue</TableHead>
                                <TableHead>Target</TableHead>
                                <TableHead>Variance</TableHead>
                                <TableHead className="text-right">Customers</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {salesData.map((d) => {
                                const variance = d.revenue - d.target;
                                return (
                                    <TableRow key={d.month}>
                                        <TableCell className="font-medium">{d.month}</TableCell>
                                        <TableCell>${d.revenue.toLocaleString()}</TableCell>
                                        <TableCell>${d.target.toLocaleString()}</TableCell>
                                        <TableCell className={variance >= 0 ? 'text-green-500' : 'text-red-500'}>
                                            {variance >= 0 ? '+' : ''}{variance.toLocaleString()}
                                        </TableCell>
                                        <TableCell className="text-right">{d.customers}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
