import { useState, useEffect } from "react";
import { BUILT_IN_QUOTES } from "../constants/quotes";
import {
   CUSTOM_QUOTES_STORAGE_KEY,
   SHOW_QUOTES_ON_BLOCKED_KEY,
   USE_BUILTIN_QUOTES_KEY,
   EXTENSION_URL,
} from "../constants/constants";
import { pickRandomQuote } from "../utils/pickRandomQuote";
import { createElement } from "react";
import { RiDoubleQuotesL } from "react-icons/ri";


export default function BlockedPageContent() {

   const [quote, setQuote] = useState(null);

   useEffect(() => {

      async function getCustomQuotes() {
         if (!chrome.storage?.local) return // IF THE BROWSER STORAGE IS NOT AVAILABLE, RETURN

         const resultSync = await chrome.storage.sync.get([
            CUSTOM_QUOTES_STORAGE_KEY,
         ])
         const customQuotes = resultSync[CUSTOM_QUOTES_STORAGE_KEY] || [];

         chrome.storage.local.get( // GET THE CUSTOM QUOTES, AND QUOTES RELATED SETTINGS FROM THE BROWSER STORAGE
            [
               CUSTOM_QUOTES_STORAGE_KEY,
               SHOW_QUOTES_ON_BLOCKED_KEY,
               USE_BUILTIN_QUOTES_KEY,
            ],
            (result) => {

               const showQuotesOnBlockedPages = result[SHOW_QUOTES_ON_BLOCKED_KEY] !== false;
               if (!showQuotesOnBlockedPages) return; // DON'T SHOW QUOTES IF THE USER HAS DISABLED THEM

               const useBuiltInQuotes = result[USE_BUILTIN_QUOTES_KEY] !== false;

               const quotes = useBuiltInQuotes // IF ENABLED USE BOTH BUILT-IN AND CUSTOM QUOTES
                  ? [...BUILT_IN_QUOTES, ...customQuotes]
                  : [...customQuotes]; // USE CUSTOM QUOTES ONLY

               setQuote(pickRandomQuote(quotes)); // PICK A RANDOM QUOTE FROM THE QUOTES ARRAY
            }
         )
      }

      getCustomQuotes();
   }, [])

   return createElement(
      "div",
      { style: { width: "100%" } },
      quote && createElement(BlockedPageQuote, { quote }),
      createElement(ExtensionLink)
   )
}

function ExtensionLink() {
   return (
      <div
         style={{
            textAlign: "center",
            color: "#666",
            fontFamily: "system-ui, sans-serif",
         }}
      >
         <a
            href={EXTENSION_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
               color: "#2563eb",
               textDecoration: "none",
               fontSize: "12px",
            }}
         >
            Hushdoom | Feeds Blocker - Open extension
         </a>

      </div>
   )
}

function BlockedPageQuote({ quote }) {
   if (!quote?.text) return null

   return (
      <div
         style={{
            maxWidth: "500px",
            minWidth: "400px",
            padding: "20px 24px",
            margin: "40px auto 10px auto",
            fontFamily: "system-ui, -apple-system, sans-serif",
            background: "inherit",
            borderRadius: "15px",
            border: "1px solid #333",
         }}
      >
         <RiDoubleQuotesL size={35}
            style={{
               color: "orange",
               marginBottom: "3px",
            }} />
         <p
            style={{
               margin: 0,
               fontSize: "18px",
               lineHeight: 1.5,
               color: "#fafafa",
               fontWeight: 500,
            }}
         >
            "{quote.text}"
         </p>
         {quote.author && (
            <p
               style={{
                  margin: "8px 0 0",
                  fontSize: "14px",
                  color: "orange",
                  width: "100%",
                  textAlign: "right",
               }}
            >
               ~ {quote.author}
            </p>
         )}
      </div>
   )
}
