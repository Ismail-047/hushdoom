import { TABS } from "../constants/tabs";
import { useHushdoomStore } from "../zustand/hushdoom.store";

export default function Navigation() {

    const { activeTab, setActiveTab } = useHushdoomStore();

    return (
        <nav className="flex gap-1 p-1 bg-white/10 rounded-2xl mb-6 border border-white/30 max-w-4xl mx-auto">

            {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                    <button key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer ${isActive
                            ? "bg-orange-400 text-white"
                            : "text-gray-200 hover:text-white hover:bg-white/10"
                            }`}
                    >
                        <Icon size={18} />

                        <span className="hidden sm:inline">
                            {tab.label}
                        </span>

                    </button>
                )
            })}
        </nav>
    )
}