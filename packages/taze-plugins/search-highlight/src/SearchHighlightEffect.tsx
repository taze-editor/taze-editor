import React from "react";
import { RenderAfterEditable } from "@taze-editor/taze-core";
import { useSearchHighlightEffect } from "./useSearchHighlightEffect";

export const SearchHighlightEffect: RenderAfterEditable = ({ editor }) => {
  if (!editor) {
    console.warn(
      "[@taze-editor/taze-plugin-search-highlight] editor is not defined"
    );
    return null;
  }

  useSearchHighlightEffect({ editor });

  return null;
};
