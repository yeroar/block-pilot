import React from "react"
import FoldPageViewHeader from "./FoldPageViewHeader"
import figma from "@figma/code-connect"

figma.connect(
  FoldPageViewHeader,
  "https://www.figma.com/design/P2LVZrKxzm5EdYUKyZsXDA/%F0%9F%94%B5--MCP?node-id=7094%3A3958",
  {
    props: {
      // Adjust property and layer names to exactly match your Figma node
      title: figma.string("Text"),
      leftComponent: figma.children(["LeftStackControl"]),
      rightComponent: figma.children(["RightStackControl"]),
    },
    example: ({ title, leftComponent, rightComponent }) => (
      <FoldPageViewHeader
        title={title}
        leftComponent={leftComponent}
        rightComponent={rightComponent}
      />
    ),
  },
)
