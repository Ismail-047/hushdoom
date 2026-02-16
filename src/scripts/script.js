import { createElement } from "react"
import { createRoot } from "react-dom/client"
import { FEED_SELECTORS, HOST_TO_ID } from "../constants/plateforms"
import BlockedPageContent from "../components/BlockedPageContent"

import {
   EXTENSION_LINK_ATTR,
   ENABLED_PLATFORMS_STORAGE_KEY,
   SNOOZED_PLATFORMS_STORAGE_KEY,
} from "../constants/constants"

function getOrCreateExtensionLink(feed) {

   const existing = document.querySelector(`[${EXTENSION_LINK_ATTR}]`)
   if (existing) return existing

   const container = document.createElement("div")
   container.setAttribute(EXTENSION_LINK_ATTR, "")
   feed.parentNode.insertBefore(container, feed)

   const root = createRoot(container)
   root.render(createElement(BlockedPageContent))

   return container
}

function checkAndHide() {
   if (!chrome.runtime?.id) return

   const hostname = window.location.hostname
   const platformId = HOST_TO_ID[hostname]

   if (!platformId) return

   chrome.storage.local.get([ENABLED_PLATFORMS_STORAGE_KEY, SNOOZED_PLATFORMS_STORAGE_KEY], (result) => {

      const enabledPlatforms = Array.isArray(result[ENABLED_PLATFORMS_STORAGE_KEY])
         ? result[ENABLED_PLATFORMS_STORAGE_KEY]
         : []

      const snoozedPlatforms = Array.isArray(result[SNOOZED_PLATFORMS_STORAGE_KEY])
         ? result[SNOOZED_PLATFORMS_STORAGE_KEY]
         : []

      const isSnoozed = snoozedPlatforms.some(
         (p) => p.platformId === platformId && p.until > Date.now()
      )

      const feedSelector = FEED_SELECTORS[platformId]
      console.log("Hushdoom: Feed Selector =>", feedSelector)
      if (!feedSelector) return

      const feed = document.querySelector(feedSelector)
      console.log("Hushdoom: Feed =>", feed)
      if (!feed) return

      const isEnabled = enabledPlatforms.includes(platformId) && !isSnoozed

      if (isEnabled) {
         feed.style.display = "none"
         getOrCreateExtensionLink(feed).style.display = ""
      } else {
         feed.style.display = ""
         const linkEl = document.querySelector(`[${EXTENSION_LINK_ATTR}]`)
         if (linkEl) linkEl.style.display = "none"
      }
   })
}

setInterval(() => {
   if (!chrome.runtime?.id) return
   checkAndHide();
}, 1000);