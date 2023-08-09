export const convertNumber = (value: string) => {
  try {

    return Number(value) ? Number(value) : 0
  } catch (e) {
    return 0
  }

}
