export type Analyze = {
  title:string,
  value: number,
}

export type EntreType = {
  date: Date,
  color: string,
  total: number,
  analyzes: Array<Analyze>
}
