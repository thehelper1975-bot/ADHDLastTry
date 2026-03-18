"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateStreak = calculateStreak;
function calculateStreak(completedDates) {
    if (!completedDates || completedDates.length === 0) {
        return 0;
    }
    // Sort dates in descending order
    var sortedDates = __spreadArray([], new Set(completedDates), true).sort(function (a, b) { return b.localeCompare(a); });
    var todayStr = new Date().toISOString().split('T')[0];
    // Yesterday
    var yesterday = new Date();
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    var yesterdayStr = yesterday.toISOString().split('T')[0];
    var streak = 0;
    var expectedDateStr = '';
    if (sortedDates.includes(todayStr)) {
        expectedDateStr = todayStr;
    }
    else if (sortedDates.includes(yesterdayStr)) {
        expectedDateStr = yesterdayStr;
    }
    else {
        return 0; // Streak broken
    }
    var currentDate = new Date(expectedDateStr + 'T00:00:00Z');
    for (var _i = 0, sortedDates_1 = sortedDates; _i < sortedDates_1.length; _i++) {
        var dateStr = sortedDates_1[_i];
        if (dateStr === expectedDateStr) {
            streak++;
            // Move expected date back by one day
            currentDate.setUTCDate(currentDate.getUTCDate() - 1);
            expectedDateStr = currentDate.toISOString().split('T')[0];
        }
        else if (dateStr > expectedDateStr) {
            // Ignore future dates
            continue;
        }
        else {
            // Gap found
            break;
        }
    }
    return streak;
}
