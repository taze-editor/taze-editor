import { useMemo } from "react";
import { Value } from "../../slate";
import { TazeEditor } from "../../types";
import { pipeOnChange } from "../../utils/taze/pipeOnChange";

export const useOnChange = <
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
>({
  editor
}: {
  editor: E;
}) => {
  const onChange = useMemo(() => {
    return pipeOnChange<V>(editor);
  }, [editor]);

  return onChange;
};
