"use client";

import React, { useState, useEffect,useRef } from "react";
import { EditableLabel } from "@/components/custom/EditableLabel";
import { BasicChart } from "@/components/custom/BasicChart";
import { salesData, topProducts } from "@/lib/mockData";
import { useLabelStore } from "@/store/useLabelStore";
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
import { TrendingUp, Users, DollarSign, Package } from "lucide-react";


export default function Dashboard() {
  const [getLabels, setGetLabels] = useState<Record<string, string>>({});
  const isLoading = useLabelStore((state) => state.isLoading);
  const labels = useLabelStore((state) => state.labels);
  const fetchLabels = useLabelStore((state) => state.fetchLabels);
  const labelRef = useRef<HTMLDivElement | null>(null)


  useEffect(() => {
    fetchLabels();
  }, [fetchLabels]);

  useEffect(() => {
    if (labels) {
      setGetLabels(labels);
    }

  }, [labels]);

  console.log(getLabels, 'getLabelsList', labels, isLoading)

  const revenueChartOption = {
    backgroundColor: "transparent",
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: salesData.map((d) => d.month),
      axisLine: { lineStyle: { color: "#555" } },
    },
    yAxis: {
      type: "value",
      splitLine: { lineStyle: { color: "#222" } },
      axisLine: { lineStyle: { color: "#555" } },
    },
    series: [
      {
        data: salesData.map((d) => d.revenue),
        type: "line",
        smooth: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(59, 130, 246, 0.4)" },
              { offset: 1, color: "transparent" },
            ],
          },
        },
        lineStyle: { color: "#3b82f6", width: 4 },
        symbolSize: 8,
      },
    ],
    grid: { top: 20, right: 20, bottom: 40, left: 50 },
  };

  const customerChartOption = {
    backgroundColor: "transparent",
    tooltip: { trigger: "item" },
    series: [
      {
        name: "Source",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#000",
          borderWidth: 2,
        },
        label: { show: false },
        data: [
          { value: 1048, name: "Organic" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Referral" },
          { value: 300, name: "Social" },
        ],
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="p-8 space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-4 w-[350px]" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-7">
          <Skeleton className="col-span-4 h-[400px] rounded-xl" />
          <Skeleton className="col-span-3 h-[400px] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-1000">
      <div className="flex flex-col gap-1">
        <h1 id="page_dashboard_title" className="text-3xl font-bold tracking-tight text-foreground font-sans">
          <EditableLabel
            labelKey="page_dashboard_title"
            defaultText="Sales Overview"
            page="Dashboard"
            component="Header"
          />
        </h1>
        <p className="text-muted-foreground font-medium">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass shadow-2xl overflow-hidden relative group border-white/5">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <DollarSign className="w-12 h-12 text-primary" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle   className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              <EditableLabel
                labelKey="metric_revenue"
                defaultText={"Total Revenue"}
                page="Dashboard"
                component="Metric Card"
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-foreground tracking-tight">$45,231.89</div>
            <p className="text-xs text-green-500 font-bold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +20.1% <span className="text-muted-foreground font-normal">from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card className="glass shadow-2xl border-white/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle id="metric_customers" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              <EditableLabel
                labelKey="metric_customers"
                defaultText="Active Customers"
                page="Dashboard"
                component="Metric Card"
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-foreground tracking-tight">+2,350</div>
            <p className="text-xs text-blue-400 font-bold mt-1">+180.1% growth</p>
          </CardContent>
        </Card>

        <Card className="glass shadow-2xl border-white/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle id="metric_sales" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              <EditableLabel
                labelKey="metric_sales"
                defaultText="Sales Count"
                page="Dashboard"
                component="Metric Card"
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-foreground tracking-tight">+12,234</div>
            <p className="text-xs text-purple-400 font-bold mt-1">+19.5% conversion</p>
          </CardContent>
        </Card>

        <Card className="glass shadow-2xl border-white/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle id="metric_active" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              <EditableLabel
                labelKey="metric_active"
                defaultText="Active Projects"
                page="Dashboard"
                component="Metric Card"
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-foreground tracking-tight">+573</div>
            <p className="text-xs text-orange-400 font-bold mt-1">12 pending tasks</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 glass border-white/5 shadow-2xl">
          <CardHeader>
            <CardTitle id="chart_revenue_title" className="font-bold flex items-center gap-2">
              <EditableLabel
                labelKey="chart_revenue_title"
                defaultText="Revenue Trend"
                page="Dashboard"
                component="Main Chart"
              />
            </CardTitle>
            <CardDescription className="font-medium">Monthly revenue growth and projections.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <BasicChart option={revenueChartOption} height="350px" />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 glass border-white/5 shadow-2xl">
          <CardHeader>
            <CardTitle id="chart_customer_title" className="font-bold">
              <EditableLabel
                labelKey="chart_customer_title"
                defaultText="Customer Acquisition"
                page="Dashboard"
                component="Pie Chart"
              />
            </CardTitle>
            <CardDescription className="font-medium">Sources of new customer signups.</CardDescription>
          </CardHeader>
          <CardContent>
            <BasicChart option={customerChartOption} height="350px" />
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-white/5 shadow-2xl">
        <CardHeader>
          <CardTitle  id="table_products_title" className="font-bold">
            <EditableLabel
              labelKey="table_products_title"
              defaultText="Top Products"
              page="Dashboard"
              component="Product Table"
            />
          </CardTitle>
          <CardDescription className="font-medium underline-offset-4 decoration-primary">Performance of your best-selling items.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-white/5">
                <TableHead id="col_product_name" className="font-bold text-foreground">
                  <EditableLabel
                    labelKey="col_product_name"
                    defaultText="Product Name"
                    page="Dashboard"
                    component="Product Table"
                  />
                </TableHead>
                <TableHead className="font-bold text-foreground">Sales</TableHead>
                <TableHead className="font-bold text-foreground">Revenue</TableHead>
                <TableHead className="text-right font-bold text-foreground">Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product) => (
                <TableRow key={product.name} className="hover:bg-primary/5 transition-colors border-white/5">
                  <TableCell className="font-semibold text-foreground">{product.name}</TableCell>
                  <TableCell className="font-medium">{product.sales}</TableCell>
                  <TableCell className="font-medium">${product.revenue.toLocaleString()}</TableCell>
                  <TableCell className={`text-right font-bold ${product.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {product.growth}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
