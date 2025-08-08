import * as React from "react";
import Svg, { Rect, Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const MastercardIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Rect width="24" height="24" rx="12" />
      <Path d="M3.75 6h17.238v11.4H3.75z" />
      <Path d="M10.096 7.986h4.546v7.428h-4.546z" />
      <Path d="M10.586 11.7a4.71 4.71 0 0 1 1.78-3.714 4.725 4.725 0 1 0 0 7.428 4.71 4.71 0 0 1-1.78-3.714" />
      <Path
        d="M19.554 14.474v.151h-.027v-.151h-.063v-.031h.156v.03zm.303-.03v.182h-.031v-.138l-.05.12h-.035l-.053-.12v.138h-.031v-.183h.044l.058.13.053-.13z"
        clipRule="evenodd"
        fillRule="evenodd"
      />
      <Path d="M20.008 11.7a4.725 4.725 0 0 1-7.641 3.714 4.725 4.725 0 0 0 .792-6.63 4.6 4.6 0 0 0-.792-.798 4.725 4.725 0 0 1 7.641 3.714" />
    </Svg>
  );
};
