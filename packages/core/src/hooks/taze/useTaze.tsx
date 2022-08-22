import { TDescendant, Value } from "../../slate";
import { TazeEditor } from "../../types";
import { useEditableProps } from "./useEditableProps";
import { useSlateProps } from "./useSlateProps";

export const useTaze = <
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
>({
  editor,
  initialValue = []
}: {
  editor: E;
  initialValue?: TDescendant[];
}) => {
  return {
    slateProps: useSlateProps<V>({ editor, initialValue }),
    editableProps: useEditableProps<V>({ editor })
  };
};
