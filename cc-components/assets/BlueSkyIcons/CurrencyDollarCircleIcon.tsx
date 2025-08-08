import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const CurrencyDollarCircleIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M21 12a9 9 0 1 0-18 0 9 9 0 0 0 18 0m-6.5-2.667C14.5 8.597 13.903 8 13.167 8H11a1.5 1.5 0 0 0 0 3h2a3.5 3.5 0 1 1 0 7v.5a1 1 0 1 1-2 0V18h-.167A3.333 3.333 0 0 1 7.5 14.667a1 1 0 1 1 2 0c0 .736.597 1.333 1.333 1.333H13a1.5 1.5 0 0 0 0-3h-2a3.5 3.5 0 1 1 0-7v-.5a1 1 0 1 1 2 0V6h.167A3.333 3.333 0 0 1 16.5 9.333a1 1 0 1 1-2 0M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11" />
    </Svg>
  );
};
