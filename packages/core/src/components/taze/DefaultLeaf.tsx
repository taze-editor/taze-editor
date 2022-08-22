import React from "react";
import { Value } from "../../slate/editor/TEditor";
import { TazeRenderLeafProps } from "../../types/taze/TazeRenderLeafProps";

export const DefaultLeaf = <V extends Value>({
  attributes,
  children,
  text,
  leaf,
  editor,
  nodeProps,
  ...props
}: TazeRenderLeafProps<V>) => (
  <span {...attributes} {...props}>
    {children}
  </span>
);
