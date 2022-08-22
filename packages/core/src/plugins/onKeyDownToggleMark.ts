import isHotkey from "is-hotkey";
import { Value } from "../slate/editor/TEditor";
import { toggleMark } from "../transforms/toggleMark";
import { TazeEditor } from "../types/taze/TazeEditor";
import { KeyboardHandlerReturnType } from "../types/plugin/KeyboardHandler";
import { WithTazePlugin } from "../types/plugin/TazePlugin";
import { ToggleMarkPlugin } from "../types/plugin/ToggleMarkPlugin";

export const onKeyDownToggleMark =
  <
    V extends Value = Value,
    E extends TazeEditor<V> = TazeEditor<V>,
    S extends object = any
  >(
    editor: E,
    { type, options }: WithTazePlugin<ToggleMarkPlugin, V, E, S>
  ): KeyboardHandlerReturnType =>
  e => {
    if (!options?.hotkey) return;

    if (isHotkey(options.hotkey, e as any)) {
      e.preventDefault();

      toggleMark(editor, { key: type as any, clear: options?.clear });
    }
  };
