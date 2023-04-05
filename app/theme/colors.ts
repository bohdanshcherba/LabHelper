const palette = {
  neutral100: "#FFFFFF",

  neutral900: "#000000",

  primary100: "#E53935",
  primary200: "#1976D3",

  secondary100: "#7A1CBCFF",
  secondary200: "rgba(122,28,188,0.2)",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",

  eventBg: "#F99393",

  color1: "#E53935",
  color2: "#F5B0AE",
  color3: "#C59E1C",
  color4: "#E8D8A4",
  color5: "#109a5a",
  color6: "#A4EDCC",
  color7: "#1976D3",
  color8: "#A3C8ED",
  color9: "#7A1CBC",
  color10:"#CAA4E4",
  color11:"#B01E80",
  color12:"#DFA5CC",

} as const

export const compareColor=(backgroundColor)=>{
  if(backgroundColor===palette.color1 ||
    backgroundColor===palette.color3 ||
    backgroundColor===palette.color5 ||
    backgroundColor===palette.color7 ||
    backgroundColor===palette.color9 ||
    backgroundColor===palette.color11
  ){
    return '#fff'
  }else{
    return '#000000'
  }

}

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral900,

  /**
   * The default color of the screen background.
   */
  background: palette.neutral100,

  erythrocytes: palette.primary100,
  leukocytes: palette.primary200,


}
