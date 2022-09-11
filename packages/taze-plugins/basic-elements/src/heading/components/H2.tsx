import React from "react";
import { TazeRenderElementProps } from "@taze-editor/taze-core";

export const H2 = ({
  attributes,
  children,
  editor,
  nodeProps,
  element,
  ...props
}: TazeRenderElementProps) => {
  return (
    <h2 {...props} {...attributes}>
      {children}
    </h2>
  );
};
