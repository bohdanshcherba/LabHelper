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
} as const

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
