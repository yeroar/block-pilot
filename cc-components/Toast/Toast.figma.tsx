import React from "react";
import Toast from "./Toast";
import figma from "@figma/code-connect";

figma.connect(
  Toast,
  "https://www.figma.com/design/P2LVZrKxzm5EdYUKyZsXDA/%F0%9F%94%B5--MCP?node-id=7213-10996&t=5NEZh9FEguwUOF9w-4",
  {
    props: {
      title: figma.string("Error message"),
      detail: figma.string("Detail"),
      variant: figma.enum("Variant", {
        "0%": "0%",
        "50%": "50%",
        "100%": "100%",
      }),
    },
    example: ({ title, detail, variant }) => (
      <Toast title={title} detail={detail} variant={variant} />
    ),
  }
);
