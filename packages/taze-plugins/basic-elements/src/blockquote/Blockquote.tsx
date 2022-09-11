import React from "react";
import { TazeRenderElementProps } from "@taze-editor/taze-core";

export const Blockquote = ({
  attributes,
  children,
  editor,
  nodeProps,
  element,
  ...props
}: TazeRenderElementProps) => {
  return (
    <blockquote {...props} {...attributes}>
      {children}
    </blockquote>
  );
};
