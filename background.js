'use strict';

var URL_TO_REPLACE = 'reddit.com';
var REPLACE_WITH = 'old.reddit.com';

function urlNeedsReplacement(urlToCheck) {
  return urlToCheck.includes('reddit.com') && !urlToCheck.includes('old.reddit');
}

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (urlNeedsReplacement(details.url)) {
      const redirectUrl = details.url
        .replace('www.', '')
        .replace(URL_TO_REPLACE, REPLACE_WITH);
      return {redirectUrl: redirectUrl};
    }
    return {};
  }, 
  {
    urls: [
      '*://reddit.com/*',
      '*://www.reddit.com/*',
    ],
    types: ['main_frame', 'sub_frame', 'stylesheet', 'script', 'image', 'object', 'xmlhttprequest', 'other']
  },
  ['blocking']
);