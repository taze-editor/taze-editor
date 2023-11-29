import { useEffect } from "react";
import { TazeEditor } from "@taze-editor/taze-core";
import { useSearchHighlightPluginStore } from "./useSearchHighlightPluginStore";

export const useSearchHighlightEffect = ({
  editor
}: {
  editor: TazeEditor;
}) => {
  const {
    searchParams,
    getAllSearchRanges,
    setSearchMatchedRanges,
    getNextSearchMatchStep,
    setSearchStep
  } = useSearchHighlightPluginStore();

  useEffect(() => {
    const ranges = getAllSearchRanges(editor, searchParams);
    setSearchMatchedRanges(ranges);

    const step = getNextSearchMatchStep(editor, ranges);
    setSearchStep(step);

    editor.apply({
      type: "set_selection",
      properties: ranges[0],
      newProperties: ranges[0]
    });
  }, [editor, searchParams]);
};
