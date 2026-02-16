# Hushdoom

**Silence the feeds. Reclaim your focus.**

Hushdoom is a Chrome extension that helps you reclaim your focus by hiding the main feeds on social and entertainment sites. Choose which platforms to block, show optional motivational quotes on blocked pages, and add or import your own quotes—all without sending any data outside your browser.

---

## Features

- **Block feeds on 13+ platforms** — Turn blocking on or off per site. When blocking is on, the main feed is hidden and replaced with an optional quote and a link to manage the extension.
- **Choose your platforms** — YouTube, Instagram, X (Twitter), Facebook, LinkedIn, Threads, GitHub, TikTok, Snapchat, Pinterest, Reddit, Tumblr, Bluesky.
- **Motivational quotes on blocked pages** — Show a random quote (built-in or your own) where the feed would be. You can turn this on or off.
- **Custom quotes** — Add quotes manually, import from CSV (with a `text,author` header), use built-in quotes, or mix. All stored locally in Chrome.
- **Snooze** — Temporarily disable blocking for all sites (e.g. 15 min, 1 hour, 3 hours) without changing your settings.
- **Privacy-first** — Uses only Chrome’s `storage` permission. No analytics, no external servers; everything stays in your browser.

---

## Supported platforms

| Platform   | Domain         |
|-----------|----------------|
| YouTube   | youtube.com    |
| Instagram | instagram.com  |
| X / Twitter | x.com, twitter.com |
| Facebook  | facebook.com   |
| LinkedIn  | linkedin.com   |
| Threads   | threads.com    |
| GitHub    | github.com     |
| TikTok    | tiktok.com     |
| Snapchat  | snapchat.com   |
| Pinterest | pinterest.com  |
| Reddit    | reddit.com     |
| Tumblr    | tumblr.com     |
| Bluesky   | bsky.app       |

---

## Installation

### From source (development)

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/hushdoom.git
   cd hushdoom
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run build
   ```

4. **Load in Chrome**
   - Open `chrome://extensions`
   - Enable **Developer mode**
   - Click **Load unpacked**
   - Select the `dist` folder inside the project

5. **Development with live reload**
   ```bash
   npm run dev
   ```
   Then load the `dist` folder as above; the extension will rebuild when you change code.

### Scripts

| Command      | Description                    |
|-------------|--------------------------------|
| `npm run dev`   | Start dev server and watch for changes |
| `npm run build` | Build for production (output in `dist`) |
| `npm run preview` | Preview production build (Vite)   |
| `npm run lint`   | Run ESLint                     |

---

## Usage

1. **Open the options page** — Click the extension icon and choose *Options*, or right‑click the icon → *Options*.
2. **Sites** — Enable blocking for the platforms you want. The feed on those sites will be hidden when you visit them.
3. **Quotes** — Toggle “Show quotes on blocked pages,” choose built-in or custom quotes, and add/import quotes as needed.
4. **Snooze** — Use “Snooze All” to temporarily show feeds again for a set duration.
5. On a **blocked page**, you’ll see the quote (if enabled) and a “Managed by Hushdoom — open extension” link.

---

## Project structure

```
hushdoom/
├── manifest.json          # Chrome extension manifest (v3)
├── index.html             # Options page entry
├── src/
│   ├── main.jsx           # React entry
│   ├── App.jsx            # Options page layout & tabs
│   ├── components/        # React components
│   │   ├── Sites.jsx      # Platform toggles
│   │   ├── Snooze.jsx     # Snooze controls
│   │   ├── Quotes.jsx     # Quote settings & modals
│   │   ├── BlockedPageQoute.jsx  # Quote shown on blocked pages
│   │   ├── ExtensionLink.jsx     # “Open extension” link on blocked pages
│   │   └── ...
│   ├── scripts/
│   │   └── script.js      # Content script (injected on matched sites)
│   ├── zustand/           # State stores (sites, quotes, snooze, etc.)
│   ├── constants/         # Platforms, feed selectors, snooze durations
│   └── data/
│       └── quotes.js      # Built-in quotes
├── dist/                  # Built extension (after npm run build)
└── package.json
```

---

## Tech stack

- **React 19** — UI for the options page
- **Vite 7** — Build tooling
- **Tailwind CSS 4** — Styling
- **Zustand** — State management (sites, quotes, snooze)
- **@crxjs/vite-plugin** — Build Chrome extension from Vite
- **Lucide React** — Icons

---

## Contributing

- **Bugs** — Open an [issue](https://github.com/your-username/hushdoom/issues).
- **New site** — Suggest or upvote in [GitHub Discussions](https://github.com/your-username/hushdoom/discussions).
- **Feature ideas** — Share or upvote in the Ideas discussion board.
- **Code** — PRs welcome for bug fixes and small improvements.

---

## Support the project

- Leave a review on the Chrome Web Store (when published).
- Tell others who might benefit.
- [Buy me a coffee](https://buymeacoffee.com).

---

## License

[Add your license here, e.g. MIT]
