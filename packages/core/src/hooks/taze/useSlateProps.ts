import { useCallback, useMemo, useState } from "react";
import { TazeProps } from "../../components";
import { TDescendant } from "../../slate";
import { Value } from "../../slate/editor/TEditor";
import { SlateProps } from "../../slate/types/SlateProps";
import { TazeEditor } from "../../types";
import { pipeOnChange } from "../../utils/taze/pipeOnChange";

/**
 * Get Slate props stored in a global store.
 */
export const useSlateProps = <V extends Value>({
  editor,
  initialValue = []
}: {
  editor: TazeEditor<V>;
  initialValue?: TDescendant[];
}): Omit<SlateProps, "children"> => {
  const [value, setValue] = useState<TDescendant[]>(initialValue);

  const onChange = useCallback(
    newValue => {
      if (!editor) return;

      pipeOnChange<V>(editor)(newValue);

      setValue(newValue);
    },
    [editor]
  );

  return useMemo(() => {
    if (!editor) return {};

    return {
      editor,
      onChange,
      value,
      setValue
    };
  }, [editor, onChange]);
};
