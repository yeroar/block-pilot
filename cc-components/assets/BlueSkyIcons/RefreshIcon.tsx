import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const RefreshIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M2 12C2 6.477 6.477 2 12 2a9.97 9.97 0 0 1 7.073 2.932c.64.64 1.325 1.43 1.927 2.162V4a1 1 0 1 1 2 0v6a1 1 0 0 1-1 1h-6a1 1 0 1 1 0-2h3.968c-.692-.869-1.551-1.897-2.309-2.655A7.97 7.97 0 0 0 12 4a8 8 0 1 0 7.688 10.223 1 1 0 0 1 1.921.554C20.406 18.948 16.56 22 12 22 6.477 22 2 17.523 2 12" />
    </Svg>
  );
};
