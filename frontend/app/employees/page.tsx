"use client";

import React from "react";
import { EditableLabel } from "@/components/custom/EditableLabel";
import { useLabelStore } from "@/store/useLabelStore";
import { Skeleton } from "@/components/ui/skeleton";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const employees = [
    { id: 1, name: "Alice Johnson", role: "Sales Manager", dept: "Corporate", performance: "Exceeding", initial: "AJ" },
    { id: 2, name: "Bob Smith", role: "Account Executive", dept: "SMB", performance: "Meeting", initial: "BS" },
    { id: 3, name: "Charlie Davis", role: "Sales Dev Representative", dept: "Outbound", performance: "Exceeding", initial: "CD" },
    { id: 4, name: "Diana Prince", role: "Customer Success", dept: "Retention", performance: "Meeting", initial: "DP" },
    { id: 5, name: "Evan Wright", role: "Territory Manager", dept: "Mid-Market", performance: "Needs Improvement", initial: "EW" },
];

export default function Employees() {
    const isLoading = useLabelStore((state) => state.isLoading);

    if (isLoading) {
        return (
            <div className="p-8 space-y-8">
                <Skeleton className="h-10 w-[250px]" />
                <Skeleton className="h-[500px] w-full rounded-xl" />
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">
                    <EditableLabel
                        labelKey="page_employees_title"
                        defaultText="Team Management"
                        page="Employees"
                        component="Header"
                    />
                </h1>
                <p className="text-muted-foreground">Monitor performance and manage your sales force.</p>
            </div>

            <Card className="glass border-white/5 shadow-2xl">
                <CardHeader>
                    <CardTitle className="font-bold">
                        <EditableLabel
                            labelKey="table_employees_title"
                            defaultText="Active Sales Representatives"
                            page="Employees"
                            component="Employee Table"
                        />
                    </CardTitle>
                    <CardDescription>Overview of team members and their current performance status.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5">
                                <TableHead className="w-[300px]">Member</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="text-right">Performance</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employees.map((employee) => (
                                <TableRow key={employee.id} className="hover:bg-primary/5 transition-colors border-white/5">
                                    <TableCell className="flex items-center gap-3">
                                        <Avatar className="w-8 h-8 border border-white/10">
                                            <AvatarFallback className="text-[10px] font-bold bg-muted">{employee.initial}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-semibold text-foreground">{employee.name}</span>
                                    </TableCell>
                                    <TableCell className="font-medium text-muted-foreground">{employee.dept}</TableCell>
                                    <TableCell className="font-medium text-muted-foreground">{employee.role}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge
                                            variant={employee.performance === "Exceeding" ? "default" : employee.performance === "Meeting" ? "secondary" : "destructive"}
                                            className="font-bold text-[10px] uppercase tracking-wider"
                                        >
                                            {employee.performance}
                                        </Badge>
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
