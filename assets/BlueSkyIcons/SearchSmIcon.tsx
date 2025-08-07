import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const SearchSmIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M16 10a6 6 0 1 0-12 0 6 6 0 0 0 12 0m2 0c0 1.849-.63 3.549-1.683 4.903l5.39 5.39.068.076a1 1 0 0 1-1.406 1.406l-.076-.068-5.39-5.39A7.96 7.96 0 0 1 10 18a8 8 0 1 1 8-8" />
    </Svg>
  );
};
