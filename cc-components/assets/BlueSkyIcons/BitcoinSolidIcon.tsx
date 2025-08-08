import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const BitcoinSolidIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1m-.524 4v1.52H8.5v11.36h2.976v1.456h1.216V17.88h.016c2.56 0 4.064-1.216 4.065-3.216 0-1.504-.961-2.48-2.593-2.656 1.28-.208 2.112-1.104 2.112-2.336 0-1.888-1.264-2.976-3.6-3.136V5zm0 7.84v3.488h-1.249V12.84zm1.232 0c1.488 0 2.303.64 2.304 1.76 0 1.088-.864 1.728-2.304 1.728h-.016V12.84zm-1.232-4.768v3.296h-1.249V8.072zm1.216.032c1.2.144 1.84.704 1.84 1.632 0 .912-.64 1.472-1.84 1.6z" />
    </Svg>
  );
};
