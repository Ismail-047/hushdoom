import { useSitesStore } from "../zustand/sites.store";

export default function ToogleButton({ id }) {

    const { enabledPlatforms, togglePlatform } = useSitesStore();
    const isEnabled = enabledPlatforms.includes(id);

    return (
        <button onClick={() => togglePlatform(id)}
            className={`relative w-11 h-6 rounded-full transition-all duration-300 cursor-pointer ${isEnabled
                ? "bg-green-500"
                : "bg-neutral-700/50"
                }`}
        >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 
                    ${isEnabled ? "left-6" : "left-1"}`}
            />
        </button>
    )
}