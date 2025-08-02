import React from 'react';
import { Text, TextStyle, StyleProp, TextProps } from 'react-native'
import { 
  MobileTitle01,
  MobileTitle02,
  MobileBody01,
  MobileBody02,
  MobileButton01,
  MobileBalance01,
  MobileBalance02,
  MobileBalance03,
  FacePrimary,
  MobileTitle04,
  MobileTitle03,
  MobileTitle05,
  MobileBody03,
  MobileButton02,
} from '../../generated-tokens/tokens';

export const groupedTypes = {
  Headings: [
    // --- Headings v2 ---
    'header-xl-v2',
    'header-lg-v2',
    'header-md-v2',
    'header-sm-v2',
    'header-xs-v2',
  ],
  Body: [
    // --- Body v2 ---
    'body-lg-v2',
    'body-lg-bold-v2',
    'body-md-v2',
    'body-md-bold-v2',
    'body-sm-v2',
    'body-sm-bold-v2'
  ],
  Balance: [
    // --- Balance v2 ---
    'balance-lg-v2',
    'balance-md-v2',
    'balance-sm-v2'
  ],
  Button: [
    // --- Button v2 ---
    'button-lrg-v2',
    'button-sm-v2'
  ]
} as const

type FoldTextType = (typeof groupedTypes)[keyof typeof groupedTypes][number]

// Define the props for the FoldText component
interface FoldTextProps extends TextProps {
  type: FoldTextType // Specifies the text style type
  children: React.ReactNode // The content to render inside the text component
  style?: StyleProp<TextStyle> // Additional styles to apply
}

// Define the styles for each text type
// Helper to convert string numeric properties to numbers
function normalizeTextStyle(style: any): TextStyle {
  const numericKeys = ['fontSize', 'lineHeight', 'letterSpacing', 'paragraphSpacing', 'paragraphIndent'];
  const normalized: any = { ...style };
  numericKeys.forEach(key => {
    if (normalized[key] !== undefined && typeof normalized[key] === 'string' && !isNaN(Number(normalized[key]))) {
      normalized[key] = Number(normalized[key]);
    }
  });
  return normalized;
}

export const typeStyles: Record<FoldTextType, TextStyle> = {
  // --- Headings v2 ---
  'header-xl-v2': normalizeTextStyle(MobileTitle01),
  'header-lg-v2': normalizeTextStyle(MobileTitle02),
  'header-md-v2': normalizeTextStyle(MobileTitle03),
  'header-sm-v2': normalizeTextStyle(MobileTitle04),
  'header-xs-v2': normalizeTextStyle(MobileTitle05),
  // --- Body v2 ---
  'body-lg-v2': normalizeTextStyle(MobileBody01),
  'body-lg-bold-v2': normalizeTextStyle(MobileTitle05), // change to BOLD 
  'body-md-v2': normalizeTextStyle(MobileBody02),
  'body-md-bold-v2': normalizeTextStyle(MobileTitle05), // change to BOLD 
  'body-sm-v2': normalizeTextStyle(MobileBody03),
  'body-sm-bold-v2': normalizeTextStyle(MobileTitle05), // change to BOLD 

  // --- Balance v2 ---
  'balance-lg-v2': normalizeTextStyle(MobileBalance01),
  'balance-md-v2': normalizeTextStyle(MobileBalance02),
  'balance-sm-v2': normalizeTextStyle(MobileBalance03),

  // --- Button v2 ---
  'button-lrg-v2': normalizeTextStyle(MobileButton01),
  'button-sm-v2': normalizeTextStyle(MobileButton02)
}

// FoldText component to render styled text based on the provided type
export const FoldText = ({ type = 'body-md-v2', style, children, ...rest }: FoldTextProps) => {
  // Combine the predefined type styles with additional styles and default text color
  const stylesCombined = [
    typeStyles[type], // Predefined style for the given type
    {
      color: FacePrimary // Default text color
    },
    style as TextStyle // Additional styles passed via props
  ]

  return (
    // Render the Text component with the combined styles and other props
    <Text style={stylesCombined} {...rest}>
      {children}
    </Text>
  )
}