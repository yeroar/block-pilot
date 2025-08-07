import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const ChevronUpIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M11.37 8.225a1 1 0 0 1 1.337.068l6 6 .068.076a1 1 0 0 1-1.406 1.406l-.076-.068L12 10.414l-5.293 5.293a1 1 0 1 1-1.414-1.414l6-6z" />
    </Svg>
  );
};
