import {
  isCollapsed,
  KeyboardHandlerReturnType,
  TazeEditor,
  setElements,
  someNode,
  Value,
  WithTazePlugin
} from "@taze-editor/taze-core";
import isHotkey from "is-hotkey";
import { ResetNodePlugin } from "./types";

export const SIMULATE_BACKSPACE: any = {
  key: "",
  which: 8
};

export const onKeyDownResetNode = <
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
>(
  editor: E,
  { options }: WithTazePlugin<ResetNodePlugin, V, E>
): KeyboardHandlerReturnType => event => {
  let reset;

  if (!options?.rules) return;

  if (editor.selection && isCollapsed(editor.selection)) {
    options?.rules?.forEach(
      ({ types, defaultType, hotkey, predicate, onReset }) => {
        if (hotkey && isHotkey(hotkey, event as any)) {
          if (
            predicate(editor as any) &&
            someNode(editor, { match: { type: types } })
          ) {
            event.preventDefault?.();

            setElements(editor, { type: defaultType });

            if (onReset) {
              onReset(editor as any);
            }

            reset = true;
          }
        }
      }
    );
  }

  return reset;
};
