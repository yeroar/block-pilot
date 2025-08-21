import React from "react";
import { CircleIcon } from "../assets/BlueSkyIcons/CircleIcon";
import { SquareIcon } from "../assets/BlueSkyIcons/SquareIcon";
import { ChevronRightIcon } from "../assets/BlueSkyIcons/ChevronRightIcon";
import { CheckCircleIcon } from "../assets/BlueSkyIcons/CheckCircleIcon";
import { CheckSquareIcon } from "../assets/BlueSkyIcons/CheckSquareIcon";
import { FaceAccent } from "../../generated-tokens/tokens";

export type SelectorVariant = "navigation" | "radio" | "checkbox";

export const renderTrailingIcon = (
  variant: SelectorVariant,
  selected: boolean
): React.ReactNode => {
  switch (variant) {
    case "radio":
      // Radio: Show filled circle with accent color when selected, empty circle when not
      return selected ? (
        <CheckCircleIcon width={20} height={20} fill={FaceAccent} />
      ) : (
        <CircleIcon width={20} height={20} />
      );
    case "checkbox":
      // Checkbox: Show filled square with accent color when selected, empty square when not
      return selected ? (
        <CheckSquareIcon width={20} height={20} fill={FaceAccent} />
      ) : (
        <SquareIcon width={20} height={20} />
      );
    case "navigation":
    default:
      // Navigation: Always show chevron right (selection state doesn't matter)
      return <ChevronRightIcon width={20} height={20} />;
  }
};

export const getSelectionStyle = (
  variant: SelectorVariant,
  selected: boolean
) => {
  // unified container style for all variants to ensure consistent layout
  const base = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  } as const;

  // return the same base for navigation, radio and checkbox (no variant-specific background)
  return base;
};

export const isSelectable = (variant: SelectorVariant): boolean => {
  return variant === "radio" || variant === "checkbox";
};
