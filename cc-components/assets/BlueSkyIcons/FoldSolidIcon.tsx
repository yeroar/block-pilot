import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const FoldSolidIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1m-.836 15.077a.223.223 0 0 0-.3-.208l-2.04.767c-.494.17-.494.914 0 1.083l2.04.767c.145.055.3-.053.3-.208zm3.13-5.452a.223.223 0 0 0-.3-.209L8.757 12.4A1.16 1.16 0 0 0 8 13.483v2.34c0 .154.155.261.3.207l4.875-1.818.362-.136a1.155 1.155 0 0 0 .758-1.083zm1.276-5.11L8.78 8.043A1.19 1.19 0 0 0 8 9.155v2.411c0 .156.154.264.3.21l6.79-2.534a1.19 1.19 0 0 0 .78-1.111V5.723a.222.222 0 0 0-.3-.208" />
    </Svg>
  );
};
