import { useState, useEffect } from "react";
import { LuClock5 } from "react-icons/lu";

import { useSitesStore } from "../zustand/sites.store";
import { useSnoozeStore } from "../zustand/snooze.store";

import { SNOOZE_DURATIONS } from "../constants/snoozeDurations";

import { formatRemainingSnooze } from "../utils/formatRemainingSnooze";

export default function QuickSnooze() {

    const {
        snoozedPlatforms,
        snoozeAllPlatforms,
        clearAllSnoozes
    } = useSnoozeStore();

    const { enabledPlatforms } = useSitesStore();

    const activeUntil = enabledPlatforms
        .map((id) => snoozedPlatforms.find((p) => p.platformId === id)?.until)
        .filter((t) => t != null && t > Date.now());

    const allSnoozedUntil = activeUntil.length > 0 ? Math.min(...activeUntil) : null;

    const hasActiveSnooze = allSnoozedUntil != null;

    // Re-render every second while snoozed so the countdown updates
    const [, setTick] = useState(0);
    useEffect(() => {
        if (!hasActiveSnooze) return;
        const id = setInterval(() => setTick((t) => t + 1), 1000);
        return () => clearInterval(id);
    }, [hasActiveSnooze]);

    return (
        <div className="theme-animation space-y-6">

            <div>

                <h2 className="text-sm font-medium text-neutral-400 mb-2">
                    Quick Snooze.
                </h2>

                <p className="text-xs text-neutral-500 mb-4">
                    Temporarily disable blocking for all enabled sites.
                </p>

            </div>

            {hasActiveSnooze && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 max-w-md mx-auto">

                    <span className="text-xs text-orange-300">
                        All enabled sites snoozed · {formatRemainingSnooze(allSnoozedUntil)} left
                    </span>

                    <button type="button"
                        onClick={clearAllSnoozes}
                        className="text-xs text-orange-300 hover:text-orange-200 underline"
                    >
                        Clear all
                    </button>

                </div>
            )}

            <div className="flex flex-col gap-2">

                {SNOOZE_DURATIONS.map(({ label, minutes }) => (

                    <button key={label}
                        type="button"
                        onClick={() => snoozeAllPlatforms(minutes, enabledPlatforms)}
                        disabled={enabledPlatforms.length === 0}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                            bg-neutral-700/50 text-neutral-300 hover:bg-orange-500/20 hover:text-orange-300
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-700/50 disabled:hover:text-neutral-300 min-w-60 max-w-60 mx-auto
                            transition-colors"
                    >
                        <LuClock5 size={16} />
                        Snooze All {label}
                    </button>
                ))}

            </div>

        </div>
    );
}