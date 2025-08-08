import * as React from "react";
import Svg, { Path, G, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const FoldIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <G>
        <Path d="m7.653 19.679 2.736 1.029a.3.3 0 0 0 .406-.281v-2.95a.3.3 0 0 0-.406-.282l-2.736 1.03c-.664.227-.664 1.227 0 1.454M14.592 9.874a.3.3 0 0 1 .407.28v3.179a1.56 1.56 0 0 1-1.018 1.455l-7.03 2.622a.3.3 0 0 1-.405-.281v-3.137a1.56 1.56 0 0 1 1.017-1.455zM16.71 3.292a.3.3 0 0 1 .404.281v3.23a1.6 1.6 0 0 1-1.047 1.494l-9.116 3.4a.3.3 0 0 1-.405-.281V8.18a1.6 1.6 0 0 1 1.047-1.493zM12.599 9.523l-6.053 2.265z" />
      </G>
    </Svg>
  );
};
