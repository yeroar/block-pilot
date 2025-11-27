import React from "react";
import { CircleIcon } from "../assets/BlueSkyIcons/CircleIcon";
import { SquareIcon } from "../assets/BlueSkyIcons/SquareIcon";
import { ChevronRightIcon } from "../assets/BlueSkyIcons/ChevronRightIcon";
import { CheckCircleIcon } from "../assets/BlueSkyIcons/CheckCircleIcon";
import { CheckSquareIcon } from "../assets/BlueSkyIcons/CheckSquareIcon";
import { FacePrimary, FaceDisabled } from "../../generated-tokens/tokens";

export type SelectorVariant = "navigation" | "radio" | "checkbox";

export const renderTrailingIcon = (
  variant: SelectorVariant,
  selected: boolean
): React.ReactNode => {
  switch (variant) {
    case "radio":
      // For radio, we'll move this to leading position, so return null here
      return null;
    case "checkbox":
      // Checkbox: Show filled circle with primary color when selected, disabled color when not (like radio but on right)
      return selected ? (
        <CheckCircleIcon width={20} height={20} fill={FacePrimary} />
      ) : (
        <CircleIcon width={20} height={20} fill={FaceDisabled} />
      );
    case "navigation":
    default:
      // Navigation: Always show chevron right (selection state doesn't matter)
      return <ChevronRightIcon width={20} height={20} />;
  }
};

export const renderLeadingIcon = (
  variant: SelectorVariant,
  selected: boolean
): React.ReactNode => {
  switch (variant) {
    case "radio":
      // Radio: Show filled circle with primary color when selected, disabled color when not
      return selected ? (
        <CheckCircleIcon width={20} height={20} fill={FacePrimary} />
      ) : (
        <CircleIcon width={20} height={20} fill={FaceDisabled} />
      );
    default:
      return null;
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
  } as const;

  // return the same base for navigation, radio and checkbox (no variant-specific background)
  return base;
};

export const isSelectable = (variant: SelectorVariant): boolean => {
  return variant === "radio" || variant === "checkbox";
};
