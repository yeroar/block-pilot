import React from "react";
import CustomKeyboard from "./KeyboardButton";
import figma from "@figma/code-connect";

export const KeyboardButtonIconOnly = figma.connect(
  CustomKeyboard,
  "https://www.figma.com/design/P2LVZrKxzm5EdYUKyZsXDA/%F0%9F%94%B5--MCP?node-id=7017%3A3401",
  {
    props: {
      hasIcon: figma.boolean("hasIcon", {
        true: figma.instance("icon"),
        false: undefined,
      }), // Map hasIcon to a boolean
    },
    example: (props) => (
      <CustomKeyboard
        variant="iconOnly"
        icon={props.hasIcon}
        onPress={() => {}}
      />
    ),
  }
);

export const CustomKeyboardTextOnly = figma.connect(
  CustomKeyboard,
  "https://www.figma.com/design/P2LVZrKxzm5EdYUKyZsXDA/%F0%9F%94%B5--MCP?node-id=7017%3A3405",
  {
    props: {
      label: figma.string("label"),
    },
    example: ({ label }) => (
      <CustomKeyboard label={label} variant="textOnly" onPress={() => {}} />
    ),
  }
);
