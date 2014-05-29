/*global $, chrome, escape*/

var DBNAME = "mydb";
var APIKey = "xxx";
var AccessURL = 'https://api.mongolab.com/api/1/databases/' + DBNAME + '/collections/record?apiKey=' + APIKey + '&q=';
var global_tab_count = 0;
var debug = chrome.extension.getBackgroundPage().console;

String.prototype.startsWith = function (prefix) {
    return this.indexOf(prefix) === 0;
};

function getToday() {
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    return today;
}

function checkNeedsLog(changeInfo) {
    if (changeInfo.status !== "loading")
        return false;

    if (!changeInfo.url)
        return false;

    if (changeInfo.url.startsWith("chrome://"))
        return false;

    return true;
}

function updateTabBadge() {
    chrome.browserAction.setBadgeText({text: global_tab_count.toString()});
}

function DBIncTabCount() {
    var today, url, CMD;
    today = getToday();
    CMD = '{"date":{"$date":' + today.getTime() + '}}&u=true';
    url = AccessURL + CMD;
    $.ajax({
        url: url,
        data: JSON.stringify({"$inc": {"count": 1}}),
        type: 'PUT',
        contentType: 'application/json',
        success: function (res) {
            //debug.log("OK");
        }
    });
}

function getTabCount() {
    var today, findCMD, findURL;
    today = getToday();
    findCMD = escape('{"date":{"$date":' + today.getTime() + '}}');
    findURL = AccessURL + findCMD;

    $.getJSON(findURL, function (res) {
        var count = 0;
        if (res.length !== 0) {
            count = res[0].count;
        }
        global_tab_count = count;
        updateTabBadge();
    });
}

function checkForTabs(tabId, changeInfo, tab) {
    if (checkNeedsLog(changeInfo)) {
        ++global_tab_count;
        DBIncTabCount();
        updateTabBadge();
    }
}


chrome.browserAction.setBadgeBackgroundColor({ color: [255, 128, 255, 255] });
chrome.tabs.onUpdated.addListener(checkForTabs);
debug.log("Hello world");
getTabCount();
