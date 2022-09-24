import React from "react";
import { TazeRenderElementProps } from "@taze-editor/taze-core";

export const Paragraph = ({
  attributes,
  children,
  editor,
  nodeProps,
  element,
  ...props
}: TazeRenderElementProps) => {
  return (
    <p {...props} {...attributes}>
      {children}
    </p>
  );
};
