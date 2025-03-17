chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed!");
});

// Listener for active tab updates
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  console.log(`Active tab URL: ${tab.url}`);
});

// Listener for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    console.log(`Tab URL updated: ${tab.url}`);
  }
});