var jsonLink = document.location.href.split('?')[0] + '.json';

function getJSON(url)
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function()
    {
        var status = xhr.status;
        if (status === 200)
        {
            var response = xhr.response;
            var showWarning = true;
            var downloadLink = response[0].data.children[0].data.secure_media.reddit_video.fallback_url;
            var hasAudio = !response[0].data.children[0].data.secure_media.reddit_video.is_gif;

            downloadFile(downloadLink, hasAudio);
        }
        else
        {
            alert('Sorry, Download Failed');
        }
    };
    xhr.send();
}

function downloadFile(url, hasAudio)
{
    var sending = chrome.runtime.sendMessage({
        url: url,
        hasAudio: hasAudio
    });
    if (sending != undefined)
    {
    sending.then(handleResponse, handleError);
    }
}

function handleResponse(message) {
    console.log(`RVD: Message from the background script:  ${message.response}`);
}

function handleError(error) {
    console.log(`RVD: Error: ${error}`);
    alert('Sorry, Download Failed');
}

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey)
    {
        if (event.key === 's' || event.key === 'S' )
        {
            event.preventDefault();
            getJSON(jsonLink);
        }
    }
});