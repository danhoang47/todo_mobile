
function compareDate(first, second, order = "asc") {
    const firstDateLocaleString = new Date(first).toLocaleDateString();
    const secondDateLocaleString = new Date(second).toLocaleDateString();

    if (order === 'asc') {
        return firstDateLocaleString.localeCompare(secondDateLocaleString);
    } else if (order === 'desc') {
        return secondDateLocaleString.localeCompare(firstDateLocaleString);
    }

}

export default compareDate;