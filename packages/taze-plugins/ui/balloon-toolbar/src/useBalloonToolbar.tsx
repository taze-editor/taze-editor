import {
  getEditorString,
  isCollapsed,
  useEditorState
} from "@taze-editor/taze-core";
import { useEffect, useRef } from "react";
import { useFocused } from "slate-react";

/**
 * It returns `ref` which should be attached to the balloon toolbar element
 * to handle the positioning of the balloon toolbar.
 */
export const useBalloonToolbar = ({ offset = 8 }: { offset?: number }) => {
  const ref = useRef<HTMLElement | null>(null);
  const editor = useEditorState();
  const inFocus = useFocused();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !inFocus ||
      isCollapsed(selection) ||
      getEditorString(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();

    if (domSelection) {
      const domRange = domSelection.getRangeAt(0);
      const domSelectionRect = domRange.getBoundingClientRect();

      const topOffset =
        domSelectionRect.top + window.pageYOffset - el.offsetHeight + offset;

      const leftOffset =
        domSelectionRect.left +
        window.pageXOffset -
        el.offsetWidth / 2 +
        domSelectionRect.width / 2;

      const mayOverflowRight =
        leftOffset + offset + el.offsetWidth > window.innerWidth;

      const getTopOffset = () => {
        return topOffset - offset < 0 ? asPx(offset) : asPx(topOffset);
      };

      const getLeftOffset = () => {
        if (leftOffset - offset < 0) return asPx(offset);

        if (mayOverflowRight)
          return asPx(window.innerWidth - el.offsetWidth - offset);

        return asPx(leftOffset);
      };

      Object.assign(el.style, {
        opacity: "1",
        top: getTopOffset(),
        left: getLeftOffset()
      });
    }
  });

  return {
    ref
  };
};

// Little helper function to convert number to px - no need to export
const asPx = (num: number) => num + "px";
