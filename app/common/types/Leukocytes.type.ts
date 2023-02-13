import { LeukocyteName } from "../../components/LeukocyteItem"


export type Leukocyte = {
  name: LeukocyteName,
  value:number,
}

export type LeukocytesBlockType= {
  title:string,
  leukocytes: Array<Leukocyte>
}
