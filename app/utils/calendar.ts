export const formatDataForWidget = (dates) => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1

  const keys = Object.keys(dates)
  const res = keys.map(key => [key, dates[key].color])


  return res

}
