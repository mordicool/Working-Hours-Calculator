# Working Hours Calculator

This is a working hours time calculator. Use it to calculate the work time of your workers.

```bash
$ npm install working-hours-calculator
```

```js
const workingHourCalculator = require('working-hours-calculator');

workingHourCalculator.calculate(date1, date2, options);

/*
 * startDate: Date object
 * endDate: Date object
 * options: {
   * startHour: Whole Number,
   * endHour: Whole Number,
   * workingDays: Array of Numbers {0-6}
 * }
 
 */
```

Have Fun!
