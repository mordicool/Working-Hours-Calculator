const ONE_DAY = 24 * 60 * 60 * 1000;
const NUMBER_OF_WEEK_DAYS = 7;
const directions = {
    FORWARD: 'farward',
    BACKWARD: 'backward'
};

function setHour(date, hour) {
    const newDate = new Date(date);
    newDate.setHours(hour, 0, 0, 0);
    return newDate;
}

function simpleDiff(date1, date2) {
    return Math.abs(date1 - date2);
}

function isWorkingDay(date, workingDays) {
    return workingDays.includes(date.getDay());
}

module.exports = {ONE_DAY, NUMBER_OF_WEEK_DAYS, directions, setHour, simpleDiff, isWorkingDay};