import { create } from "zustand";
import {
   CUSTOM_QUOTES_STORAGE_KEY,
   SHOW_QUOTES_ON_BLOCKED_KEY,
   USE_BUILTIN_QUOTES_KEY,
} from "../constants/constants";
import { BUILT_IN_QUOTES } from "../constants/quotes";

// PERSIST CUSTOM QUOTES IN THE BROWSER SYNC STORAGE ON ADD OR REMOVE
const persistCustomQuotes = (customQuotes) => {
   if (typeof chrome !== "undefined" && chrome.storage?.sync) {
      chrome.storage.sync.set({ [CUSTOM_QUOTES_STORAGE_KEY]: customQuotes })
   }
}

export const useQuotesStore = create((set, get) => ({

   builtInQuotes: BUILT_IN_QUOTES,
   customQuotes: [],

   addCustomQuote: (quote) => set((state) => {
      const newQuotes = [...state.customQuotes, quote]
      persistCustomQuotes(newQuotes)
      return { customQuotes: newQuotes }
   }),
   removeCustomQuote: (quote) => set((state) => {
      const filteredQuotes = state.customQuotes.filter(
         (q) => !(q.text === quote.text && q.author === quote.author)
      )
      persistCustomQuotes(filteredQuotes)
      return { customQuotes: filteredQuotes }
   }),

   // SHOW QUOTES ON BLOCKED PAGES OR NOT
   showQuotesOnBlockedPages: true,
   setShowQuotesOnBlockedPages: (showQuotesOnBlockedPages) => {
      set({ showQuotesOnBlockedPages })

      // PERSIST THE CHOICE IN THE BROWSER SYNC STORAGE
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
         chrome.storage.local.set({ [SHOW_QUOTES_ON_BLOCKED_KEY]: showQuotesOnBlockedPages })
      }
   },

   // USE BUILT-IN QUOTES OR NOT (CUSTOM QUOTES ONLY)
   useBuiltInQuotes: true,
   setUseBuiltInQuotes: (useBuiltInQuotes) => {
      set({ useBuiltInQuotes })

      // PERSIST THE CHOICE IN THE BROWSER SYNC STORAGE
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
         chrome.storage.local.set({ [USE_BUILTIN_QUOTES_KEY]: useBuiltInQuotes })
      }
   },

   // MODALS STATES
   showAddNewQuoteModal: false,
   setShowAddNewQuoteModal: (showAddNewQuoteModal) => set({ showAddNewQuoteModal }),
   showAllQuotesModal: false,
   setShowAllQuotesModal: (showAllQuotesModal) => set({ showAllQuotesModal }),

   // WHILE SHOWING ALL QUOTES MODAL, SHOW CUSTOM QUOTES OR BUILT-IN QUOTES
   showCustomQuotesInModal: false,
   setShowCustomQuotesInModal: (showCustomQuotesInModal) => set({ showCustomQuotesInModal }),

   // LOAD CUSTOM QUOTES AND SETTINGS FROM THE BROWSER LOCAL AND SYNC STORAGE
   loadCustomQuotesAndSettings: async () => {
      if (typeof chrome !== "undefined" && chrome.storage?.local) {

         const result = await chrome.storage.local.get([
            SHOW_QUOTES_ON_BLOCKED_KEY,
            USE_BUILTIN_QUOTES_KEY,
         ])
         const resultSync = await chrome.storage.sync.get([
            CUSTOM_QUOTES_STORAGE_KEY,
         ])

         set({
            customQuotes: resultSync[CUSTOM_QUOTES_STORAGE_KEY] || [],
            showQuotesOnBlockedPages: result[SHOW_QUOTES_ON_BLOCKED_KEY] !== false,
            useBuiltInQuotes: result[USE_BUILTIN_QUOTES_KEY] !== false,
         })

      }
   },

}))