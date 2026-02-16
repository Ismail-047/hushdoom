import { FaGithub } from "react-icons/fa6";
import { useHushdoomStore } from "../zustand/hushdoom.store";
import { EXTENSION_GITHUB_URL } from "../constants/constants";

function Header() {

    const { totalSitesEnabled } = useHushdoomStore();

    return (
        <header className="relative mb-8 flex items-center justify-between max-w-6xl mx-auto">

            <div className="flex items-center gap-1 mb-2">

                <div className="w-12 h-12 rounded-xl flex items-center justify-center">

                    <img
                        src="/logo.jpg"
                        alt="Hushdoom"
                        className="w-12 h-12"
                    />

                </div>

                <div>

                    <h1 className="text-2xl font-bold text-white">
                        Hushdoom
                    </h1>

                    <p className="text-[11px] text-gray-200">
                        Focus mode activated
                    </p>

                </div>

            </div>

            <div className="flex items-center gap-4">

                <span className="px-4 py-1.5 rounded-full border border-orange-400 text-xs text-gray-200 font-medium">
                    {totalSitesEnabled} sites blocked
                </span>

                <a href={EXTENSION_GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/15 rounded-md p-2 hover:bg-white/25 transition-all duration-300"
                >
                    <FaGithub size={20} />
                </a>

            </div>

        </header>
    )
}

export default Header