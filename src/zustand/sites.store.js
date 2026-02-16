import { create } from "zustand"
import { PLATFORMS } from "../constants/plateforms";
import { ENABLED_PLATFORMS_STORAGE_KEY } from "../constants/constants";
import { useSnoozeStore } from "./snooze.store";

export const useSitesStore = create((set, get) => ({

   // CONTAIN IDS OF ENABLED PLATFORMS
   enabledPlatforms: [],
   setEnabledPlatforms: (enabledPlatforms) => set({ enabledPlatforms }),

   togglePlatform: (platformId) => {

      const { enabledPlatforms } = get();

      const isEnabled = enabledPlatforms.includes(platformId);

      const newEnabledPlatforms = isEnabled
         ? enabledPlatforms.filter((pId) => (pId !== platformId)) // DISABLE PLATFORM
         : [...enabledPlatforms, platformId]; // ENABLE PLATFORM

      // Clear snooze when platform is disabled (snooze only applies to enabled platforms)
      if (isEnabled) {
         useSnoozeStore.getState().clearPlatformSnooze(platformId);
      }

      set({ enabledPlatforms: newEnabledPlatforms });

      if (typeof chrome !== "undefined" && chrome.storage?.local) {
         chrome.storage.local.set({ [ENABLED_PLATFORMS_STORAGE_KEY]: newEnabledPlatforms });
      }
   },

   blockAllPlatforms: () => {
      set({ enabledPlatforms: PLATFORMS.map((p) => (p.id)) });
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
         chrome.storage.local.set({ [ENABLED_PLATFORMS_STORAGE_KEY]: PLATFORMS.map((p) => (p.id)) });
      }
   },

   unblockAllPlatforms: () => {
      useSnoozeStore.getState().clearAllSnoozes();
      set({ enabledPlatforms: [] });
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
         chrome.storage.local.set({ [ENABLED_PLATFORMS_STORAGE_KEY]: [] });
      }
   },

   // LOAD ENABLED PLATFORMS FROM THE BROWSER LOCAL STORAGE
   loadEnabledPlatforms: async () => {
      if (typeof chrome !== "undefined" && chrome.storage?.local) {

         const result = await chrome.storage.local.get([
            ENABLED_PLATFORMS_STORAGE_KEY
         ]);
         set({ enabledPlatforms: result[ENABLED_PLATFORMS_STORAGE_KEY] || [] });
      }
   },

}))