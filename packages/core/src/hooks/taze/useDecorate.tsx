import { useMemo } from "react";
import { Value } from "../../slate";
import { TazeEditor } from "../../types";
import { pipeDecorate } from "../../utils/taze/pipeDecorate";

export const useDecorate = <
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
>({
  editor
}: {
  editor: E;
}) => {
  const decorateMemo = useMemo(() => {
    return pipeDecorate<V>(editor);
  }, [editor]);

  const decorate: typeof decorateMemo = useMemo(() => {
    if (!decorateMemo) return;

    return entry => decorateMemo(entry);
  }, [decorateMemo]);

  return decorate;
};
