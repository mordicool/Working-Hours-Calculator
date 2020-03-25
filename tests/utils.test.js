require('chai').should();

const utils = require('../utils');

describe('Utils.js Tests', () => {
	describe('Set Hour Function', () => {
		it('should return same date with the time 06:00', () => {
			const date = new Date(), hour = 6;

			const dateResult = utils.setHour(date, hour);

			(dateResult instanceof Date).should.be.equal(true);
			dateResult.getHours().should.be.equal(hour);
			date.getDate().should.be.equal(date.getDate());
		});
		it('should return same date with the time 00:00', () => {
			const date = new Date(), hour = 0;

			const dateResult = utils.setHour(date, hour);

			(dateResult instanceof Date).should.be.equal(true);
			dateResult.getHours().should.be.equal(hour);
			date.getDate().should.be.equal(date.getDate());
		});
		it('should return same date with the time 12:00', () => {
			const date = new Date(), hour = 12;

			const dateResult = utils.setHour(date, hour);

			(dateResult instanceof Date).should.be.equal(true);
			dateResult.getHours().should.be.equal(hour);
			date.getDate().should.be.equal(date.getDate());
		});
	});
	describe('Simple Diff Function', () => {
		it('should return miliseconds differance between 7:20 to 15:46', () => {
			const date1 = new Date(), date2 = new Date();
			date1.setHours(7, 20, 0, 0);
			date2.setHours(15, 46, 0, 0);

			const expected = (15 - 7) * 60 * 60 * 1000 + (46 - 20) * 60 * 1000;
			utils.simpleDiff(date1, date2).should.be.equals(expected);
		});
		it('should return miliseconds differance between 15:46 to 7:20', () => {
			const date1 = new Date(), date2 = new Date();
			date1.setHours(7, 20, 0, 0);
			date2.setHours(15, 46, 0, 0);

			const expected = (15 - 7) * 60 * 60 * 1000 + (46 - 20) * 60 * 1000;
			utils.simpleDiff(date2, date1).should.be.equals(expected);
		});
		it('should return 0 miliseconds between same date', () => {
			const date = new Date();
			date.setHours(7, 20, 0, 0);
			utils.simpleDiff(date, date).should.be.equals(0);
		});
	});
	describe('Is Working Day Function', () => {
		it('should return true for a working day', () => {
			const date = new Date();
			const workingDays = [1,2,3];
			workingDays.push(date.getDay());

			utils.isWorkingDay(date, workingDays).should.be.equals(true);
		});
		it('should return false for a non working day', () => {
			const date = new Date();
			const workingDays = [1,2,3,4];
			const currentWorkDayIndex = workingDays.indexOf(date.getDay());
			if(currentWorkDayIndex !== -1)
				workingDays.splice(currentWorkDayIndex, 1);

			utils.isWorkingDay(date, workingDays).should.be.equals(false);
		});
	});
	describe('Get Full Day Function', () => {
		it('should return the miliseconds between 6 to 20', () => {
			const expected = (20 - 6) * 60 * 60 * 1000;
			utils.getFullDay(6, 20).should.be.equals(expected);
		});
		it('should return the miliseconds between 0 to 24', () => {
			const expected = (24 - 0) * 60 * 60 * 1000;
			utils.getFullDay(24, 0).should.be.equals(expected);
		});
		it('should return 0 miliseconds between 9 to 9.5', () => {
			utils.getFullDay(9, 9.5).should.be.equals(0);
		});
	});
});