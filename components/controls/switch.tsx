import { Switch as RNSwitch, type SwitchProps as RNSwitchProps } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";

export type SwitchProps = Omit<RNSwitchProps, "disabled"> & {
  isDisabled?: boolean;
};

export function Switch({ isDisabled, ...props }: SwitchProps) {
  const theme = UnistylesRuntime.getTheme();

  const propsWithDefaults: RNSwitchProps = {
    disabled: isDisabled,
    thumbColor: theme.colors.white,
    trackColor: {
      false: theme.colors.gray,
      true: theme.colors.green,
    },
    ios_backgroundColor: isDisabled ? theme.colors.disabled : theme.colors.gray,
    ...props,
  };

  return <RNSwitch {...propsWithDefaults} />;
}
