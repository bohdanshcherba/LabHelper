import * as React from "react"
import { ComponentType } from "react"
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle
} from "react-native"


export type IconTypes = keyof typeof iconRegistry

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"]
}

export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props

  const isPressable = !!WrapperProps.onPress
  const Wrapper: ComponentType<TouchableOpacityProps> = WrapperProps?.onPress
    ? TouchableOpacity
    : View


  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      {/*@ts-ignore*/}
      <Image style={[$imageStyle, color && { tintColor: color },
          size && { width: size, height: size },
          $imageStyleOverride]}
        source={iconRegistry[icon]}
      />
    </Wrapper>
  )
}

export const iconRegistry = {
  calendar: require('../../assets/icons/calendar.png'),
  calendar1: require('../../assets/icons/calendar1.png'),
  atom: require('../../assets/icons/atom.png'),
  atom1: require('../../assets/icons/atom2.png'),
  dnk: require('../../assets/icons/dnk.png'),
  statistic: require('../../assets/icons/statistic.png'),
  microscope: require('../../assets/icons/microscope.png'),
  money: require('../../assets/icons/money.png'),
  file: require('../../assets/icons/file.png'),
  square: require('../../assets/icons/square.png'),
  calculator: require('../../assets/icons/calculator.png'),
  reset: require('../../assets/icons/reset.png'),
  pig: require('../../assets/icons/pig.png'),
  cross: require('../../assets/icons/cross.png'),
  pencil: require('../../assets/icons/pencil.png'),
}

const $imageStyle: ImageStyle = {
  resizeMode: "contain"
}
