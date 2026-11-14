/*
 * Feature gates for pages that are still being built.
 *
 * Home, Shop and Checkout are hidden unless VITE_SHOW_WIP_PAGES is "true".
 * Set it in .env.local (gitignored) to test them locally; leave it unset on
 * Vercel so visitors only see the "coming soon" landing page.
 *
 * Don't put it in .env: that file is committed, so the flag would ship.
 */
export const SHOW_WIP_PAGES = import.meta.env.VITE_SHOW_WIP_PAGES === "true";
