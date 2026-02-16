import { FaRegHeart } from "react-icons/fa";
import { LuBug, LuLightbulb, LuMessageCircle } from "react-icons/lu";
import {
    EXTENSION_GITHUB_URL,
    EXTENSION_CHROME_WEB_STORE_URL,
    EXTENSION_FIREFOX_ADD_ONS_URL,
} from "../constants/constants";

export default function About() {
    return (
        <div className="theme-animation space-y-6">

            <div className="text-center pt-5">

                <img
                    src="/logo.jpg"
                    alt="Hushdoom"
                    className="w-20 mx-auto"
                />

                <h2 className="text-xl font-bold text-white">
                    Hushdoom
                </h2>

                <p className="text-xs text-neutral-400 mb-6">
                    Version 1.0.0
                </p>

            </div>

            <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">

                <p>
                    I built Hushdoom as a weekend project to help defend myself against endless feeds and distracting sites. I never expected it to be useful to many others, but I put it out there anyway.
                </p>

                <p>
                    What I couldn’t have predicted was how much the assault on our attention would grow, or the impact it would have on how we work and live. We’re now in the middle of a huge, for-profit experiment on human attention, and we need tools to push back.
                </p>

            </div>

            <section className="space-y-3">

                <h3 className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                    <FaRegHeart
                        size={16}
                        className="text-orange-400"
                    />
                    How to support this project
                </h3>

                <p className="text-sm text-neutral-400">
                    Thanks! You can help in a few ways:
                </p>

                <ul className="space-y-2 text-sm text-neutral-300 list-disc list-inside pl-1">

                    <li>
                        Leave a review on the {" "}
                        <a href={EXTENSION_FIREFOX_ADD_ONS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-400 hover:underline transition-colors"
                        >
                            Chrome Web Store
                        </a>
                        {" "} or {" "}
                        <a href={EXTENSION_CHROME_WEB_STORE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-400 hover:underline transition-colors"
                        >
                            Firefox Add-ons.
                        </a>
                    </li>

                    <li>Tell your friends about the extension.</li>

                    <li>
                        Contribute bug fixes or improvements on {" "}
                        <a href={EXTENSION_GITHUB_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-400 hover:underline transition-colors"
                        >
                            GitHub.
                        </a>
                    </li>

                </ul>

            </section>

            <section className="space-y-3">

                <h3 className="text-sm font-medium text-neutral-400 flex items-center gap-2">

                    <LuMessageCircle
                        size={16}
                        className="text-orange-400"
                    />
                    I want to suggest a new site

                </h3>

                <p className="text-sm text-neutral-300">
                    Submit or upvote suggestions for new sites on the GitHub discussions board.
                </p>

            </section>

            <section className="space-y-3">

                <h3 className="text-sm font-medium text-neutral-400 flex items-center gap-2">

                    <LuLightbulb
                        size={16}
                        className="text-orange-400"
                    />
                    I want to suggest a feature

                </h3>

                <p className="text-sm text-neutral-300">
                    If you have an idea, submit it (or upvote it if it already exists) on the GitHub Ideas discussion board. This is a spare-time project and I try to keep it simple, but I do read and consider everything.
                </p>

            </section>

            <section className="space-y-3">

                <h3 className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                    <LuBug
                        size={16}
                        className="text-orange-400"
                    />
                    The site isn’t working or I found a bug
                </h3>

                <p className="text-sm text-neutral-300">
                    Please report bugs as an issue on {" "}

                    <a href={EXTENSION_GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-400 hover:underline transition-colors"
                    >
                        GitHub
                    </a>.
                </p>

            </section>

        </div>
    );
}
