import { LeukocyteName } from "../../components/LeukocyteItem"


export type Leukocyte = {
  name: LeukocyteName,
  value: number,
}

export type LeukocytesBlockType = {
  title: string,
  total: number,
  leukocytes: Array<Leukocyte>,
  platelet: boolean,
  SOE: { A: number, B: number, C: number, X: number },
  NST: { A: number, B: number, C: number, X: number },
  KP: { A: number, B: number, C: number, X: number },
  TRO: { A: number, B: number, C: number, X: number },


}
