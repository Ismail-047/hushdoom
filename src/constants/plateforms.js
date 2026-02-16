import { BsThreads } from "react-icons/bs"
import { FaFacebookF, FaInstagram, FaPinterestP, FaTumblr } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { IoLogoYoutube } from "react-icons/io5"
import { PiSnapchatLogoBold } from "react-icons/pi"
import { SlSocialLinkedin } from "react-icons/sl"
import { TbBrandBluesky, TbBrandReddit } from "react-icons/tb"
import { FaTiktok } from "react-icons/fa6"
import { FaGithub } from "react-icons/fa6"

export const PLATFORMS = [
   { id: "youtube", name: "YouTube", domain: "youtube.com", icon: IoLogoYoutube },
   { id: "instagram", name: "Instagram", domain: "instagram.com", icon: FaInstagram },
   { id: "twitter", name: "Twitter / X", domain: "x.com", icon: FaXTwitter },
   { id: "facebook", name: "Facebook", domain: "facebook.com", icon: FaFacebookF },
   { id: "linkedin", name: "LinkedIn", domain: "linkedin.com", icon: SlSocialLinkedin },
   { id: "threads", name: "Threads", domain: "threads.com", icon: BsThreads },
   { id: "github", name: "GitHub", domain: "github.com", icon: FaGithub },
   { id: "tiktok", name: "TikTok", domain: "tiktok.com", icon: FaTiktok },
   { id: "snapchat", name: "Snapchat", domain: "snapchat.com", icon: PiSnapchatLogoBold },
   { id: "pinterest", name: "Pinterest", domain: "pinterest.com", icon: FaPinterestP },
   { id: "reddit", name: "Reddit", domain: "reddit.com", icon: TbBrandReddit },
   { id: "tumblr", name: "Tumblr", domain: "tumblr.com", icon: FaTumblr },
   { id: "bluesky", name: "Bluesky", domain: "bsky.app", icon: TbBrandBluesky },
]

export const HOST_TO_ID = {
   // Facebook
   "www.facebook.com": "facebook",
   "facebook.com": "facebook",

   // Instagram
   "www.instagram.com": "instagram",
   "instagram.com": "instagram",

   // YouTube
   "www.youtube.com": "youtube",
   "youtube.com": "youtube",

   // Reddit
   "www.reddit.com": "reddit",
   "reddit.com": "reddit",

   // Twitter
   "x.com": "twitter",
   "www.x.com": "twitter",
   "www.twitter.com": "twitter",
   "twitter.com": "twitter",

   // GitHub
   "www.github.com": "github",
   "github.com": "github",

   // LinkedIn
   "www.linkedin.com": "linkedin",
   "linkedin.com": "linkedin",

   // Threads
   "www.threads.com": "threads",
   "threads.com": "threads",

   // TikTok
   "www.tiktok.com": "tiktok",
   "tiktok.com": "tiktok",

   // Snapchat
   "www.snapchat.com": "snapchat",
   "snapchat.com": "snapchat",

   // Pinterest
   "www.pinterest.com": "pinterest",
   "pinterest.com": "pinterest",

   // Reddit
   "www.reddit.com": "reddit",
   "reddit.com": "reddit",

   // Tumblr
   "www.tumblr.com": "tumblr",
   "tumblr.com": "tumblr",

   // Bluesky
   "www.bsky.app": "bluesky",
   "bsky.app": "bluesky",
}

export const FEED_SELECTORS = {
   facebook: "[role='main']",
   instagram: "main",
   youtube: "#contents",
   reddit: ".ListingLayout-outerContainer",
   twitter: "[data-testid='primaryColumn']",
   github: "#dashboard",
   linkedin: `[data-testid="mainFeed"]`,
   threads: "div.x1c1b4dv.x13dflua.x11xpdln",
   tiktok: "#main-content-homepage_hot",
   snapchat: "#root",
   pinterest: "[role='main']",
   reddit: "#subgrid-container",
   tumblr: "div._3xgk.Ril26",
   bluesky: "div.css-g5y9jx.r-sa2ff0",
}