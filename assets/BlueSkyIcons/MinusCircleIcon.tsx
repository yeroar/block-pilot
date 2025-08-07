import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const MinusCircleIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M21 12a9 9 0 1 0-18 0 9 9 0 0 0 18 0m-5-1a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2zm7 1c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11" />
    </Svg>
  );
};
