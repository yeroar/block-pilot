import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const HelpCircleIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M21 12a9 9 0 1 0-18 0 9 9 0 0 0 18 0m-8.99 4a1 1 0 1 1 0 2H12a1 1 0 1 1 0-2zM9.894 6.547A4.001 4.001 0 0 1 15.92 10c0 1.53-1.135 2.542-1.945 3.082a8 8 0 0 1-1.686.849l-.035.011-.01.004-.005.001-.002.001L11.92 13l.316.948a1 1 0 1 1-.633-1.896l.016-.006.074-.027a6.05 6.05 0 0 0 1.172-.6c.69-.46 1.055-.95 1.055-1.419v-.002a2 2 0 0 0-3.887-.666 1 1 0 0 1-1.887-.664 4 4 0 0 1 1.748-2.121M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11" />
    </Svg>
  );
};
