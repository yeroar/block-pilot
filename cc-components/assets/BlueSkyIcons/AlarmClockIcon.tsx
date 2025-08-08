import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const AlarmClockIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M18.991 12.653A7 7 0 1 0 12 20l.347-.009A7 7 0 0 0 19 13zM11 9a1 1 0 1 1 2 0v3.586l1.707 1.707.068.076a1 1 0 0 1-1.406 1.406l-.076-.068-2-2A1 1 0 0 1 11 13zM4.293 2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 1 1-1.414-1.414zm14 0a1 1 0 0 1 1.414 0l3 3 .068.076a1 1 0 0 1-1.406 1.406l-.076-.068-3-3-.069-.076a1 1 0 0 1 .069-1.338m2.696 11.153a9 9 0 0 1-1.959 5.17l1.677 1.677.068.076a1 1 0 0 1-1.406 1.406l-.076-.068-1.677-1.677a9 9 0 0 1-5.17 1.96L12 22a9 9 0 0 1-5.617-1.97l-1.676 1.677a1 1 0 1 1-1.414-1.414l1.676-1.677A8.999 8.999 0 1 1 20.999 13z" />
    </Svg>
  );
};
