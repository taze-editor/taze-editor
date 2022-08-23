import React from "react";
import { TazeRenderLeafProps } from "@taze-editor/taze-core";

export const Strikethrough = ({
  attributes,
  children,
  text,
  leaf,
  editor,
  nodeProps,
  ...props
}: TazeRenderLeafProps) => (
  <s {...props} {...attributes}>
    {children}
  </s>
);
