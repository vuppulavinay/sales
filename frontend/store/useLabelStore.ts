import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/labels';

interface LabelUsage {
    id: string;
    page: string;
    component: string;
}

interface LabelState {
    labels: Record<string, string>;
    usages: Record<string, LabelUsage[]>;
    isLoading: boolean;
    fetchLabels: () => Promise<void>;
    updateLabel: (key: string, value: string) => Promise<void>;
    registerUsage: (key: string, usage: LabelUsage) => void;
    unregisterUsage: (key: string, usageId: string) => void;
}

export const useLabelStore = create<LabelState>((set, get) => ({
    labels: {},
    usages: {},
    isLoading: false,

    fetchLabels: async () => {
        set({ isLoading: true });
        try {
            const { data } = await axios.get(API_URL);
            const labelsMap = data.reduce((acc: Record<string, string>, item: any) => {
                acc[item.key] = item.value;
                return acc;
            }, {});
            set({ labels: labelsMap });
            set({ isLoading: false });
        } catch (error) {
            console.error('Failed to fetch labels', error);
        } finally {
            set({ isLoading: false });
        }
    },

    updateLabel: async (key, value) => {
        const prevValue = get().labels[key];
        set((state) => ({
            labels: { ...state.labels, [key]: value },
        }));

        try {
            await axios.post(API_URL, { key, value });
            await get().fetchLabels();
        } catch (error) {
            console.error('Failed to update label', error);
            set((state) => ({
                labels: { ...state.labels, [key]: prevValue },
            }));
        }
    },

    registerUsage: (key, usage) => {
        set((state) => {
            const existing = state.usages[key] || [];
            console.log(existing,'existing',usage)
            if (existing.some((u) => u.id === usage.id)) return state;
            return {
                usages: {
                    ...state.usages,
                    [key]: [...existing, usage],
                },
            };
        });
    },

    unregisterUsage: (key, usageId) => {
        set((state) => {
            const existing = state.usages[key] || [];
            return {
                usages: {
                    ...state.usages,
                    [key]: existing.filter((u) => u.id !== usageId),
                },
            };
        });
    },
}));
