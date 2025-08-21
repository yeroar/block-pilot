import React from "react";
import LineItem from "./LineItem";
import figma from "@figma/code-connect";

figma.connect(
  LineItem,
  "https://www.figma.com/design/P2LVZrKxzm5EdYUKyZsXDA/%F0%9F%94%B5--MCP?node-id=7171%3A9842",
  {
    props: {
      //left
      leadingIcon: figma.boolean("leadingIcon", {
        true: figma.instance("leadingSlot"),
        false: undefined,
      }),
      label: figma.string("label"),
      trailingIcon: figma.boolean("trailingIcon", {
        true: figma.instance("trailingSlot"),
        false: undefined,
      }),

      //right
      varLeadingIcon: figma.boolean("varLeadingIcon", {
        true: figma.instance("varLeadingSlot"),
        false: undefined,
      }),
      variable: figma.string("variable"),
      varTrailingIcon: figma.boolean("varTrailingIcon", {
        true: figma.instance("varTrailingSlot"),
        false: undefined,
      }),

      showChip: figma.boolean("showChip", {
        true: figma.children("Chip"),
        false: undefined,
      }),
    },
    example: (props) => {
      return (
        <LineItem
          label={props.label}
          leadingSlot={props.leadingIcon}
          trailingSlot={props.trailingIcon}
          variable={props.variable}
          varLeadingSlot={props.varLeadingIcon}
          varTrailingSlot={props.varTrailingIcon}
          showChip={props.showChip}
        ></LineItem>
      );
    },
  }
);
