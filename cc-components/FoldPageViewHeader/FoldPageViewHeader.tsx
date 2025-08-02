import React from 'react';
import { View, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FoldText } from '../Primitives/FoldText';
import FoldPressable from '../Primitives/FoldPressable';
import {
  ObjectPrimaryBoldDefault,
  ObjectPrimaryBoldPressed,
  ObjectSecondaryDefault,
  ObjectSecondaryPressed,
  ObjectDisabledDisabled,
  FacePrimary,
  FaceDisabled,
} from '../../generated-tokens/tokens';

const TOKENS = {
  colors: {
    default: ObjectPrimaryBoldDefault,
    pressed: ObjectPrimaryBoldPressed,
    secondaryDefault: ObjectSecondaryDefault,
    secondaryPressed: ObjectSecondaryPressed,
    disabled: ObjectDisabledDisabled,
    textPrimary: FacePrimary,
    textDisabled: FaceDisabled,
  },
};

type FoldPageViewHeaderProps = {
  title?: string
  subTitle?: string
  leftIcon?: string
  rightIcon?: string
  onLeftPress?: () => void
  onRightPress?: () => void
  leftComponent?: React.ReactNode
  rightComponent?: React.ReactNode
  backgroundColor?: string
  rightIconColor?: string
  titleColor?: string
}

const HEADER_HEIGHT = 48

const FoldPageViewHeader = ({
  title,
  subTitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  leftComponent,
  rightComponent,
  backgroundColor,
  rightIconColor,
  titleColor
}: FoldPageViewHeaderProps) => {

  const insets = useSafeAreaInsets()

  const containerPaddingVertical = 4

  const containerPaddingHorizontal = 16

  const gap = 4

  const [rightSideWidth, setRightSideWidth] = React.useState(0)

  const [leftSideWidth, setLeftSideWidth] = React.useState(0)

  const iconStyles = {
    padding: 8
  }

  const headerTextColor = titleColor || TOKENS.colors.textPrimary

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: backgroundColor || 'transparent',
        height: HEADER_HEIGHT + insets.top,
        paddingTop: insets.top,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Center part */}
      <View
        style={{
          alignItems: 'center',
          gap: gap,
          maxWidth:
            Dimensions.get('window').width -
            leftSideWidth -
            rightSideWidth -
            containerPaddingHorizontal - // do it twice once for each side
            containerPaddingHorizontal -
            gap -
            45, // Random number that seems to work well for most devices
          marginVertical: containerPaddingVertical
        }}
      >
        <FoldText
          type="header-xl-v2"
          style={{
            textAlign: 'center',
            color: titleColor || headerTextColor,
          }}>
            {title || 'Default Title'} {/* Provide a fallback value for title */}
        </FoldText>
      </View>

      {/* Left side */}
      <View
        onLayout={event => {
          setLeftSideWidth(event.nativeEvent.layout.width)
        }}
        style={{
          alignItems: 'flex-start',
          position: 'absolute',
          left: 0,
          marginLeft: containerPaddingHorizontal,
          marginVertical: containerPaddingVertical,
          paddingTop: insets.top,
          backgroundColor: backgroundColor || 'transparent'
        }}
      >
        {leftComponent ||
          (leftIcon && onLeftPress && (
            <FoldPressable style={iconStyles} onPress={onLeftPress}>
              {/* <FoldIcon
                name={leftIcon}
                size={20}
                color={headerTextColor}
                weight={300}
              /> */}
              <View
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: 'red'
                }}
              />
            </FoldPressable>
          ))}
      </View>

      {/* Right side */}
      <View
        onLayout={event => {
          setRightSideWidth(event.nativeEvent.layout.width)
        }}
        style={{
          alignItems: 'flex-end',
          position: 'absolute',
          right: 0,
          marginRight: containerPaddingHorizontal,
          marginVertical: containerPaddingVertical,
                    paddingTop: insets.top,

          backgroundColor: backgroundColor || 'transparent'
        }}
      >
        {rightComponent ||
          (rightIcon && onRightPress && (
            <FoldPressable style={iconStyles} onPress={onRightPress}>
              {/* <FoldIcon
                name={rightIcon}
                size={20}
                color={rightIconColor || themeColors.text}
                weight={300}
              /> */}
              <View
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: 'red'
                }}
              />
            </FoldPressable>
          ))}
      </View>
    </View>
  )
}

export default FoldPageViewHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  }
})
