const defaults = require('./defaults.json');
const logic = require('./logic.js');

/*
 * startDate: Date object
 * endDate: Date object
 * options: {
 *  startHour: Whole Number,
 *  endHour: Whole Number,
 *  workingDays: Array of Numbers {0-6}
 * }
 */
function calculate(startDate, endDate, options = defaults) {
	return logic.calculateWorkingDiff(startDate, endDate, options);
}

module.exports = { calculate };
