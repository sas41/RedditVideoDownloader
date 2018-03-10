// ==UserScript==
// @name                Reddit Video Downloader
// @author              Berk "SAS41" Alyamach
// @homepage            https://github.com/sas41/
// @description         A script to that allows you to download videos hosted on Reddit by pressing Ctrl+S or Meta+S on the comments section.
// @iconURL             https://github.com/sas41/RedditVideoDownloader/blob/master/icons/RVD_icon_32.png?raw=true
// @icon64URL           https://github.com/sas41/RedditVideoDownloader/blob/master/icons/RVD_icon_64.png?raw=true

// @copyright           2018, Berk (sas41) Alyamach - https://github.com/sas41/
// @license             MIT
// @grant               none

// @contributionAmount  €1.00
// @contributionURL     https://www.paypal.me/sas41/1

// @namespace           reddit
// @include             *://*reddit.com/r/*/*/*/*/

// @downloadURL         https://raw.githubusercontent.com/sas41/RedditVideoDownloader/master/RedditVideoDownloader.js
// @updateURL           https://raw.githubusercontent.com/sas41/RedditVideoDownloader/master/RedditVideoDownloader.js
// @supportURL          https://github.com/sas41/RedditVideoDownloader/issues
// @version             1.0.3
// ==/UserScript==

// ==OpenUserJS==
// @author              sas41
// @contributionAmount  €1.00
// @contributionURL     https://www.paypal.me/sas41/1
// ==/OpenUserJS==

var jsonLink = document.location.href + '.json';

function getJSON(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            var downloadLink = xhr.response[0].data.children[0].data.secure_media.reddit_video.fallback_url;
            downloadURI(downloadLink, "Video");
        }
        else
        {
            alert('Sorry, Download Failed');
        }
    };
    xhr.send();
}

function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

$(window).bind('keydown', function(event) {
    if (event.ctrlKey || event.metaKey) {
        if (String.fromCharCode(event.which).toLowerCase() === 's')
        {
            event.preventDefault();
            getJSON(jsonLink);
        }
    }
});

