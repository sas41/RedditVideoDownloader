function youTubeDL()
{
	if(document.getElementById('youTubeDL').style.display=='none')
	{
			document.getElementById('youTubeDL') .style.display=''
	}
	else
	{
		document.getElementById('youTubeDL') .style.display='none'
	}
}
document.getElementById('showYouTubeDL').addEventListener('click', youTubeDL);

function toggleHelp()
{
	if(document.getElementById('help').style.display=='none')
	{
			document.getElementById('help') .style.display=''
	}
	else
	{
		document.getElementById('help').style.display='none'
	}
}
document.getElementById('showHelp').addEventListener('click', toggleHelp);

function toggleSetting()
{
	if(document.getElementById('settings').style.display=='none')
	{
			document.getElementById('settings') .style.display=''
	}
	else
	{
		document.getElementById('settings').style.display='none'
	}
}
document.getElementById('showSettings').addEventListener('click', toggleSetting);

function changeSetting() {

    chrome.storage.local.set({
        'askWhereToSave': document.querySelector('#askWhereToSave').checked,
        'showWarning': document.querySelector('#showWarning').checked
    }, function () {

    });
}
document.getElementById('askWhereToSave').addEventListener('click', changeSetting);
document.getElementById('showWarning').addEventListener('click', changeSetting);

document.addEventListener('DOMContentLoaded', function() {

	chrome.storage.local.get(['askWhereToSave'], function(result) {
	   document.querySelector('#askWhereToSave').checked = result.askWhereToSave;
	});

	chrome.storage.local.get(['showWarning'], function(result) {
	   document.querySelector('#showWarning').checked = result.showWarning;
	});

});