import { useEffect } from "react";

import About from "./components/About";
import Sites from "./components/Sites";
import Header from "./components/Header";
import Quotes from "./components/Quotes";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import QuickSnooze from "./components/QuickSnooze";
import AllQuotesModal from "./components/AllQuotesModal";
import AddNewQuoteModal from "./components/AddNewQuoteModal";

import { useSitesStore } from "./zustand/sites.store";
import { useQuotesStore } from "./zustand/quotes.store";
import { useSnoozeStore } from "./zustand/snooze.store";
import { useHushdoomStore } from "./zustand/hushdoom.store";

export default function App() {

    const { loadSnoozedPlatforms } = useSnoozeStore();
    const { loadCustomQuotesAndSettings } = useQuotesStore();
    const { activeTab, setTotalSitesEnabled } = useHushdoomStore();
    const { enabledPlatforms, loadEnabledPlatforms } = useSitesStore();

    // LOAD ENABLED PLATFORMS FROM THE BROWSER STORAGE ON APP LOAD
    useEffect(() => {
        loadEnabledPlatforms();
    }, [loadEnabledPlatforms]);

    // LOAD SNOOZED PLATFORMS FROM THE BROWSER STORAGE ON APP LOAD
    useEffect(() => {
        loadSnoozedPlatforms();
    }, [loadSnoozedPlatforms]);

    // LOAD CUSTOM QUOTES AND QUOTES RELATED SETTINGS FROM THE BROWSER STORAGE ON APP LOAD
    useEffect(() => {
        loadCustomQuotesAndSettings();
    }, [loadCustomQuotesAndSettings]);

    // UPDATE THE TOTAL SITES ENABLED COUNT IN THE HEADER
    useEffect(() => {
        setTotalSitesEnabled(enabledPlatforms.length);
    }, [enabledPlatforms]);

    return (
        <>

            <Header />

            <Navigation />

            <AddNewQuoteModal />

            <AllQuotesModal />

            <main className="relative max-w-3xl mx-auto">
                {activeTab === "sites" && <Sites />}

                {activeTab === "quick-snooze" && <QuickSnooze />}

                {activeTab === "quotes" && <Quotes />}

                {activeTab === "about" && <About />}
            </main>

            <Footer />

        </>
    )
}