import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const RoundUpsIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M13 16a5 5 0 1 0-10 0 5 5 0 0 0 10 0m8 0a1 1 0 1 1 2 0 5 5 0 0 1-4.603 4.982l.31.311.068.076a1 1 0 0 1-1.406 1.406l-.076-.068-2-2a1 1 0 0 1 0-1.414l2-2a1 1 0 1 1 1.414 1.414l-.26.26A3 3 0 0 0 21 16m0-8a5 5 0 0 0-9.843-1.251l-1.936-.498a7 7 0 1 1 8.528 8.528 1 1 0 1 1-.498-1.936A5 5 0 0 0 21 8M1 8a5 5 0 0 1 4.603-4.983l-.31-.31-.068-.076a1 1 0 0 1 1.482-1.338l2 2a1 1 0 0 1 0 1.414l-2 2a1 1 0 1 1-1.414-1.414l.26-.26A3 3 0 0 0 3 8a1 1 0 0 1-2 0m10.157-1.251a1 1 0 0 1-1.936-.498zM15 16a7 7 0 1 1-14 0 7 7 0 0 1 14 0" />
    </Svg>
  );
};
