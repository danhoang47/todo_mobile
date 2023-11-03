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

	const firstDateOfThisWeekStr = firstDateOfThisWeek.toLocaleDateString();
	const lastDateOfThisWeekStr = lastDateOfThisWeek.toLocaleDateString();
	const dateStr = date.toLocaleDateString()

	return (
		dateStr.localeCompare(firstDateOfThisWeekStr) > 0 &&
		dateStr.localeCompare(lastDateOfThisWeekStr) < 0
	);
}

export default isInThisWeek;
