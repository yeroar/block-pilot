import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const LinkIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M4.93 10.586a1 1 0 0 1 1.414 1.413L4.93 13.416a4 4 0 1 0 5.656 5.656L12 17.657a1 1 0 0 1 1.415 1.414L12 20.485A6 6 0 0 1 3.516 12zm9.863-2.793a1 1 0 0 1 1.415 1.415l-7 7a1.001 1.001 0 0 1-1.415-1.415zM12 3.515A6 6 0 0 1 20.485 12l-1.414 1.416-.076.068a1 1 0 0 1-1.338-1.484l1.414-1.414a4 4 0 1 0-5.656-5.656L12 6.343a1 1 0 0 1-1.414-1.414z" />
    </Svg>
  );
};
