import { Item } from "../common/types/types"


export const generateEmptyItems = (n) => {
  const items:Array<Item> = []
  let countRed = 1
  let countBlue = 1
  for(let i=0; i<n;i++){
    let title = ''
    let type:'Er'|'Le' = 'Er'
    if (i%2===0){
      title = 'Er'+countRed
      type = 'Er'
      countRed++
    }
    else{
      title = 'Le'+countBlue
      type = 'Le'
      countBlue++
    }
    items.push({key:i, title, type, value:0})
  }

  return items
}
