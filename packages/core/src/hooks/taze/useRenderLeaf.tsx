import { useMemo } from "react";
import { Value } from "../../slate";
import { TazeEditor } from "../../types";
import { pipeRenderLeaf } from "../../utils/taze/pipeRenderLeaf";

export const useRenderLeaf = <
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
>({
  editor
}: {
  editor: E;
}) => {
  const renderLeaf = useMemo(() => {
    return pipeRenderLeaf<V>(editor);
  }, [editor]);

  return renderLeaf;
};
