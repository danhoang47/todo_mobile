const LAST_DAY_OF_WEEK = 6;
const FIRST_DAY_OF_WEEK = 0;

function isInThisWeek(date) {
	const thisWeekRandomDate = new Date();
	const dayInWeek = thisWeekRandomDate.getDay();
	let firstDateOfThisWeek;
	let lastDateOfThisWeek;

	if (dayInWeek === LAST_DAY_OF_WEEK) {
		lastDateOfThisWeek = thisWeekRandomDate;
		firstDateOfThisWeek = new Date();
		firstDateOfThisWeek.setDate(
			firstDateOfThisWeek.getDate() - LAST_DAY_OF_WEEK
		);
	} else if (dayInWeek === FIRST_DAY_OF_WEEK) {
		lastDateOfThisWeek = thisWeekRandomDate;
		firstDateOfThisWeek = new Date();
		lastDateOfThisWeek.setDate(
			lastDateOfThisWeek.getDate() + LAST_DAY_OF_WEEK
		);
	} else {
		firstDateOfThisWeek = new Date();
		firstDateOfThisWeek.setDate(firstDateOfThisWeek.getDate() - dayInWeek);
		lastDateOfThisWeek = new Date();
		lastDateOfThisWeek.setDate(
			lastDateOfThisWeek.getDate() + (LAST_DAY_OF_WEEK - dayInWeek)
		);
	}

	const firstDateOfThisWeekTime = firstDateOfThisWeek.getTime();
	const lastDateOfThisWeekTime = lastDateOfThisWeek.getTime();
	const dateTime = date.getTime();
	
	return (
		dateTime > firstDateOfThisWeekTime && dateTime < lastDateOfThisWeekTime
	);
}

export default isInThisWeek;
