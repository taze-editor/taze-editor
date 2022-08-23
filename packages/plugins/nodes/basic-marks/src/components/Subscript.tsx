import React from "react";
import { TazeRenderLeafProps } from "@taze-editor/taze-core";

export const Subscript = ({
  attributes,
  children,
  text,
  leaf,
  editor,
  nodeProps,
  ...props
}: TazeRenderLeafProps) => (
  <sub {...props} {...attributes}>
    {children}
  </sub>
);
