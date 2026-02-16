import { create } from "zustand"

export const useHushdoomStore = create((set) => ({

    activeTab: "sites",
    setActiveTab: (tab) => set({ activeTab: tab }),

    totalSitesEnabled: 0,
    setTotalSitesEnabled: (count) => set({ totalSitesEnabled: count }),

}))