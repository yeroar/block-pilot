import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const ArrowNarrowUpRightIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M19 14a1 1 0 1 1-2 0V8.414L6.707 18.707a1 1 0 1 1-1.414-1.414L15.586 7H10a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1z" />
    </Svg>
  );
};
