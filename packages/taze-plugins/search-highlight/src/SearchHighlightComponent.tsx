import React from "react";
import { TazeRenderLeafProps } from "@taze-editor/taze-core";

export const SearchHighlightComponent = ({
  attributes,
  children,
  text,
  leaf,
  editor,
  nodeProps,
  ...props
}: TazeRenderLeafProps) => {
  return (
    <mark
      {...props}
      {...attributes}
      style={{
        backgroundColor:
          props?.["data-taze-leaf-search-highlight-current"] === true
            ? "#ffd386"
            : "#e2e2e2"
      }}
    >
      {children}
    </mark>
  );
};
