import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const ArrowNarrowDownLeftIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M17.293 5.293a1 1 0 1 1 1.414 1.414L8.414 17H14a1 1 0 0 1 0 2H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 2 0v5.586z" />
    </Svg>
  );
};
