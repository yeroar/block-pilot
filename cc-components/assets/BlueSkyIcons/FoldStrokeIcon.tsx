import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const FoldStrokeIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1m0 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18m-1.137 12.868c.146-.054.3.054.301.21v2.2a.222.222 0 0 1-.3.207l-2.04-.766c-.494-.17-.494-.914 0-1.083zm3.131-5.452c.145-.055.3.053.3.208v2.368a1.16 1.16 0 0 1-.757 1.084l-.362.135L8.3 16.03a.223.223 0 0 1-.3-.21v-2.338a1.16 1.16 0 0 1 .757-1.083zm1.576-4.902c.146-.054.3.054.3.209V8.13a1.19 1.19 0 0 1-.78 1.112L8.3 11.774a.222.222 0 0 1-.3-.208v-2.41a1.19 1.19 0 0 1 .78-1.113z" />
    </Svg>
  );
};
