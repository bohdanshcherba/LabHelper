export const ukrainianMonth = (monthNumber: number) => {
  return new Date(2023, monthNumber - 1)
    .toLocaleString("uk-UA", { month: "long" })
}

export const ukrainianMonthYear = (date) => {
  const options = { month: "long", year: "numeric", timeZone: "UTC" }

  return date.toLocaleDateString("uk-UA", options)
}

const currentDay = new Date()
const changeDate = (num) => {
  return new Date(currentDay.getFullYear(), currentDay.getMonth() + num, 1)

}

export const getDaysInMonth = (month) => {

  const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 0)
  const startingDayOfWeek = firstDayOfMonth.getDay() // Sunday = 0, Monday = 1, etc.
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const days: Array<any> = []

  // add empty cells for days before the start of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null)
  }

  // add days for the current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(month.getFullYear(), month.getMonth(), i))
  }

  return days
}

export const getMonths = () => {
  const currentMonth = getDaysInMonth(currentDay)

  const months = [currentMonth]

  for (let i = 1; i < 4; i++) {
    months.push(getDaysInMonth(changeDate(i)))
    months.unshift(getDaysInMonth(changeDate(-i)))
  }
  return months
}
