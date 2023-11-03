function isToday(date) {
	return date
		.toLocaleDateString()
		.localeCompare(new Date().toLocaleDateString()) === 0;
}

export default isToday;
