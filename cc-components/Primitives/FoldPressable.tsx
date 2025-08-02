import React, { ReactNode } from 'react'
import { Pressable, PressableProps, ViewStyle } from 'react-native'

interface FoldPressableProps extends PressableProps {
  children?: ReactNode | string
  style?: ViewStyle // Style for the button itself
}
export default function FoldPressable({ style, children, ...props }: FoldPressableProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          ...{ opacity: pressed ? 0.5 : 1.0 },
          ...(style || {})
        }
      ]}
      {...props}
    >
      {children}
    </Pressable>
  )
}
