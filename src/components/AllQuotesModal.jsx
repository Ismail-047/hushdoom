import { useState, useEffect } from "react";
import { LuX, LuQuote, LuTrash2 } from "react-icons/lu";
import { useQuotesStore } from "../zustand/quotes.store";

export default function AllQuotesModal() {

   const {
      customQuotes,
      builtInQuotes,

      removeCustomQuote,

      showCustomQuotesInModal,

      showAllQuotesModal,
      setShowAllQuotesModal,
   } = useQuotesStore();

   const [quotesToShow, setQuotesToShow] = useState([]);

   // QUOTES TO SHOW IN THE MODAL (CUSTOM QUOTES OR BUILT-IN QUOTES)
   useEffect(() => {
      setQuotesToShow(showCustomQuotesInModal ? customQuotes : builtInQuotes);
   }, [showCustomQuotesInModal, customQuotes, builtInQuotes]);

   if (!showAllQuotesModal) return null;

   return (
      <div onClick={() => setShowAllQuotesModal(false)}
         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">

         <div onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg max-h-[85vh] flex flex-col rounded-2xl bg-neutral-800 border border-neutral-700 shadow-xl theme-animation">

            <div className="flex items-center justify-between p-4 border-b border-neutral-700 shrink-0">

               {/* MODAL TITLE */}
               <h3 className="text-lg font-medium text-white">
                  {showCustomQuotesInModal
                     ? `Your Custom Quotes `
                     : `Built-in Quotes `
                     + `(${quotesToShow.length})`
                  }
               </h3>

               {/* CLOSE MODAL BUTTON */}
               <button type="button"
                  onClick={() => setShowAllQuotesModal(false)}
                  className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
               >
                  <LuX size={20} />
               </button>

            </div>

            {/* QUOTES LIST */}
            {quotesToShow.length > 0 ? (
               <ul className="p-4 overflow-y-auto space-y-3 flex-1 min-h-0 scrollbar-thin-dark">

                  {quotesToShow.map((q, i) => (

                     <li key={i}
                        className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/30 flex gap-3 items-start">

                        <LuQuote size={20}
                           className="text-orange-400 shrink-0 mt-0.5"
                        />

                        <div className="min-w-0 flex-1">

                           <p className="text-sm font-medium text-white">
                              "{q.text}"
                           </p>

                           <p className="text-xs text-neutral-500 mt-1">
                              — {q.author}
                           </p>

                        </div>

                        {/* REMOVE QUOTE BUTTON FOR CUSTOM QUOTES */}
                        {showCustomQuotesInModal && (
                           <button type="button"
                              onClick={() => removeCustomQuote(q)}
                              className="shrink-0 p-2 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-neutral-700/50 transition-colors"
                           >
                              <LuTrash2 size={18} />
                           </button>
                        )}

                     </li>

                  ))}

               </ul>
            ) : (
               /* NO QUOTES MESSAGE */
               <div className="py-10 flex-1 flex items-center justify-center text-neutral-400 text-sm">
                  {showCustomQuotesInModal
                     ? "No custom quotes yet. Add your own above."
                     : "No built-in quotes yet. Add your own above."
                  }
               </div>
            )}
         </div>

      </div >
   )
}