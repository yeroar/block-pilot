import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const CheckCircleIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M21 12a9 9 0 1 0-18 0 9 9 0 0 0 18 0m-5.207-3.707a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-3-3-.068-.076a1 1 0 0 1 1.406-1.406l.076.068 2.293 2.293zM23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11" />
    </Svg>
  );
};
