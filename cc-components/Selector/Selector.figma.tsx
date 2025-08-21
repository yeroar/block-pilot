import React from "react";
import Selector from "./Selector";
import figma from "@figma/code-connect";
import { CreditCardIcon } from "../assets/BlueSkyIcons/CreditCardIcon";

figma.connect(
  Selector,
  "https://www.figma.com/design/P2LVZrKxzm5EdYUKyZsXDA/%F0%9F%94%B5--MCP?node-id=7186%3A1127",
  {
    props: {
      variant: figma.enum("variant", {
        navigation: "navigation",
        radio: "radio",
        checbox: "checkbox", // Note: keeping Figma's typo for consistency
      }),
      title: figma.string("title"),
      subtext: figma.boolean("hasSubtext", {
        true: figma.string("subtext"),
        false: undefined,
      }),
      footnote: figma.boolean("hasFootnote", {
        true: figma.string("footnote"),
        false: undefined,
      }),
      showLeadingIcon: figma.boolean("leadingElement", {
        true: figma.instance("leadingSlot"),
        false: undefined,
      }),
      hasChip: figma.boolean("hasChip", {
        true: figma.children("Chip"),
        false: undefined,
      }),
      selected: figma.enum("selected", {
        true: true,
        false: false,
      }),
    },
    example: (props) => (
      <Selector
        variant={props.variant}
        title={props.title}
        subtext={props.subtext}
        footnote={props.footnote}
        showLeadingIcon={props.showLeadingIcon}
        hasChip={props.hasChip}
        selected={props.selected}
      />
    ),
  }
);
