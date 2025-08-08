import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const ArrowNarrowLeftIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M9.293 5.293a1 1 0 1 1 1.414 1.414L6.414 11H20a1 1 0 0 1 0 2H6.414l4.293 4.293.068.076a1 1 0 0 1-1.406 1.406l-.076-.068-6-6a1 1 0 0 1 0-1.414z" />
    </Svg>
  );
};
