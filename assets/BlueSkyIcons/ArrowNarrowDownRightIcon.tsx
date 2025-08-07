import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const ArrowNarrowDownRightIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M5.293 5.293a1 1 0 0 1 1.414 0L17 15.586V10a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1h-8a1 1 0 1 1 0-2h5.586L5.293 6.707a1 1 0 0 1 0-1.414" />
    </Svg>
  );
};
