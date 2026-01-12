"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BarChart3,
    Settings,
    Users,
    Package,
    TrendingUp,
    User,
    LogOut,
    ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: Users, label: "Employees", href: "/employees" },
    { icon: TrendingUp, label: "Sales Report", href: "#" }, // Still placeholder
    { icon: Package, label: "Inventory", href: "#" },
];

export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="w-64 border-r h-screen flex flex-col bg-sidebar backdrop-blur-xl">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                        <TrendingUp className="text-primary-foreground w-5 h-5" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-foreground">SalesPro</span>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold px-1">Enterprise v2.0</p>
            </div>

            <ScrollArea className="flex-1 px-3">
                <div className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Button
                                key={item.label}
                                variant={isActive ? "secondary" : "ghost"}
                                asChild
                                className={cn(
                                    "w-full justify-start gap-3 h-11 px-4 transition-all duration-200",
                                    isActive ? "bg-primary/10 text-primary hover:bg-primary/15" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <Link href={item.href}>
                                    <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground")} />
                                    <span className="font-semibold">{item.label}</span>
                                </Link>
                            </Button>
                        );
                    })}
                </div>
            </ScrollArea>

            <div className="p-4 space-y-4">
                <Separator className="bg-border/50" />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start gap-3 h-14 px-2 hover:bg-muted/50 rounded-xl">
                            <Avatar className="w-9 h-9 border border-border">
                                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">VK</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start overflow-hidden">
                                <span className="text-sm font-bold truncate w-full text-left font-sans text-foreground">Vinay Kumar</span>
                                <span className="text-[10px] text-muted-foreground truncate w-full text-left">Admin Account</span>
                            </div>
                            <ChevronUp className="w-4 h-4 ml-auto text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mb-2 side-top">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Settings className="w-4 h-4 text-muted-foreground" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive cursor-pointer hover:bg-destructive/10">
                            <LogOut className="w-4 h-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};
