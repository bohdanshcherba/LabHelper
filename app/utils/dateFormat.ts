export const ukrainianMonth = (monthNumber: number) => {
  return new Date(2023, monthNumber - 1)
    .toLocaleString("uk-UA", { month: "long" })
}

export const ukrainianMonthDay = (date) => {
  const options = { month: "long", day: "numeric" }
  const locale = "uk-UA"
  // @ts-ignore
  const formatter = new Intl.DateTimeFormat(locale, options)
  return formatter.format(date)
}

export const ukrainianMonthYear = (date) => {
  const options = { month: "long", year: "numeric", timeZone: "UTC" }

  return date.toLocaleDateString("uk-UA", options).replace(/^./, (c) => c.toUpperCase())
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

export const getMonths = (n) => {
  const currentMonth = getDaysInMonth(currentDay)

  const months = [currentMonth]

  for (let i = 1; i < n; i++) {
    months.push(getDaysInMonth(changeDate(i)))
    months.unshift(getDaysInMonth(changeDate(-i)))
  }
  return months
}

export const getTodayDate = () => {
  const now = new Date()

  now.setHours(0, 0, 0, 0)

  return now
}
export const formatDateForKey = (date: Date): string => {

  const year = date.getFullYear() // get the year (e.g. 2023)
  const month = ("0" + (date.getMonth() + 1)).slice(-2) // get the month (e.g. 03)
  const day = ("0" + date.getDate()).slice(-2) // get the day (e.g. 04)
  return year + "-" + month + "-" + day
}

export const compareMonths = (date1: string, date2:string) => {



  return new Date(date1).getMonth()!== new Date(date2).getMonth()
}

