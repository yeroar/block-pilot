import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const CheckCircleIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1m0 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18m3.793 5.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-3-3-.068-.076a1 1 0 0 1 1.406-1.406l.076.068 2.293 2.293z" />
    </Svg>
  );
};
