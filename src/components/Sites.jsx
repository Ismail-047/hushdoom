import PlatformCard from "./PlatformCard"
import { PLATFORMS } from "../constants/plateforms";
import { useSitesStore } from "../zustand/sites.store";

export default function Sites() {

    const { enabledPlatforms, blockAllPlatforms, unblockAllPlatforms } = useSitesStore();

    const allEnabled = PLATFORMS.length > 0 && enabledPlatforms.length === PLATFORMS.length;

    return (
        <section className="theme-animation space-y-3 min-h-[55vh]">

            <div className="flex items-center justify-between mb-4">

                <h2 className="text-sm font-medium text-neutral-400">
                    Platforms
                </h2>

                {/* BLOCK & UNBLOCK ALL BUTTONS */}
                {allEnabled ? (
                    <button onClick={() => unblockAllPlatforms()}
                        className="text-xs text-neutral-400 hover:text-orange-400 transition-colors">
                        Unblock all
                    </button>
                ) : (
                    <button onClick={() => blockAllPlatforms()}
                        className="text-xs text-neutral-400 hover:text-orange-400 transition-colors">
                        Block all
                    </button>
                )}

            </div>

            {/* PLATFORMS CARDS */}
            <div className="grid grid-cols-2 gap-3">
                {PLATFORMS.map((p) =>
                    <PlatformCard key={p.id} platform={p} />
                )}
            </div>

        </section>
    )
}