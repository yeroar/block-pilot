import type { Spacing } from "../../theme";
import { HStack } from "../layout/stack";
import { View } from "../layout/view";

/**
 * Divider - renders a divider component with support for child content
 *
 * @param props - React props
 * @param props.spacing - the spacing of the divider
 * @param props.children - the children of the divider
 */
export function Divider({
  spacing = "md",
  children,
}: {
  spacing?: Spacing;
  children?: React.ReactNode;
}) {
  const renderSpacer = () => (
    <View height={1} flex={1} backgroundColor="separatorOpaque" marginY={spacing} />
  );

  if (children) {
    return (
      <HStack gap="md" align="center" justify="between">
        {renderSpacer()}
        {children}
        {renderSpacer()}
      </HStack>
    );
  }

  return renderSpacer();
}
