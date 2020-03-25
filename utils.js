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

function getFullDay(startHour, endHour) {
	const tempDate = new Date();
	const start = setHour(tempDate, startHour);
	const end = setHour(tempDate, endHour);

	return simpleDiff(start, end);
}

module.exports = {ONE_DAY, NUMBER_OF_WEEK_DAYS, directions, setHour, simpleDiff, isWorkingDay, getFullDay};