import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const HeadphonesIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M7 16.5a1.5 1.5 0 0 0-3 0v2a1.5 1.5 0 0 0 3 0zM20 12a8 8 0 1 0-16 0v1.336A3.5 3.5 0 0 1 9 16.5v2a3.5 3.5 0 1 1-7 0V12C2 6.477 6.477 2 12 2s10 4.477 10 10v6.5a3.5 3.5 0 1 1-7 0v-2a3.5 3.5 0 0 1 5-3.164zm-3 6.5a1.5 1.5 0 0 0 3 0v-2a1.5 1.5 0 0 0-3 0z" />
    </Svg>
  );
};
