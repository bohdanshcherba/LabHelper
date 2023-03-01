export const ukrainianMonth = (monthNumber: number) => {
  return new Date(2023, monthNumber - 1).toLocaleString("uk-UA", { month: "long" })
}
