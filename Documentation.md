# Hushdoom

**Silence the feeds. Reclaim your focus.**

Hushdoom is a Chrome extension that helps you reclaim your focus by hiding the main feeds on social and entertainment sites. Choose which platforms to block, show optional motivational quotes on blocked pages, and add or import your own quotes—all without sending any data outside your browser.

---

## Table of Contents

- [Features](#features)
- [Supported Platforms](#supported-platforms)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Development Guide](#development-guide)
- [How It Works](#how-it-works)
- [State Management](#state-management)
- [Storage & Data Persistence](#storage--data-persistence)
- [Components Overview](#components-overview)
- [Content Script Details](#content-script-details)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

---

## Features

### Core Features

- **Block feeds on 13+ platforms** — Turn blocking on or off per site. When blocking is on, the main feed is hidden and replaced with an optional quote and a link to manage the extension.
- **Choose your platforms** — Selectively enable or disable blocking for individual platforms without affecting others.
- **Motivational quotes on blocked pages** — Show a random quote (built-in or your own) where the feed would be. You can turn this on or off.
- **Custom quotes** — Add quotes manually, import from CSV (with a `text,author` header), use built-in quotes, or mix. All stored locally in Chrome.
- **Snooze functionality** — Temporarily disable blocking for all sites (e.g., 1 min, 5 min, 15 min, 30 min, 1 hour, 6 hours, 12 hours, 24 hours) without changing your settings.
- **Per-platform snooze** — Snooze individual platforms for specific durations directly from the platform card.
- **Privacy-first** — Uses only Chrome's `storage` permission. No analytics, no external servers; everything stays in your browser.

### User Interface Features

- **Tabbed navigation** — Clean interface with four main sections: Sites, Quick Snooze, Quotes, and About.
- **Real-time countdown** — See remaining snooze time with live countdown updates.
- **Visual feedback** — Clear visual indicators for enabled/disabled platforms and active snoozes.
- **Responsive design** — Works seamlessly across different screen sizes.
- **Dark theme** — Modern dark theme optimized for focus and reduced eye strain.

---

## Supported Platforms

| Platform   | Domain(s)         | Feed Selector |
|-----------|-------------------|---------------|
| YouTube   | youtube.com       | `#contents` |
| Instagram | instagram.com     | `main` |
| X / Twitter | x.com, twitter.com | `[data-testid='primaryColumn']` |
| Facebook  | facebook.com      | `[role='main']` |
| LinkedIn  | linkedin.com      | `[data-testid="mainFeed"]` |
| Threads   | threads.com       | `div.x1c1b4dv.x13dflua.x11xpdln` |
| GitHub    | github.com        | `#dashboard` |
| TikTok    | tiktok.com        | `#main-content-homepage_hot` |
| Snapchat  | snapchat.com      | `#root` |
| Pinterest | pinterest.com     | `[role='main']` |
| Reddit    | reddit.com        | `.ListingLayout-outerContainer`, `#subgrid-container` |
| Tumblr    | tumblr.com        | `div._3xgk.Ril26` |
| Bluesky   | bsky.app          | `div.css-g5y9jx.r-sa2ff0` |

---

## Installation

### From Source (Development)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ismail-047/hushdoom.git
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
   This creates a `dist` folder with the compiled extension.

4. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions`
   - Enable **Developer mode** (toggle in the top-right corner)
   - Click **Load unpacked**
   - Select the `dist` folder inside the project directory

5. **Development with live reload**
   ```bash
   npm run dev
   ```
   Then load the `dist` folder as above; the extension will rebuild automatically when you change code.

### From Chrome Web Store

1. Visit the [Chrome Web Store listing](https://chromewebstore.google.com/detail/hushdoom/ehaebfelefohknkndmdhofkppcmlcjib)
2. Click **Add to Chrome**
3. Confirm the installation

### From Firefox Add-ons

1. Visit the [Firefox Add-ons listing](https://addons.mozilla.org/en-US/firefox/addon/hushdoom/)
2. Click **Add to Firefox**
3. Confirm the installation

---

## Usage Guide

### Getting Started

1. **Open the options page**
   - Click the Hushdoom extension icon in your browser toolbar
   - Select **Options**, or right-click the icon → **Options**

2. **Configure platforms**
   - Navigate to the **Sites** tab
   - Toggle platforms on/off using the toggle switches
   - Use **Block all** or **Unblock all** for quick configuration

3. **Set up quotes** (optional)
   - Go to the **Quotes** tab
   - Toggle **Show quotes on blocked pages** if desired
   - Choose to use built-in quotes, custom quotes, or both
   - Add custom quotes using the **Add New Quote** button
   - View all quotes using the **Show all** buttons

4. **Use snooze**
   - **Quick Snooze**: Temporarily disable blocking for all enabled sites
   - **Per-platform snooze**: Click the clock icon on any platform card to snooze that specific platform

### Managing Quotes

- **Add a quote**: Click **Add New Quote** in the Quotes tab, fill in the text and author, then click **Add quote**
- **View all quotes**: Click **Show all built-in quotes** or **Show all of your quotes** to see all available quotes
- **Remove custom quotes**: Open the custom quotes modal and click the trash icon next to any quote
- **Toggle built-in quotes**: Use the toggle switch to include or exclude built-in quotes

### Snooze Options

- **Quick Snooze durations**: 1 min, 5 min, 15 min, 30 min, 1 hour, 6 hours, 12 hours, 24 hours
- **Clear snooze**: Click **Clear all** in the Quick Snooze tab, or use the clock menu on individual platforms
- **Snooze status**: Active snoozes show a countdown timer and orange indicators

---

## Project Structure

```
hushdoom/
├── manifest.json              # Chrome extension manifest (v3)
├── index.html                 # Options page entry point
├── package.json               # Project dependencies and scripts
├── vite.config.js             # Vite build configuration
├── .gitignore                 # Git ignore rules
│
├── public/                    # Static assets
│   └── icons/                 # Extension icons (16px, 48px, 128px)
│       ├── icon16.png
│       ├── icon48.png
│       └── icon128.png
│
├── src/                       # Source code
│   ├── main.jsx               # React application entry point
│   ├── App.jsx                # Main app component with routing logic
│   ├── index.css              # Global styles and Tailwind imports
│   │
│   ├── components/            # React components
│   │   ├── About.jsx          # About page with project info and links
│   │   ├── AddNewQuoteModal.jsx # Modal for adding custom quotes
│   │   ├── AllQuotesModal.jsx # Modal displaying all quotes (built-in or custom)
│   │   ├── BlockedPageContent.jsx # Content shown on blocked pages (quotes + link)
│   │   ├── Footer.jsx         # Footer component with author info
│   │   ├── Header.jsx          # Header with logo, title, and site count
│   │   ├── Navigation.jsx     # Tab navigation component
│   │   ├── PlatformCard.jsx  # Individual platform card with toggle and snooze
│   │   ├── Quotes.jsx         # Quotes management interface
│   │   ├── QuickSnooze.jsx    # Quick snooze controls for all platforms
│   │   ├── Sites.jsx          # Platform list and management
│   │   └── ToogleButton.jsx   # Reusable toggle switch component
│   │
│   ├── constants/             # Constants and configuration
│   │   ├── constants.js      # Storage keys, URLs, and extension constants
│   │   ├── plateforms.js      # Platform definitions, host mappings, feed selectors
│   │   ├── quotes.js          # Built-in motivational quotes array
│   │   ├── snoozeDurations.js # Available snooze duration options
│   │   └── tabs.js            # Navigation tab definitions
│   │
│   ├── scripts/               # Content scripts
│   │   └── script.js          # Content script injected on matched sites
│   │
│   ├── utils/                 # Utility functions
│   │   ├── formatRemainingSnooze.js # Format snooze countdown timer
│   │   └── pickRandomQuote.js # Select random quote from array
│   │
│   └── zustand/               # State management stores
│       ├── hushdoom.store.js  # Global app state (active tab, site count)
│       ├── quotes.store.js    # Quotes state and management
│       ├── sites.store.js     # Platform enable/disable state
│       └── snooze.store.js    # Snooze state and management
│
└── dist/                      # Built extension (generated after build)
    ├── manifest.json
    ├── index.html
    ├── assets/
    └── ...
```

---

## Architecture

### Extension Architecture

Hushdoom follows a standard Chrome Extension Manifest V3 architecture:

1. **Options Page** (`index.html` + React app)
   - User interface for configuring the extension
   - Built with React 19 and Tailwind CSS
   - Communicates with content scripts via Chrome Storage API

2. **Content Script** (`src/scripts/script.js`)
   - Injected into matched websites
   - Monitors page structure and hides/shows feeds based on settings
   - Runs every second to handle dynamic page changes

3. **Manifest** (`manifest.json`)
   - Defines extension metadata, permissions, and content script matches
   - Uses Manifest V3 for modern Chrome extension standards

### Data Flow

```
User Interaction (Options Page)
    ↓
Zustand Store (State Management)
    ↓
Chrome Storage API (chrome.storage.local/sync)
    ↓
Content Script (Reads from storage)
    ↓
DOM Manipulation (Hide/show feeds)
```

### State Management Flow

1. **User toggles a platform** → `sites.store.js` updates → Saves to `chrome.storage.local`
2. **Content script reads storage** → Checks if platform is enabled → Hides/shows feed
3. **User adds a quote** → `quotes.store.js` updates → Saves to `chrome.storage.sync`
4. **Content script reads quotes** → Displays random quote on blocked page

---

## Tech Stack

### Core Technologies

- **React 19.2.0** — UI library for building the options page interface
- **React DOM 19.2.0** — React rendering for the DOM
- **Vite 7.2.4** — Fast build tool and development server
- **Tailwind CSS 4.1.18** — Utility-first CSS framework for styling
- **Zustand 5.0.11** — Lightweight state management library

### Build Tools & Plugins

- **@crxjs/vite-plugin 2.3.0** — Vite plugin for building Chrome extensions
- **@vitejs/plugin-react 5.1.1** — React support for Vite
- **@tailwindcss/vite 4.1.18** — Tailwind CSS Vite plugin

### Development Tools

- **ESLint 9.39.1** — Code linting and quality checks
- **@eslint/js 9.39.1** — ESLint JavaScript configuration
- **eslint-plugin-react-hooks 7.0.1** — React Hooks linting rules
- **eslint-plugin-react-refresh 0.4.24** — React Fast Refresh linting

### UI Libraries

- **react-icons 5.5.0** — Icon library (Lucide, Font Awesome, etc.)
- **@fontsource-variable/outfit 5.2.8** — Variable font for typography

### Browser APIs

- **Chrome Extension APIs**
  - `chrome.storage.local` — Local storage for platform settings and snooze data
  - `chrome.storage.sync` — Sync storage for custom quotes (syncs across devices)
  - `chrome.runtime` — Extension runtime information

---

## Development Guide

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- **Chrome browser** (for testing)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot module replacement. Watches for file changes and rebuilds automatically. |
| `npm run build` | Build the extension for production. Outputs to `dist/` folder. |
| `npm run preview` | Preview the production build locally using Vite's preview server. |
| `npm run lint` | Run ESLint to check code quality and catch potential issues. |

### Development Workflow

1. **Start development server**
   ```bash
   npm run dev
   ```

2. **Load extension in Chrome**
   - Open `chrome://extensions`
   - Enable Developer mode
   - Click "Load unpacked"
   - Select the `dist` folder

3. **Make changes**
   - Edit files in `src/`
   - The extension will automatically rebuild
   - Reload the extension in Chrome to see changes

4. **Test changes**
   - Visit a supported platform (e.g., youtube.com)
   - Toggle blocking in the options page
   - Verify feed hiding/showing works correctly

### Adding a New Platform

1. **Update `src/constants/plateforms.js`**
   ```javascript
   // Add platform to PLATFORMS array
   { id: "newplatform", name: "New Platform", domain: "newplatform.com", icon: IconComponent }
   
   // Add hostname mapping
   "newplatform.com": "newplatform",
   "www.newplatform.com": "newplatform",
   
   // Add feed selector
   newplatform: "#feed-selector"
   ```

2. **Update `manifest.json`**
   ```json
   "matches": [
     "*://*.newplatform.com/*"
   ]
   ```

3. **Test the platform**
   - Build and reload the extension
   - Visit the platform and verify the feed selector works
   - Toggle blocking and verify feed hiding

### Code Style

- Follow React best practices (functional components, hooks)
- Use ESLint configuration provided in the project
- Maintain consistent naming conventions:
  - Components: PascalCase (e.g., `PlatformCard.jsx`)
  - Files: camelCase for utilities, PascalCase for components
  - Constants: UPPER_SNAKE_CASE (e.g., `ENABLED_PLATFORMS_STORAGE_KEY`)

---

## How It Works

### Content Script Execution

1. **Injection**: The content script (`src/scripts/script.js`) is injected into all matched domains defined in `manifest.json`.

2. **Platform Detection**: The script identifies the current platform by checking `window.location.hostname` against the `HOST_TO_ID` mapping.

3. **Storage Check**: Every second, the script:
   - Reads `hushdoom_enabled_platforms` from `chrome.storage.local`
   - Reads `hushdoom_snoozed_platforms` from `chrome.storage.local`
   - Checks if the current platform is enabled and not snoozed

4. **Feed Manipulation**:
   - If enabled and not snoozed: Hides the feed element using CSS (`display: none`)
   - If disabled or snoozed: Shows the feed element (`display: ""`)
   - Injects `BlockedPageContent` component where the feed was located

5. **Quote Display**: If quotes are enabled, the script reads quote settings and displays a random quote on the blocked page.

### Snooze Mechanism

- **Snooze Storage**: Snoozed platforms are stored as an array of objects: `{ platformId: string, until: number }`
- **Expiration Check**: The `until` timestamp is compared with `Date.now()` to determine if snooze is still active
- **Automatic Expiration**: When a snooze expires (current time > `until`), the platform blocking resumes automatically
- **Per-platform vs. All**: Users can snooze individual platforms or all enabled platforms at once

### Quote System

- **Built-in Quotes**: Stored in `src/constants/quotes.js` (52 quotes by default)
- **Custom Quotes**: Stored in `chrome.storage.sync` for cross-device synchronization
- **Random Selection**: Uses `pickRandomQuote()` utility to select a random quote from available quotes
- **Display Logic**: Quotes are only shown if:
  - `showQuotesOnBlockedPages` is `true`
  - At least one quote source (built-in or custom) is enabled
  - The platform feed is actually blocked

---

## State Management

Hushdoom uses **Zustand** for state management with four main stores:

### 1. `hushdoom.store.js` — Global App State

```javascript
{
  activeTab: "sites" | "quick-snooze" | "quotes" | "about",
  totalSitesEnabled: number
}
```

**Purpose**: Manages navigation state and header display.

### 2. `sites.store.js` — Platform Management

```javascript
{
  enabledPlatforms: string[],  // Array of platform IDs
  togglePlatform: (platformId) => void,
  blockAllPlatforms: () => void,
  unblockAllPlatforms: () => void,
  loadEnabledPlatforms: () => Promise<void>
}
```

**Purpose**: Manages which platforms have blocking enabled. Persists to `chrome.storage.local`.

### 3. `quotes.store.js` — Quote Management

```javascript
{
  builtInQuotes: Quote[],
  customQuotes: Quote[],
  showQuotesOnBlockedPages: boolean,
  useBuiltInQuotes: boolean,
  addCustomQuote: (quote) => void,
  removeCustomQuote: (quote) => void,
  setShowQuotesOnBlockedPages: (boolean) => void,
  setUseBuiltInQuotes: (boolean) => void,
  loadCustomQuotesAndSettings: () => Promise<void>
}
```

**Purpose**: Manages quote display settings and custom quotes. Custom quotes persist to `chrome.storage.sync`.

### 4. `snooze.store.js` — Snooze Management

```javascript
{
  snoozedPlatforms: Array<{ platformId: string, until: number }>,
  setPlatformSnooze: (platformId, durationMinutes) => void,
  clearPlatformSnooze: (platformId) => void,
  snoozeAllPlatforms: (durationMinutes, platformIds) => void,
  clearAllSnoozes: () => void,
  loadSnoozedPlatforms: () => Promise<void>
}
```

**Purpose**: Manages temporary blocking disable (snooze). Persists to `chrome.storage.local`.

---

## Storage & Data Persistence

### Chrome Storage API Usage

Hushdoom uses two Chrome Storage APIs:

#### `chrome.storage.local` (Local Storage)

Used for platform settings and snooze data (device-specific):

- **`hushdoom_enabled_platforms`** (Array<string>)
  - Stores IDs of platforms with blocking enabled
  - Example: `["youtube", "instagram", "twitter"]`

- **`hushdoom_snoozed_platforms`** (Array<{platformId: string, until: number}>)
  - Stores snooze information with expiration timestamps
  - Example: `[{platformId: "youtube", until: 1700000000000}]`

- **`hushdoom_show_quotes_on_blocked`** (boolean)
  - Whether to show quotes on blocked pages
  - Default: `true`

- **`hushdoom_use_builtin_quotes`** (boolean)
  - Whether to include built-in quotes
  - Default: `true`

#### `chrome.storage.sync` (Sync Storage)

Used for custom quotes (syncs across devices):

- **`hushdoom_custom_quotes`** (Array<{text: string, author: string}>)
  - User-added custom quotes
  - Example: `[{text: "Stay focused!", author: "Unknown"}]`
  - Syncs across Chrome instances when signed in

### Storage Keys Constants

All storage keys are defined in `src/constants/constants.js`:

```javascript
ENABLED_PLATFORMS_STORAGE_KEY = "hushdoom_enabled_platforms"
SNOOZED_PLATFORMS_STORAGE_KEY = "hushdoom_snoozed_platforms"
CUSTOM_QUOTES_STORAGE_KEY = "hushdoom_custom_quotes"
USE_BUILTIN_QUOTES_KEY = "hushdoom_use_builtin_quotes"
SHOW_QUOTES_ON_BLOCKED_KEY = "hushdoom_show_quotes_on_blocked"
```

---

## Components Overview

### Core Components

#### `App.jsx`
Main application component that:
- Loads initial state from Chrome storage
- Renders header, navigation, and active tab content
- Manages modal visibility

#### `Header.jsx`
Displays:
- Extension logo and name
- Total number of enabled sites
- GitHub link

#### `Navigation.jsx`
Tab navigation with four tabs:
- **Sites**: Platform management
- **Quick Snooze**: Snooze all enabled platforms
- **Quotes**: Quote management
- **About**: Project information

### Platform Management

#### `Sites.jsx`
- Lists all supported platforms
- Provides "Block all" / "Unblock all" buttons
- Renders platform cards in a grid

#### `PlatformCard.jsx`
Individual platform card showing:
- Platform icon and name
- Domain name or snooze status
- Toggle switch for enabling/disabling
- Snooze menu (clock icon) with duration options

#### `ToogleButton.jsx`
Reusable toggle switch component with smooth animations

### Snooze Components

#### `QuickSnooze.jsx`
- Displays snooze duration buttons (1 min to 24 hours)
- Shows active snooze countdown
- Provides "Clear all" button

#### `SnoozeButton.jsx` (if exists)
Individual snooze button component

### Quote Components

#### `Quotes.jsx`
Main quotes management interface:
- Toggle for showing quotes on blocked pages
- Toggle for using built-in quotes
- Buttons to add quotes and view all quotes

#### `AddNewQuoteModal.jsx`
Modal form for adding custom quotes:
- Text input for quote
- Author input
- Validation and submission

#### `AllQuotesModal.jsx`
Modal displaying all quotes:
- Shows built-in or custom quotes based on selection
- Allows deletion of custom quotes
- Scrollable list with quote cards

#### `BlockedPageContent.jsx`
Content injected on blocked pages:
- Displays random quote (if enabled)
- Shows extension link
- Styled for readability

### Utility Components

#### `Footer.jsx`
Footer with copyright and author information

#### `About.jsx`
About page with:
- Project description
- Support information
- Links to GitHub, Chrome Web Store, Firefox Add-ons
- Feature request and bug report instructions

---

## Content Script Details

### File: `src/scripts/script.js`

The content script is the core of Hushdoom's functionality. It runs on all matched domains and handles feed blocking.

#### Key Functions

**`checkAndHide()`**
- Main function that runs every second
- Checks if extension is installed (`chrome.runtime?.id`)
- Identifies current platform from hostname
- Reads enabled and snoozed platforms from storage
- Hides/shows feed based on settings
- Injects `BlockedPageContent` component when feed is hidden

**`getOrCreateExtensionLink(feed)`**
- Creates or retrieves the extension link container
- Uses React to render `BlockedPageContent` component
- Inserts container before the feed element

#### Execution Flow

1. Script loads when page matches manifest patterns
2. Runs at `document_idle` (after DOM is ready)
3. Sets up interval to check every 1000ms
4. On each check:
   - Verifies extension is still installed
   - Gets current hostname
   - Looks up platform ID
   - Reads storage for enabled/snoozed platforms
   - Finds feed element using CSS selector
   - Hides/shows feed based on state
   - Manages extension link display

#### Feed Selectors

Each platform has a specific CSS selector defined in `FEED_SELECTORS`:
- These selectors target the main feed container
- Selectors may need updates if platforms change their DOM structure
- Selectors are tested and verified for each platform

#### Error Handling

- Checks for `chrome.runtime?.id` to ensure extension is installed
- Validates platform ID exists before proceeding
- Handles missing feed elements gracefully
- Falls back to showing feed if selector fails

---

## Contributing

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the code style guidelines
   - Add comments for complex logic
   - Test your changes thoroughly

4. **Commit your changes**
   ```bash
   git commit -m "Add: Description of your changes"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Include screenshots if UI changes

### Contribution Guidelines

- **Bug Reports**: Use GitHub Issues with the bug template
- **Feature Requests**: Use GitHub Discussions in the Ideas board
- **New Platforms**: Submit platform suggestions with feed selector information
- **Code Quality**: Ensure ESLint passes and code follows project conventions
- **Testing**: Test on multiple platforms and browsers when possible

### Areas for Contribution

- **New Platform Support**: Add support for additional social media platforms
- **Bug Fixes**: Fix issues reported in GitHub Issues
- **UI/UX Improvements**: Enhance the user interface and experience
- **Documentation**: Improve documentation and add examples
- **Performance**: Optimize content script execution and storage operations
- **Accessibility**: Improve accessibility features

---

## Support

### Getting Help

- **GitHub Issues**: Report bugs or request features
- **GitHub Discussions**: Ask questions or share ideas
- **Chrome Web Store**: Leave reviews and ratings
- **Firefox Add-ons**: Leave reviews and ratings

### Reporting Bugs

When reporting bugs, please include:
- Browser and version
- Extension version
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots or error messages (if applicable)

### Feature Requests

When suggesting features:
- Describe the use case
- Explain how it would improve the extension
- Consider if it aligns with the project's privacy-first approach

### Supporting the Project

- ⭐ Star the repository on GitHub
- 📝 Leave a review on Chrome Web Store or Firefox Add-ons
- 🐛 Report bugs and issues
- 💡 Suggest new features
- 🔧 Contribute code improvements
- 📢 Share with friends and colleagues

---

## License

[Add your license here, e.g., MIT License]

---

## Author

**Muhammad Ismail**

- Website: [https://themuhammadismail.com](https://themuhammadismail.com)
- GitHub: [@Ismail-047](https://github.com/Ismail-047)

---

## Acknowledgments

- Built as a weekend project to help maintain focus and productivity
- Inspired by the need for tools to combat attention-harvesting platforms
- Thanks to all contributors and users who help improve Hushdoom

---

## Version History

- **v1.0.0** — Initial release
  - Support for 13+ platforms
  - Quote system with built-in and custom quotes
  - Snooze functionality (per-platform and all platforms)
  - Privacy-first architecture with local storage only

---

## Roadmap

Future improvements may include:
- Additional platform support
- Enhanced quote import/export features
- Customizable blocking schedules
- Statistics and usage tracking (privacy-preserving)
- Improved UI/UX enhancements
- Performance optimizations

---

**Made with ❤️ to help you reclaim your focus.**
