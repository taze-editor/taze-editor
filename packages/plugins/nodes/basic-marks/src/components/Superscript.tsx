import React from "react";
import { TazeRenderLeafProps } from "@taze-editor/taze-core";

export const Superscript = ({
  attributes,
  children,
  text,
  leaf,
  editor,
  nodeProps,
  ...props
}: TazeRenderLeafProps) => (
  <sup {...props} {...attributes}>
    {children}
  </sup>
);
