import { author } from "../constants/constants";

export default function Footer() {
    return (
        <footer className="w-full flex items-center justify-between max-w-6xl mx-auto pt-10 pb-2">

            <p className="text-sm text-neutral-500">
                © {new Date().getFullYear()}

                <a href="#" className="text-orange-400 hover:underline transition-colors mx-1">
                    Hushdoom.
                </a>

                All rights reserved.
            </p>

            <div className="flex items-center gap-2 text-sm text-neutral-500">

                Made with ❤️ by

                <a href={author.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:underline transition-colors"
                >
                    {author.name}
                </a>

            </div>

        </footer>
    );
}