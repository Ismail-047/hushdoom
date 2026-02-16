import { useState, useEffect } from "react";
import { LuClock5 } from "react-icons/lu";

import ToogleButton from "./ToogleButton";

import { useSitesStore } from "../zustand/sites.store";
import { useSnoozeStore } from "../zustand/snooze.store";

import { SNOOZE_DURATIONS } from "../constants/snoozeDurations";

import { formatRemainingSnooze } from "../utils/formatRemainingSnooze";


export default function PlatformCard({ platform }) {

    const Icon = platform.icon;
    const { enabledPlatforms } = useSitesStore();
    const { snoozedPlatforms, setPlatformSnooze, clearPlatformSnooze } = useSnoozeStore();

    const isEnabled = enabledPlatforms.includes(platform.id);
    const [showSnoozeMenu, setShowSnoozeMenu] = useState(false);

    const entry = snoozedPlatforms.find((p) => p.platformId === platform.id);
    const snoozedUntil = entry?.until;
    const isSnoozed = snoozedUntil != null && snoozedUntil > Date.now();

    // Re-render every second while snoozed so the countdown updates
    const [, setTick] = useState(0);
    useEffect(() => {
        if (!isSnoozed) return;
        const id = setInterval(() => setTick((t) => t + 1), 1000);
        return () => clearInterval(id);
    }, [isSnoozed]);

    return (
        <div className={`group relative flex flex-col items-center justify-between p-4 rounded-2xl transition-all duration-300 
            ${isEnabled
                ? "bg-neutral-800/80 border border-neutral-500"
                : "bg-neutral-800/40 border border-neutral-700/50"
            }`}>

            <div className="flex items-center justify-between w-full">

                <div className="flex items-center gap-4 relative z-10">

                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 bg-neutral-700/50`}>
                        <Icon size={20} className={isEnabled ? "text-white" : "text-neutral-400"} />
                    </div>

                    <div>

                        <div className={`font-semibold transition-colors ${isEnabled ? "text-white" : "text-neutral-300"}`}>
                            {platform.name}
                        </div>

                        <div className="text-xs text-neutral-500">
                            {isSnoozed ? (
                                <span className="text-orange-400">
                                    Snoozed · {formatRemainingSnooze(snoozedUntil)} left
                                </span>
                            ) : (
                                platform.domain
                            )}
                        </div>

                    </div>

                </div>

                <div className="flex items-center gap-2 relative">

                    <div className="relative">

                        <button type="button"
                            onClick={(e) => { e.stopPropagation(); setShowSnoozeMenu((v) => !v); }}
                            className={`p-2 rounded-xl transition-colors ${isSnoozed
                                ? "text-orange-400 hover:bg-orange-500/20"
                                : "text-neutral-400 hover:text-orange-400 hover:bg-neutral-700/50"
                                }`}>
                            <LuClock5 size={18} />
                        </button>

                        {showSnoozeMenu && (

                            <div className="absolute right-0 top-full mt-1 py-1 min-w-[140px] rounded-xl bg-neutral-800 border border-neutral-700 shadow-xl z-20"
                                onClick={(e) => e.stopPropagation()}>

                                {isSnoozed && (
                                    <button type="button"
                                        onClick={() => { clearPlatformSnooze(platform.id); setShowSnoozeMenu(false); }}
                                        className="w-full px-3 py-2 text-left text-xs text-neutral-400 hover:bg-neutral-700/50 hover:text-white rounded-t-lg"
                                    >
                                        Clear snooze
                                    </button>
                                )}

                                {SNOOZE_DURATIONS.map(({ label, minutes }) => (
                                    <button
                                        key={label}
                                        type="button"
                                        onClick={() => { setPlatformSnooze(platform.id, minutes); setShowSnoozeMenu(false); }}
                                        className="w-full px-3 py-2 text-left text-sm text-neutral-300 hover:bg-orange-500/20 hover:text-orange-300 rounded-lg"
                                    >
                                        {label}
                                    </button>
                                ))}

                            </div>
                        )}

                    </div>

                    <ToogleButton id={platform.id} />

                </div>

            </div>

        </div>
    )
}