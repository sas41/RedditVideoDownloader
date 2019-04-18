//Variables
var pattern = new RegExp("^https?:\/\/(www|old|np|nb)\.reddit\.com\/(.*?)\/(.*?)\/(.*?)\/(.*?)\/(.*?)\/", "ig");
var askWhereToSave = true;
var showWarning = true;
var firstLaunch = true;

//Show PageAction
function checkURL(tabId, changeInfo, tab)
 {
    if(pattern.test(tab.url))
    {
    	chrome.pageAction.show(tabId);
    }
};
chrome.tabs.onUpdated.addListener(checkURL);

function startDownload(url)
{
	var downloading = chrome.downloads.download({
	url : url,
	conflictAction : 'uniquify',
	saveAs : askWhereToSave
	});

	if (downloading != undefined)
	{
		downloading.then(function(){}, function(){});
	}
}

function processMessage(request, sender, sendResponse)
{
	if (request.hasAudio && showWarning)
	{
		if (confirm('Unfortunately, Reddit doesn\'t support saving of audio along with the video, Download without audio?'))
		{
			startDownload(request.url);
		}
	}
	else
	{
		startDownload(request.url);
	}

	sendResponse({response: "ALL OK"});
}
chrome.runtime.onMessage.addListener(processMessage);


function startUp()
{
	chrome.storage.local.get(['askWhereToSave'], function(result) {
		askWhereToSave = result.askWhereToSave;
	});

	chrome.storage.local.get(['showWarning'], function(result) {
		showWarning = result.showWarning;
	});

	chrome.storage.local.get(['firstLaunch'], function(result) {
		firstLaunch = result.firstLaunch;
	});

	if (firstLaunch != false)
	{
	    chrome.storage.local.set({
	        'askWhereToSave': true,
	        'showWarning': true,
	        'firstLaunch': false
	    }, function () {});
	    askWhereToSave = true;
	    showWarning = true;
	    firstLaunch = false;
	}
}
startUp();

function updateSettings(changes, namespace) {
	for (key in changes) {
		storageChange = changes[key];
		switch(key) {
		    case 'firstLaunch':
		        firstLaunch = storageChange.newValue;
		        break;
		    case 'askWhereToSave':
		        askWhereToSave = storageChange.newValue;
		        break;
		    case 'showWarning':
		        showWarning = storageChange.newValue;
		        break;
		}
	}
}
chrome.storage.onChanged.addListener(updateSettings);