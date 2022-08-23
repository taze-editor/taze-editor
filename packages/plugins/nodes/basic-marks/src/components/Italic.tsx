import React from "react";
import { TazeRenderLeafProps } from "@taze-editor/taze-core";

export const Italic = ({
  attributes,
  children,
  text,
  leaf,
  editor,
  nodeProps,
  ...props
}: TazeRenderLeafProps) => (
  <i {...props} {...attributes}>
    {children}
  </i>
);
