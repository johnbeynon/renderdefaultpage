# Render Service → Events Redirect

A small Chrome extension that redirects Render dashboard **web service**
pages straight to their **Events** tab, instead of landing on the deploys
page.

For example, visiting:

```
https://dashboard.render.com/web/srv-d933bataeets73b1e2i0
```

automatically redirects to:

```
https://dashboard.render.com/web/srv-d933bataeets73b1e2i0/events
```

This only triggers on bare service URLs (`/web/srv-...` with nothing after
the service ID). URLs that already point at a specific tab (e.g. `/logs`,
`/events`) are left alone, so there's no redirect loop.

## How it works

The redirect is applied two ways, since the Render dashboard is a Next.js
app and navigates between pages differently depending on how you get there:

- **`rules.json`** — a `declarativeNetRequest` rule that catches full page
  navigations (typing/pasting the URL, a hard refresh, opening a link in a
  new tab).
- **`background.js`** — a background service worker that listens for
  `chrome.webNavigation.onHistoryStateUpdated`, which catches in-app
  client-side navigations (e.g. clicking a service in the dashboard's own
  UI, which updates the URL via the History API without a full page load).

## Installing in Chrome

1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode** (toggle in the top-right corner).
3. Click **Load unpacked**.
4. Select this folder (`renderdefaultpage`).

The extension is now active — no icon or popup, it just works silently in
the background. To pick up any future changes to the code, click the reload
icon for the extension on the `chrome://extensions` page.

## Uninstalling

Go to `chrome://extensions`, find the extension, and click **Remove**.
