import React from "react";
import { TazeRenderLeafProps } from "@taze-editor/taze-core";

export const Bold = ({
  attributes,
  children,
  text,
  leaf,
  editor,
  nodeProps,
  ...props
}: TazeRenderLeafProps) => (
  <b {...props} {...attributes}>
    {children}
  </b>
);
