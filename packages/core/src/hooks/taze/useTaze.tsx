import { Value } from "../../slate";
import { TazeEditor } from "../../types";
import { useEditableProps } from "./useEditableProps";
import { useSlateProps } from "./useSlateProps";

export const useTaze = <
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
>({
  editor,
  value,
  setValue
}: {
  editor: E;
  value: Value;
  setValue: (value: Value) => void;
}) => {
  return {
    slateProps: useSlateProps<V>({ editor, value, setValue }),
    editableProps: useEditableProps<V>({ editor })
  };
};
