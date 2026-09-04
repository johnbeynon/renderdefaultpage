const SERVICE_PAGE_PATTERN = /^https:\/\/dashboard\.render\.com\/web\/(srv-[a-zA-Z0-9]+)\/?$/;

chrome.webNavigation.onHistoryStateUpdated.addListener(
  (details) => {
    const match = details.url.match(SERVICE_PAGE_PATTERN);
    if (match) {
      chrome.tabs.update(details.tabId, {
        url: `https://dashboard.render.com/web/${match[1]}/events`,
      });
    }
  },
  { url: [{ hostEquals: "dashboard.render.com" }] }
);
