import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const SwitchHorizontalIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M7.293 12.293a1 1 0 1 1 1.414 1.414L6.414 16H20a1 1 0 1 1 0 2H6.414l2.293 2.293.068.076a1 1 0 0 1-1.406 1.406l-.076-.068-4-4a1 1 0 0 1 0-1.414zm8-10a1 1 0 0 1 1.338-.068l.076.068 4 4 .068.076a1 1 0 0 1-.068 1.338l-4 4a1 1 0 1 1-1.414-1.414L17.586 8H4a1 1 0 0 1 0-2h13.586l-2.293-2.293-.068-.076a1 1 0 0 1 .068-1.338" />
    </Svg>
  );
};
