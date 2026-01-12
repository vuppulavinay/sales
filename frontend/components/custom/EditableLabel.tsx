"use client";

import React, { useState, useEffect, useId, useRef } from "react";
import { useLabelStore } from "@/store/useLabelStore";
import { Pencil } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
} from "../ui/alertDialog";

interface EditableLabelProps {
    labelKey: string;
    defaultText: string;
    page: string;
    component: string;
    className?: string;
}

export const EditableLabel: React.FC<EditableLabelProps> = ({
    labelKey,
    defaultText,
    page,
    component,
    className = "",
}) => {
    const { labels, usages, updateLabel, registerUsage, unregisterUsage } = useLabelStore();
    const [isEditing, setIsEditing] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [tempValue, setTempValue] = useState("");
    const id = useId();

    const labelRef = useRef<HTMLDivElement | null>(null)
    const labelValue = labels[labelKey] || defaultText;

    useEffect(() => {
        registerUsage(labelKey, { id, page, component });
        return () => unregisterUsage(labelKey, id);
    }, [labelKey, id, page, component, registerUsage, unregisterUsage]);

    const handleEdit = () => {
        setTempValue(labelValue);
        setIsEditing(true);
    };

    const confirmUpdate = async () => {
        await updateLabel(labelKey, tempValue);
        setIsEditing(false);
        setShowAlert(false);
    };

    const handleSave = () => {
        if (currentUsages.length > 1) {
            setShowAlert(true);
        } else {
            confirmUpdate();
        }
    };

    const currentUsages = usages[labelKey] || [];
    const uniquePages = new Set(currentUsages.map((u) => u.page));

    return (
        <div id={`${labelKey}`} className={`group relative inline-flex items-center gap-2 ${className}`}>
            <span>{labelValue}</span>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={handleEdit}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded-full"
                        >
                            <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>Edit Label</TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Label: {labelKey}</DialogTitle>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Label Text</label>
                            <Input
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                placeholder="Enter label text..."
                            />
                        </div>

                        {currentUsages.length > 1 && (
                            <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-200 dark:border-amber-900">
                                <p className="text-xs text-amber-800 dark:text-amber-200 font-semibold mb-2 flex items-center gap-1.5">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                    </span>
                                    Shared Label Impact:
                                </p>
                                <p className="text-xs text-amber-700 dark:text-amber-300">
                                    This change will affect <span className="font-bold">{currentUsages.length}</span> locations
                                    across <span className="font-bold">{uniquePages.size}</span> pages.
                                </p>
                                <div className="mt-2 flex flex-wrap gap-1">
                                    {currentUsages.map((u, i) => (
                                        <Badge key={i} variant="outline" className="text-[10px] bg-white dark:bg-black">
                                            {u.page} › {u.component}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent className="sm:max-w-md border-destructive/20">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                            Update Shared Label?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="space-y-4">
                            <p>
                                This label is used in <span className="font-bold text-foreground">{currentUsages.length} locations</span>.
                                Updating it will change the text across all these places.
                            </p>
                            <div className="rounded-md bg-muted/50 p-3 border border-border/50">
                                <p className="text-[10px] font-bold mb-2 uppercase tracking-widest text-muted-foreground">Affected Locations:</p>
                                <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                                    {currentUsages.map((u, i) => (
                                        <div key={i} className="text-xs flex items-center justify-between">
                                            <span className="font-medium text-foreground">{u.page}</span>
                                            <span className="text-[10px] text-muted-foreground bg-background px-1.5 py-0.5 rounded border border-border/50">{u.component}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <p className="text-sm">Are you sure you want to proceed? This action cannot be easily undone.</p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-6">
                        <AlertDialogCancel>Go Back</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmUpdate} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                            Update All {currentUsages.length} Locations
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
