import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const MinusIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M19 11a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2z" />
    </Svg>
  );
};
