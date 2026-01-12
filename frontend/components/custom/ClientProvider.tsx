"use client";

import React, { useEffect } from "react";
import { useLabelStore } from "@/store/useLabelStore";

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
    const fetchLabels = useLabelStore((state) => state.fetchLabels);

    useEffect(() => {
        fetchLabels();
    }, [fetchLabels]);

    return <>{children}</>;
};
