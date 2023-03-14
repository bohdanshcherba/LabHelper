export type Analyze = {
  title: string,
  value: number,
}

export type EntreType = {
  markingColor?: { name: string, color: string },
  total?: number,
  analyzes?: Array<Analyze>

}

export type EntriesType = {
  [key: string]: EntreType
}
