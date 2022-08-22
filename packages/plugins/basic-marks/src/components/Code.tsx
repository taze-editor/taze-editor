import React from "react";
import { TazeRenderLeafProps } from "@taze-editor/core";

export const Code = ({
  attributes,
  children,
  text,
  leaf,
  editor,
  nodeProps,
  ...props
}: TazeRenderLeafProps) => (
  <code {...props} {...attributes}>
    {children}
  </code>
);
