import React from "react";
import { TazeRenderLeafProps } from "@taze-editor/taze-core";

export const Underline = ({
  attributes,
  children,
  text,
  leaf,
  editor,
  nodeProps,
  ...props
}: TazeRenderLeafProps) => (
  <u {...props} {...attributes}>
    {children}
  </u>
);
