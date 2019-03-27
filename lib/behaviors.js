'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isNonWorkingTime = exports.getEventText = exports.getDateLabel = exports.getSummary = undefined;

var _index = require('./index');

//getSummaryFuncExample
var getSummary = exports.getSummary = function getSummary(schedulerData, headerEvents, slotId, slotName, headerStart, headerEnd) {
    return { text: 'Summary', color: 'red', fontSize: '1.2rem' };
};

//getDateLabelFuncExample
var getDateLabel = exports.getDateLabel = function getDateLabel(schedulerData, viewType, startDate, endDate) {
    var start = schedulerData.localeMoment(startDate);
    var end = schedulerData.localeMoment(endDate);
    var dateLabel = start.format('MMM D, YYYY');

    if (viewType === _index.ViewTypes.Week) {
        dateLabel = start.format('MMM D') + '-' + end.format('D, YYYY');
        if (start.month() !== end.month()) dateLabel = start.format('MMM D') + '-' + end.format('MMM D, YYYY');
        if (start.year() !== end.year()) dateLabel = start.format('MMM D, YYYY') + '-' + end.format('MMM D, YYYY');
    } else if (viewType === _index.ViewTypes.Month) {
        dateLabel = start.format('MMMM YYYY');
    } else if (viewType === _index.ViewTypes.Quarter) {
        dateLabel = start.format('MMM D') + '-' + end.format('MMM D, YYYY');
    } else if (viewType === _index.ViewTypes.Year) {
        dateLabel = start.format('YYYY');
    }

    return dateLabel;
};

var getEventText = exports.getEventText = function getEventText(schedulerData, event) {
    if (!schedulerData.isEventPerspective) return event.title;

    var eventText = event.title;
    schedulerData.resources.forEach(function (item) {
        if (item.id === event.resourceId) {
            eventText = item.name;
        }
    });

    return eventText;
};

var isNonWorkingTime = exports.isNonWorkingTime = function isNonWorkingTime(schedulerData, time) {
    var localeMoment = schedulerData.localeMoment;

    if (schedulerData.viewType === _index.ViewTypes.Day) {
        var hour = localeMoment(time).hour();
        if (hour < 9 || hour > 18) return true;
    } else {
        var dayOfWeek = localeMoment(time).weekday();
        if (dayOfWeek === 0 || dayOfWeek === 6) return true;
    }

    return false;
};

exports.default = {
    //getSummaryFunc: getSummary,
    getSummaryFunc: undefined,
    getDateLabelFunc: getDateLabel,
    getEventTextFunc: getEventText,
    isNonWorkingTimeFunc: isNonWorkingTime
};