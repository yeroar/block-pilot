import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const XCloseIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M17.293 5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293.068.076a1 1 0 0 1-1.406 1.406l-.076-.068L12 13.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 1 1 1.414-1.414L12 10.586z" />
    </Svg>
  );
};
