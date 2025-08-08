import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const ArrowNarrowUpLeftIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M5 14V6a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8.414l10.293 10.293.068.076a1 1 0 0 1-1.406 1.406l-.076-.068L7 8.414V14a1 1 0 1 1-2 0" />
    </Svg>
  );
};
