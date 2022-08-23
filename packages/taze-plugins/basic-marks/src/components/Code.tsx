import React from "react";
import { TazeRenderLeafProps } from "@taze-editor/taze-core";

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
