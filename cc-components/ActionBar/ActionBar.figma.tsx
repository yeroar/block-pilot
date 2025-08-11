import React from "react";
import ActionBar from "./ActionBar";
import figma from "@figma/code-connect";

figma.connect(
  ActionBar,
  "https://www.figma.com/design/P2LVZrKxzm5EdYUKyZsXDA/%F0%9F%94%B5--MCP?node-id=7108%3A4538",
  {
    props: {
      isEmpty: figma.boolean("isEmpty", { true: true, false: false }),
      children: figma.children(["Button"]),
    },
    example: ({ isEmpty, children }) => (
      <ActionBar isEmpty={isEmpty}>{children}</ActionBar>
    ),
  }
);
