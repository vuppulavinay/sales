"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { EditableLabel } from "@/components/custom/EditableLabel";

const activities = [
    { id: 1, user: "Alex Thompson", action: "closed a deal", amount: "$12,400", time: "2m ago", initial: "AT" },
    { id: 2, user: "Sarah Chen", action: "added new customer", amount: "Tech Corp", time: "15m ago", initial: "SC" },
    { id: 3, user: "Mike Ross", action: "updated inventory", amount: "50 items", time: "1h ago", initial: "MR" },
    { id: 4, user: "Jessica Pearson", action: "reached target", amount: "105%", time: "3h ago", initial: "JP" },
];

export const RightPanel = () => {
    return (
        <div className="w-80 border-l h-screen bg-card/30 backdrop-blur-xl p-6 hidden xl:flex flex-col gap-6">
            <div className="space-y-1">
                <h3 className="font-bold text-lg">
                    <EditableLabel
                        labelKey="panel_right_title"
                        defaultText="Live Stream"
                        page="Global"
                        component="Right Panel"
                    />
                </h3>
                <p className="text-xs text-muted-foreground font-medium">Real-time sales updates</p>
            </div>

            <div className="space-y-4">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex gap-3 items-start p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group">
                        <Avatar className="w-10 h-10 border border-primary/20 bg-primary/5">
                            <AvatarFallback className="text-xs font-bold bg-transparent">{activity.initial}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-semibold leading-none group-hover:text-primary transition-colors">
                                {activity.user}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {activity.action} <span className="text-foreground font-medium">{activity.amount}</span>
                            </p>
                            <p className="text-[10px] text-muted-foreground/60">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Card className="mt-auto bg-primary/10 border-primary/20 shadow-none">
                <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-xs uppercase tracking-widest text-primary">System Status</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-bold">API Operational</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
