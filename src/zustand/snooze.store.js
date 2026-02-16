import { create } from "zustand"
import { SNOOZED_PLATFORMS_STORAGE_KEY } from "../constants/constants"

function persistSnoozedPlatforms(snoozedPlatforms) {

   const arr = Array.isArray(snoozedPlatforms) ? snoozedPlatforms : [];

   if (typeof chrome !== "undefined" && chrome.storage?.local) {
      chrome.storage.local.set({ [SNOOZED_PLATFORMS_STORAGE_KEY]: arr })
   }
}

export const useSnoozeStore = create((set) => ({

   snoozedPlatforms: [],

   // SET A SPECIFIC PLATFORM TO BE SNOOZED FOR A SPECIFIC DURATION
   setPlatformSnooze: (platformId, durationMinutes) => {
      // CALCULATE THE DATE UNTIL THE SNOOZE WILL EXPIRE
      const until = Date.now() + durationMinutes * 60 * 1000;

      set((state) => {
         const list = state.snoozedPlatforms ?? []
         const filteredSnoozedPlatforms = list.filter((p) => p.platformId !== platformId);

         // ADD THE NEW SNOOZE TO THE SNOOZED PLATFORMS
         const newSnoozedPlatforms = [...filteredSnoozedPlatforms, { platformId, until }];

         persistSnoozedPlatforms(newSnoozedPlatforms);

         return { snoozedPlatforms: newSnoozedPlatforms };
      })
   },

   // CLEAR THE SNOOZE FOR A SPECIFIC PLATFORM
   clearPlatformSnooze: (platformId) => {
      set((state) => {
         const filteredSnoozedPlatforms = (state.snoozedPlatforms ?? []).filter((p) => p.platformId !== platformId);

         persistSnoozedPlatforms(filteredSnoozedPlatforms);

         return { snoozedPlatforms: filteredSnoozedPlatforms };
      })
   },

   snoozeAllPlatforms: (durationMinutes, platformIds = []) => {
      // CALCULATE THE DATE UNTIL THE SNOOZE WILL EXPIRE
      const until = Date.now() + durationMinutes * 60 * 1000;

      // FILTER OUT THE PLATFORMS THAT ARE NOT IN THE PLATFORM IDS
      set((state) => {
         const filteredSnoozedPlatforms = (state.snoozedPlatforms ?? []).filter((p) => !platformIds.includes(p.platformId));

         // ADD THE NEW SNOOZES TO THE SNOOZED PLATFORMS
         const newSnoozedPlatforms = [...filteredSnoozedPlatforms, ...platformIds.map((platformId) => ({ platformId, until }))];

         persistSnoozedPlatforms(newSnoozedPlatforms);
         return { snoozedPlatforms: newSnoozedPlatforms };
      })
   },

   clearAllSnoozes: () => {
      set({ snoozedPlatforms: [] })
      persistSnoozedPlatforms([]);
   },

   loadSnoozedPlatforms: async () => {
      if (typeof chrome === "undefined" || !chrome.storage?.local?.get) return

      const result = await chrome.storage.local.get([SNOOZED_PLATFORMS_STORAGE_KEY])
      const raw = result[SNOOZED_PLATFORMS_STORAGE_KEY]
      const next = Array.isArray(raw) ? raw : []

      set({ snoozedPlatforms: next })
   },

}))
