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

function download()
{
    browser.tabs.query({currentWindow: true, active: true}, function(tabs){
        getJSON(tabs[0].url.split('?')[0] + '.json');
    });
    console.log("Downloading...");
}
document.getElementById('download').addEventListener('click', download);

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

            downloadFile(downloadLink, url);
        }
        else
        {
            alert('Sorry, Download Failed');
        }
    };
    xhr.send();

    console.log(xhr);
}

function downloadFile(videoURL, postURL)
{
    var cd = new Date(); 
    var datetime = "Last Sync: " + cd.getFullYear() + "-"
                + (cd.getMonth()+1)  + "-"
                + cd.getDate() + " ( "
                + cd.getHours() + ":"
                + cd.getMinutes() + ":"
                + cd.getSeconds() + ")";
    console.log(postURL);
    var postTitle = postURL.split("/").reverse()[1];

    console.log(browser.downloads.download({
        url : videoURL,
        conflictAction : 'uniquify',
        filename : postTitle + '.mp4',
        saveAs : true
    }));
}
