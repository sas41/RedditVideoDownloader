//Variables
var pattern = new RegExp("^https?:\/\/(www|old|np|nb)\.reddit\.com\/(.*?)\/(.*?)\/(.*?)\/(.*?)\/(.*?)\/", "ig");
var askWhereToSave = true;
var showWarning = true;
var firstLaunch = true;
var callCount = 0;

//Show PageAction
function checkURL(tabId, changeInfo, tab)
 {
    if(pattern.test(tab.url))
    {
    	browser.pageAction.show(tabId);
    }
};
browser.tabs.onUpdated.addListener(checkURL);
