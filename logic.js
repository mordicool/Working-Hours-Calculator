const utils = require('./utils');

function calculateWorkingDiff(startDate, endDate, options) {
	startDate = _removePadding(startDate, options, utils.directions.FORWARD);
	endDate = _removePadding(endDate, options, utils.directions.BACKWARD);
	const daysDiff = _calculateFullDaysDiff(
		startDate,
		endDate,
		options.workingDays
	);

	if (endDate <= startDate) {
		return 0;
	} else if (daysDiff === 0) {
		return utils.simpleDiff(startDate, endDate);
	} else {
		return _multiDaysComplexDiff(startDate, endDate, daysDiff, options);
	}
}

function _removePadding(date, options, direction) {
	let returnDate = date;
	const isForward = direction === utils.directions.FORWARD;
	const isWorkingDay = date => utils.isWorkingDay(date, options.workingDays);

	if (isWorkingDay(date)) {
		let startOfDate = utils.setHour(date, options.startHour);
		let endOfDate = utils.setHour(date, options.endHour);

		if (date < startOfDate) {
			if (isForward) {
				returnDate = startOfDate;
			} else {
				endOfDate.setDate(endOfDate.getDate() - 1);
				returnDate = endOfDate;
			}
		} else if (date > endOfDate) {
			if (isForward) {
				startOfDate.setDate(startOfDate.getDate() + 1);
				returnDate = startOfDate;
			} else {
				returnDate = endOfDate;
			}
		}
	}

	if (!isWorkingDay(date) || !isWorkingDay(returnDate)) {
		return _removeDaysPadding(date, options, direction);
	} else {
		return returnDate;
	}
}

function _removeDaysPadding(date, options, direction) {
	const isForward = direction === utils.directions.FORWARD;
	const hour = isForward ? options.startHour : options.endHour;
	const step = isForward ? 1 : -1;

	const paddedDate = utils.setHour(date, hour);
	while (!utils.isWorkingDay(paddedDate, options.workingDays)) {
		paddedDate.setDate(paddedDate.getDate() + step);
	}

	return paddedDate;
}

function _calculateFullDaysDiff(startDate, endDate, workingDays) {
	const startDateCopy = utils.setHour(startDate, 0);
	const endDateCopy = utils.setHour(endDate, 0);

	const totalDaysDiff = Math.round(
		utils.simpleDiff(startDateCopy, endDateCopy) / utils.ONE_DAY
	);

	let weeks = Math.floor(totalDaysDiff / utils.NUMBER_OF_WEEK_DAYS);
	if (startDate.getDay() > endDate.getDay()) {
		weeks++;
	}

	return (
		totalDaysDiff - weeks * (utils.NUMBER_OF_WEEK_DAYS - workingDays.length)
	);
}

function _multiDaysComplexDiff(startDate, endDate, daysDiff, options) {
	const endOfStartDate = utils.setHour(startDate, options.endHour);
	const firstDayTime = utils.simpleDiff(startDate, endOfStartDate);

	const middleDaysTime =
		(daysDiff - 1) * utils.getFullDay(options.startHour, options.endHour);

	const startOfEndDate = utils.setHour(endDate, options.startHour);
	const lastDayTime = utils.simpleDiff(endDate, startOfEndDate);

	return firstDayTime + middleDaysTime + lastDayTime;
}

module.exports = {
	calculateWorkingDiff,
	_removePadding,
	_removeDaysPadding,
	_calculateFullDaysDiff,
	_multiDaysComplexDiff
};
