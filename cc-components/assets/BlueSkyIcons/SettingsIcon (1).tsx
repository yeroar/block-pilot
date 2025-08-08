import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const SettingsIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M6 12a4 4 0 0 1 3.874 3H21a1 1 0 0 1 .102 1.995L21 17H9.874A4.002 4.002 0 0 1 2 16a4 4 0 0 1 4-4m14-4a2 2 0 1 0-4 0 2 2 0 0 0 4 0M4 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0m18-8a4 4 0 0 1-7.874 1H3a1 1 0 0 1 0-2h11.126A4.002 4.002 0 0 1 22 8" />
    </Svg>
  );
};
