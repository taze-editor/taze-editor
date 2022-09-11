import React from "react";
import { TazeRenderElementProps } from "@taze-editor/taze-core";

export const H1 = ({
  attributes,
  children,
  editor,
  nodeProps,
  ...props
}: TazeRenderElementProps) => {
  return (
    <h1 {...props} {...attributes}>
      {children}
    </h1>
  );
};
