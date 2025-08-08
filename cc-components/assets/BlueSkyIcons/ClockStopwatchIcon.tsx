import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const ClockStopwatchIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M19.5 13.5a7.5 7.5 0 1 0-15 0 7.5 7.5 0 0 0 15 0m-8.5-4a1 1 0 1 1 2 0v3.434l2.015 1.209.085.056a1 1 0 0 1-1.115 1.658l-2.5-1.5A1 1 0 0 1 11 13.5zM4.464 3.385a1 1 0 0 1 1.414 1.414l-1.5 1.5a1 1 0 1 1-1.414-1.414zm13.658 0a1 1 0 0 1 1.338-.069l.076.069 1.5 1.5.069.076a1 1 0 0 1-1.407 1.407l-.076-.07-1.5-1.5-.068-.074a1 1 0 0 1 .068-1.34M21.5 13.5a9.5 9.5 0 0 1-19 0c0-4.909 3.723-8.949 8.5-9.448V3h-1a1 1 0 0 1 0-2h4a1 1 0 1 1 0 2h-1v1.052c4.777.5 8.5 4.539 8.5 9.448" />
    </Svg>
  );
};
