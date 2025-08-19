import React from "react";
import Chip from "./Chip";
import figma from "@figma/code-connect";
import { InfoCircleIcon } from "../assets/BlueSkyIcons/InfoCircleIcon";

figma.connect(
  Chip,
  "https://www.figma.com/design/P2LVZrKxzm5EdYUKyZsXDA/%F0%9F%94%B5--MCP?node-id=7169%3A6539",
  {
    props: {
      label: figma.string("label"),
      bold: figma.boolean("bold"),
      // Map icon instances into slots via booleans
      leadingSlot: figma.boolean("leadingIcon", {
        true: figma.instance("leadingSlot"),
        false: undefined,
      }),
      trailingSlot: figma.boolean("trailingIcon", {
        true: figma.instance("trailingSlot"),
        false: undefined,
      }),
    },
    example: ({ label, bold, leadingSlot, trailingSlot }) => (
      <Chip
        label={label}
        bold={bold}
        leadingSlot={leadingSlot}
        trailingSlot={trailingSlot}
        onPress={() => {}}
      />
    ),
  }
);
