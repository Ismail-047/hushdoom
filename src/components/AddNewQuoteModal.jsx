import { useState } from "react";
import { LuX } from "react-icons/lu";
import { useQuotesStore } from "../zustand/quotes.store";

export default function AddNewQuoteModal() {

   const {
      addCustomQuote,
      showAddNewQuoteModal,
      setShowAddNewQuoteModal,
   } = useQuotesStore();

   const [newQuote, setNewQuote] = useState({
      text: "",
      author: ""
   });

   const handleAddNewQuote = (e) => {
      e.preventDefault();

      if (newQuote.text.trim() === "" || newQuote.author.trim() === "") {
         alert("Please fill in all the required fields.");
         return;
      }

      addCustomQuote(newQuote);
      setNewQuote({ text: "", author: "" });
      setShowAddNewQuoteModal(false);
   }

   if (!showAddNewQuoteModal) return null;

   return (
      <div onClick={() => setShowAddNewQuoteModal(false)}
         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">

         <div onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-neutral-800 border border-neutral-700 shadow-xl p-6 theme-animation">

            <div className="flex items-center justify-between mb-4">

               <h3 className="text-lg font-medium text-white">
                  Add new quote
               </h3>

               {/* CLOSE MODAL BUTTON */}
               <button onClick={() => setShowAddNewQuoteModal(false)}
                  type="button"
                  className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
               >
                  <LuX size={20} />
               </button>

            </div>

            {/* ADD NEW QUOTE FORM */}
            <form onSubmit={handleAddNewQuote} className="space-y-3">

               {/* QUOTE TEXT INPUT */}
               <div>

                  <label htmlFor="quote-text" className="block text-sm text-neutral-400 mb-1">
                     Quote <span className="text-red-600 font-bold">*</span>
                  </label>

                  <input required
                     id="quote-text"
                     type="text"
                     value={newQuote.text}
                     onChange={(e) => { setNewQuote({ ...newQuote, text: e.target.value }); }}
                     placeholder="Quote"

                     className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-600 text-white text-sm placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />

               </div>

               {/* QUOTE AUTHOR INPUT */}
               <div>

                  <label htmlFor="quote-author" className="block text-sm text-neutral-400 mb-1">
                     Author <span className="text-red-600 font-bold">*</span>
                  </label>

                  <input required
                     id="quote-author"
                     type="text"
                     value={newQuote.author}
                     onChange={(e) => { setNewQuote({ ...newQuote, author: e.target.value }); }}
                     placeholder="Author"
                     className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-600 text-white text-sm placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />

               </div>

               {/* CANCEL AND ADD QUOTE BUTTONS */}
               <div className="flex gap-2 pt-2">

                  <button type="button"
                     onClick={() => setShowAddNewQuoteModal(false)}
                     className="flex-1 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white text-sm font-medium transition-colors cursor-pointer"
                  >
                     Cancel
                  </button>

                  <button type="submit"
                     className="flex-1 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors cursor-pointer"
                  >
                     Add quote
                  </button>

               </div>

            </form>

         </div>

      </div >
   )
}