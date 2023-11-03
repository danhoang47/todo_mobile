
function isTomorrow(date) {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    return date.toLocaleDateString().localeCompare(tomorrow.toLocaleDateString()) === 0
}

export default isTomorrow;