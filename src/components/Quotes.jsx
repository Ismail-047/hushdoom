import { CiCircleList } from "react-icons/ci";
import { useQuotesStore } from "../zustand/quotes.store";
import { MdOutlineAddCircleOutline } from "react-icons/md";

export default function Quotes() {

    const {
        builtInQuotes,
        useBuiltInQuotes,
        setUseBuiltInQuotes,
        showQuotesOnBlockedPages,
        setShowQuotesOnBlockedPages,
        setShowAddNewQuoteModal,
        setShowAllQuotesModal,
        setShowCustomQuotesInModal,
    } = useQuotesStore();

    return (
        <section className="space-y-4 theme-animation min-h-[55vh]">

            <h2 className="text-sm font-medium text-neutral-400 mb-4">
                Motivational Quotes
            </h2>

            {/* SHOW QUOTES ON BLOCKED PAGES OPTION */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/30">

                <span className="text-sm text-neutral-300">
                    Show quotes on blocked pages
                </span>

                <button onClick={() => setShowQuotesOnBlockedPages(!showQuotesOnBlockedPages)}
                    className={`relative w-11 h-6 rounded-full transition-all duration-300 cursor-pointer ${showQuotesOnBlockedPages
                        ? "bg-green-500"
                        : "bg-neutral-700/50"
                        }`}
                >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 
                    ${showQuotesOnBlockedPages ? "left-6" : "left-1"}`}
                    />
                </button>

            </div>

            {showQuotesOnBlockedPages && (

                <div className="theme-animation grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* BUILT-IN QUOTES OPTION */}
                    <div className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/30 space-y-3">

                        <div className="flex items-center justify-between">

                            <span className="text-sm text-neutral-300">
                                Use built-in quotes ({builtInQuotes.length})
                            </span>

                            <button type="button"
                                onClick={() => setUseBuiltInQuotes(!useBuiltInQuotes)}
                                className={`relative w-11 h-6 rounded-full transition-all duration-300 cursor-pointer ${useBuiltInQuotes
                                    ? "bg-green-500"
                                    : "bg-neutral-700/50"
                                    }`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 
                                        ${useBuiltInQuotes ? "left-6" : "left-1"}`}
                                />
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setShowAllQuotesModal(true);
                                setShowCustomQuotesInModal(false);
                            }}
                            className="flex items-center gap-2 w-full py-2 px-3 rounded-lg bg-neutral-700/50 hover:bg-neutral-700 text-neutral-300 text-sm transition-colors"
                        >
                            <CiCircleList size={16} />
                            Show all built-in quotes
                        </button>
                    </div>

                    {/* CUSTOM QUOTES - ADD NEW QUOTE OPTION */}
                    <div className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/30 space-y-3">

                        <div className="flex items-center justify-between">

                            <span className="text-sm text-neutral-300">
                                Add your own quote
                            </span>

                            <button type="button"
                                onClick={() => setShowAddNewQuoteModal(true)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-700/50 hover:bg-neutral-700 text-neutral-300 text-sm transition-colors"
                            >
                                <MdOutlineAddCircleOutline size={16} />
                                Add New Quote
                            </button>

                        </div>

                        <button type="button"
                            onClick={() => {
                                setShowAllQuotesModal(true);
                                setShowCustomQuotesInModal(true);
                            }}
                            className="flex items-center gap-2 w-full py-2 px-3 rounded-lg bg-neutral-700/50 hover:bg-neutral-700 text-neutral-300 text-sm transition-colors"
                        >
                            <CiCircleList size={16} />
                            Show all of your quotes
                        </button>

                    </div>

                </div>

            )}

        </section>
    );
}
