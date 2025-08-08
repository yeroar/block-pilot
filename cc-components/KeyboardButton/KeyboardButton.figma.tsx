import React from "react";
import CustomKeyboard from "./KeyboardButton";
import figma from "@figma/code-connect";


export const KeyboardButtonIconOnly = figma.connect(
  CustomKeyboard,
  "https://www.figma.com/design/P2LVZrKxzm5EdYUKyZsXDA/%F0%9F%94%B5--MCP?node-id=7017%3A3401",
  {
    props: {
      // Use enum for icon names that match your ICONS registry
      icon: figma.instance("icon"),
    },
    example: ({ icon }) => (
      <CustomKeyboard 
        variant="iconOnly" 
        icon={icon} 
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
