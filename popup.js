/*global $, console, document, google, chrome, escape*/

var DBNAME = "mydb";
var APIKey = "xxx";
var AccessURL = 'https://api.mongolab.com/api/1/databases/' + DBNAME + '/collections/record?apiKey=' + APIKey + '&q=';

var debug = chrome.extension.getBackgroundPage().console;
//var debug = console;

var drawChart = function (data, options, elementId, chartType) {
    "use strict";
    var chart, func;
    func = google.visualization[chartType];
    if (func) {
        chart = new func(document.getElementById(elementId));
        chart.draw(data, options);
    } else {
        debug.log("undefined: " + chartType);
    }
};

var drawLineChart = function () {
    "use strict";
    var data, options, findCMD, findURL;

    options = {
        title: 'Tab Count History',
        legend: { position: 'bottom' }
    };

    data = [['Date', 'Count']];
    findCMD = '&f=' + escape('{"_id": 0}') + '&s=' + escape('{"date": -1}') + '&l=7';
    findURL = AccessURL + findCMD;

    $.getJSON(findURL, function (res) {
        var idx, time;
        for (idx = res.length - 1; idx >= 0; idx = idx - 1) {
            time = (new Date(res[idx].date.$date)).toISOString().slice(5, 10).replace(/-/, "/");
            data.push([time, res[idx].count]);
        }

        drawChart(google.visualization.arrayToDataTable(data), options, 'linechart', 'LineChart');
    });
};

google.load("visualization", "1", {packages: ["corechart"]});
google.setOnLoadCallback(drawLineChart);
