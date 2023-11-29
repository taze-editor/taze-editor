import { createWithEqualityFn } from "zustand/traditional";
import { Value } from "../../slate";
import { TazeEditor } from "../../types";

export type UseEditorValueType = {
  value: Value;
  setValue: (value: Value) => void;
};

export const useEditorValue = <
  E extends TazeEditor<Value> = TazeEditor<Value>
>({
  editor,
  initialValue = [
    {
      type: "p",
      children: [{ text: "" }]
    }
  ]
}: {
  editor: E;
  initialValue?: Value;
}) =>
  createWithEqualityFn<UseEditorValueType>(set => ({
    value: initialValue,
    setValue: value => {
      editor.children = value;
      set(state => ({ ...state, value }));
    }
  }));
