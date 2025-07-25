import { createElement, forwardRef } from "react";
import type { ViewProps as RNViewProps } from "react-native";
import { View as RNView } from "react-native";

/**
 * NativeView - render underlying native view component without the additional
 * wrapper elements that react native's standard View component adds.
 *
 * benefits:
 * - improved performance by reducing component hierarchy depth
 * - direct control over native element properties
 * - optimizing UI rendering
 */
export const NativeView = forwardRef<RNView, RNViewProps>((props, ref): React.JSX.Element => {
  // if we pass any function props, we need to use the View component (not the native view)
  // since that has built-in event handling for functionality.
  const hasAnyFnProp = Object.values(props).some((value) => typeof value === "function");

  if (hasAnyFnProp) {
    return <RNView {...props} ref={ref} />;
  }

  return createElement("RCTView", { ...props, ref });
});
