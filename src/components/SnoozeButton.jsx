
export default function SnoozeButton({ time, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${isActive
                ? "bg-linear-to-br from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/25"
                : "bg-neutral-800/60 text-neutral-300 hover:bg-neutral-700/60 hover:text-white border border-neutral-700/30 hover:border-orange-500/30"
                }`}
        >
            {time}
        </button>
    )
}