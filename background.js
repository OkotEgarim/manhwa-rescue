// background.js
chrome.runtime.onInstalled.addListener(() => {
  // clean up any stale alarms on install/update
  chrome.alarms.getAll(alarms => {
    alarms.forEach(a => chrome.alarms.clear(a.name));
  });
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  const { action, minutes, tabId, url, preset, exactTime } = msg;
  if (!action || !minutes || !tabId) return;
  const alarmName = `yt_timer_${Date.now()}`;
  const endTime = Date.now() + minutes * 60000;
  // create alarm after minutes
  chrome.alarms.create(alarmName, { delayInMinutes: minutes });
  // store mapping for later execution
  const data = {};
  data[alarmName] = { action, tabId, url, endTime, preset, exactTime };
  chrome.storage.local.set(data);
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(alarm.name, (result) => {
    const info = result[alarm.name];
    if (!info) return;

    if (info.action === 'block') {
      // First, try to pause the video just in case
      try {
        chrome.tabs.sendMessage(info.tabId, { cmd: 'pause' });
      } catch (e) {
        // Tab might be inactive/closed, ignore
      }

      // Find the tab's current URL to block the exact video/playlist currently active
      chrome.tabs.get(info.tabId, (tab) => {
        const urlToBlock = (tab && tab.url) ? tab.url : info.url;
        const until = Date.now() + 15 * 60000; // 15 minutes

        chrome.storage.local.get('blocked_urls', (res) => {
          const blockedUrls = res.blocked_urls || [];
          const now = Date.now();
          const activeBlocks = blockedUrls.filter(b => b.until > now);
          
          if (!activeBlocks.some(b => b.url === urlToBlock)) {
            activeBlocks.push({ url: urlToBlock, until });
          }
          
          chrome.storage.local.set({ blocked_urls: activeBlocks }, () => {
            // Redirect the tab immediately to blocked.html with parameters
            chrome.tabs.update(info.tabId, {
              url: chrome.runtime.getURL('blocked.html') + 
                   '?url=' + encodeURIComponent(urlToBlock) + 
                   '&until=' + until
            });
          });
        });
      });
    }

    // clean up alarm storage
    chrome.storage.local.remove(alarm.name);
  });
});

// Intercept tab URL updates to block target video/playlist URLs
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    const newUrl = changeInfo.url;
    // Don't intercept extension pages
    if (newUrl.startsWith(chrome.runtime.getURL(''))) {
      return;
    }

    chrome.storage.local.get('blocked_urls', (res) => {
      const blockedUrls = res.blocked_urls || [];
      const now = Date.now();

      // Check if any block matches and is not expired
      const matchingBlock = blockedUrls.find(b => b.until > now && shouldBlock(newUrl, b.url));
      if (matchingBlock) {
        chrome.tabs.update(tabId, {
          url: chrome.runtime.getURL('blocked.html') + 
               '?url=' + encodeURIComponent(newUrl) + 
               '&until=' + matchingBlock.until
        });
      }
    });
  }
});

// Helper function to check if requested URL matches blocked URL (exact, playlist, video, or substring)
function shouldBlock(requestedUrlStr, blockedUrlStr) {
  if (!requestedUrlStr || !blockedUrlStr) return false;
  try {
    const requested = new URL(requestedUrlStr);
    const blocked = new URL(blockedUrlStr);

    // YouTube playlist check: if both have playlist ID and they are identical
    const reqList = requested.searchParams.get('list');
    const blockList = blocked.searchParams.get('list');
    if (reqList && blockList && reqList === blockList) {
      return true;
    }

    // YouTube video ID check: if both have video ID and they are identical
    const reqV = requested.searchParams.get('v');
    const blockV = blocked.searchParams.get('v');
    if (reqV && blockV && reqV === blockV) {
      return true;
    }

    // Default substring comparison (case-insensitive)
    const reqLower = requestedUrlStr.toLowerCase();
    const blockLower = blockedUrlStr.toLowerCase();
    if (reqLower.includes(blockLower) || blockLower.includes(reqLower)) {
      return true;
    }
  } catch (e) {
    // Fallback if URL parsing fails
    const reqLower = requestedUrlStr.toLowerCase();
    const blockLower = blockedUrlStr.toLowerCase();
    if (reqLower.includes(blockLower) || blockLower.includes(reqLower)) {
      return true;
    }
  }
  return false;
}
