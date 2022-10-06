import {
  getBlockAbove,
  KeyboardHandlerReturnType,
  TazeEditor,
  queryNode,
  Value,
  WithTazePlugin
} from "@taze-editor/taze-core";
import isHotkey from "is-hotkey";
import { exitBreak } from "./transforms/exitBreak";
import { ExitBreakPlugin } from "./types";

export const onKeyDownExitBreak = <
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
>(
  editor: E,
  { options: { rules = [] } }: WithTazePlugin<ExitBreakPlugin, V, E>
): KeyboardHandlerReturnType => event => {
  const entry = getBlockAbove(editor);
  if (!entry) return;

  rules.forEach(({ hotkey, ...rule }) => {
    if (isHotkey(hotkey, event as any) && queryNode(entry, rule.query)) {
      if (exitBreak(editor as any, rule)) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  });
};
