import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const UserIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M19 21c0-1.468-.01-1.981-.129-2.371a3 3 0 0 0-2-2c-.39-.118-.903-.129-2.37-.129h-5c-1.47 0-1.982.01-2.372.129a3 3 0 0 0-2 2C5.011 19.019 5 19.532 5 21a1 1 0 1 1-2 0c0-1.323-.011-2.206.215-2.951a5 5 0 0 1 3.334-3.334c.745-.226 1.628-.215 2.951-.215h5c1.323 0 2.206-.011 2.951.215a5 5 0 0 1 3.334 3.334c.226.745.215 1.628.215 2.951a1 1 0 1 1-2 0M15.5 7.5a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0m2 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
    </Svg>
  );
};
