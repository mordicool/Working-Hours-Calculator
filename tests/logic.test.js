require('chai').should();

const sharedData = (() => {
	const startDate = new Date();
	while (startDate.getDay() !== 0) {
		startDate.setDate(startDate.getDate() + 1);
	}
	const endDate = new Date(startDate);

	return {
		options: {
			startHour: 6,
			endHour: 20,
			workingDays: [0, 1, 2, 3, 4]
		},
		startDate,
		endDate
	};
})();

const logic = require('../logic');

describe('Logic.js Tests', () => {
	describe('Calculate Working Diff Function', () => {
		it('should return the working diff from Sunday 9:30 to Thursday 15:45', () => {
			const daysDiff = 4;
			const startDate = new Date(sharedData.startDate);
			startDate.setHours(9, 30, 0, 0);
			const endDate = new Date(sharedData.endDate);
			endDate.setDate(endDate.getDate() + daysDiff);
			endDate.setHours(15, 45, 0, 0);

			const expected = 224100000;

			logic
				.calculateWorkingDiff(startDate, endDate, sharedData.options)
				.should.be.equals(expected);
		});
		it('should return the working diff from Sunday 3:30 to Wednesday 10:00', () => {
			const daysDiff = 3;
			const startDate = new Date(sharedData.startDate);
			startDate.setHours(3, 30, 0, 0);
			const endDate = new Date(sharedData.endDate);
			endDate.setDate(endDate.getDate() + daysDiff);
			endDate.setHours(10, 0, 0, 0);

			const expected = 165600000;

			logic
				.calculateWorkingDiff(startDate, endDate, sharedData.options)
				.should.be.equals(expected);
		});
		it('should return the working diff from Sunday 11:30 to Friday 11:30', () => {
			const daysDiff = 5;
			const startDate = new Date(sharedData.startDate);
			startDate.setHours(11, 30, 0, 0);
			const endDate = new Date(sharedData.endDate);
			endDate.setDate(endDate.getDate() + daysDiff);
			endDate.setHours(11, 30, 0, 0);

			const expected = 232200000;

			logic
				.calculateWorkingDiff(startDate, endDate, sharedData.options)
				.should.be.equals(expected);
		});
		it('should return the working diff from Saturday 16:00 to Wednesday 10:00', () => {
			const daysDiff = 4;
			const startDate = new Date(sharedData.startDate);
			startDate.setDate(startDate.getDate() - 1);
			startDate.setHours(16, 0, 0, 0);
			const endDate = new Date(sharedData.endDate);
			endDate.setDate(endDate.getDate() + (daysDiff - 1));
			endDate.setHours(10, 0, 0, 0);

			const expected = 165600000;

			logic
				.calculateWorkingDiff(startDate, endDate, sharedData.options)
				.should.be.equals(expected);
		});
		it('should return the working diff from Sunday 16:00 to Wednesday next week 10:00', () => {
			const daysDiff = 10;
			const startDate = new Date(sharedData.startDate);
			startDate.setHours(16, 0, 0, 0);
			const endDate = new Date(sharedData.endDate);
			endDate.setDate(endDate.getDate() + daysDiff);
			endDate.setHours(10, 0, 0, 0);

			const expected = 381600000;

			logic
				.calculateWorkingDiff(startDate, endDate, sharedData.options)
				.should.be.equals(expected);
		});
		it('should return the working diff from Sunday 16:00 to Sunday next week 10:00', () => {
			const daysDiff = 7;
			const startDate = new Date(sharedData.startDate);
			startDate.setHours(16, 0, 0, 0);
			const endDate = new Date(sharedData.endDate);
			endDate.setDate(endDate.getDate() + daysDiff);
			endDate.setHours(10, 0, 0, 0);

			const expected = 230400000;

			logic
				.calculateWorkingDiff(startDate, endDate, sharedData.options)
				.should.be.equals(expected);
		});
	});
	describe('Multi Days Complex Diff Function', () => {
		it('', () => {});
	});
	describe('Calculate Full Days Diff Function', () => {
		it('', () => {});
	});
	describe('Remove Days Padding Function', () => {
		it('', () => {});
	});
	describe('Remove Padding Function', () => {
		it('', () => {});
	});
});
