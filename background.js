function checkURL(tabId, changeInfo, tab) {
    chrome.pageAction.show(tabId);
};

chrome.tabs.onUpdated.addListener(checkURL);