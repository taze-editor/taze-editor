import React from "react";
import { TazeRenderElementProps } from "@taze-editor/taze-core";

export const H3 = ({
  attributes,
  children,
  editor,
  nodeProps,
  ...props
}: TazeRenderElementProps) => {
  return (
    <h3 {...props} {...attributes}>
      {children}
    </h3>
  );
};
