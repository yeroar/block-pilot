import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const BitcoinStrokeIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1m0 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18m.692 3.536c2.336.16 3.6 1.248 3.6 3.136 0 1.232-.832 2.128-2.112 2.336 1.632.176 2.593 1.152 2.593 2.656 0 2-1.505 3.216-4.065 3.216h-.016v1.456h-1.216V17.88H8.5V6.52h2.976V5h1.216zm-2.465 9.792h1.249V12.84h-1.249zm2.465 0h.016c1.44 0 2.304-.64 2.304-1.728 0-1.12-.816-1.76-2.304-1.76h-.016zm-2.465-4.96h1.249V8.072h-1.249zm2.465-.032c1.2-.128 1.84-.688 1.84-1.6 0-.928-.64-1.488-1.84-1.632z" />
    </Svg>
  );
};
