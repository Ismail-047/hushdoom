export const author = {
    name: "Muhammad Ismail",
    url: "https://themuhammadismail.com",
}


// EXTENSION LINK ATTRIBUTE AND OPTIONS URL
export const EXTENSION_LINK_ATTR = "data-hushdoom-extension-link"
export const EXTENSION_URL = "chrome-extension://ehaebfelefohknkndmdhofkppcmlcjib/index.html"
export const EXTENSION_GITHUB_URL = "https://github.com/Ismail-047/hushdoom"
export const EXTENSION_CHROME_WEB_STORE_URL = "https://chromewebstore.google.com/detail/hushdoom/ehaebfelefohknkndmdhofkppcmlcjib"
export const EXTENSION_FIREFOX_ADD_ONS_URL = "https://addons.mozilla.org/en-US/firefox/addon/hushdoom/"

// ENABLED PLATFORMS STORAGE KEY
export const ENABLED_PLATFORMS_STORAGE_KEY = "hushdoom_enabled_platforms" // ARRAY OF STRINGS
export const SNOOZED_PLATFORMS_STORAGE_KEY = "hushdoom_snoozed_platforms" // ARRAY OF OBJECTS: { platformId: string, until: number }

// QUOTES STORAGE KEYS
export const CUSTOM_QUOTES_STORAGE_KEY = "hushdoom_custom_quotes" // ARRAY OF OBJECTS: { text: string, author: string }
export const USE_BUILTIN_QUOTES_KEY = "hushdoom_use_builtin_quotes" // BOOLEAN
export const SHOW_QUOTES_ON_BLOCKED_KEY = "hushdoom_show_quotes_on_blocked" // BOOLEAN