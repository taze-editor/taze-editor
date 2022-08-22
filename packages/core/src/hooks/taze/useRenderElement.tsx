import { useMemo } from "react";
import { Value } from "../../slate";
import { TazeEditor } from "../../types";
import { pipeRenderElement } from "../../utils/taze/pipeRenderElement";

export const useRenderElement = <
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
>({
  editor
}: {
  editor: E;
}) => {
  const renderElement = useMemo(() => {
    return pipeRenderElement<V>(editor);
  }, [editor]);

  return renderElement;
};
