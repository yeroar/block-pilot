import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const LoadingIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M11 22v-4a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0m-3.957-6.457a1 1 0 1 1 1.414 1.414l-2.828 2.828a1 1 0 1 1-1.414-1.414zm8.5 0a1 1 0 0 1 1.338-.068l.076.068 2.828 2.828a1 1 0 1 1-1.414 1.414l-2.828-2.828-.068-.076a1 1 0 0 1 .068-1.338M6 11a1 1 0 1 1 0 2H2a1 1 0 1 1 0-2zm16 0a1 1 0 1 1 0 2h-4a1 1 0 1 1 0-2zM4.215 4.293a1 1 0 0 1 1.338-.068l.076.068 2.828 2.828a1 1 0 0 1-1.338 1.483l-.076-.069-2.828-2.828-.07-.076a1 1 0 0 1 .07-1.338m14.156 0a1 1 0 0 1 1.414 1.414l-2.828 2.828a1 1 0 1 1-1.414-1.414zM11 6V2a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0" />
    </Svg>
  );
};
