import { useDeepCompareCallback, useDeepCompareMemo } from "use-deep-compare";
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
  value,
  setValue
}: {
  editor: TazeEditor<V>;
  value: Value;
  setValue: (value: Value) => void;
}): Omit<SlateProps, "children"> => {
  const onChange = useDeepCompareCallback(
    newValue => {
      if (!editor) return;

      pipeOnChange<V>(editor)(newValue);

      setValue(newValue);
    },
    [editor, setValue]
  );

  return useDeepCompareMemo(() => {
    return {
      editor,
      onChange,
      value,
      setValue
    };
  }, [editor, onChange, value, setValue]);
};
