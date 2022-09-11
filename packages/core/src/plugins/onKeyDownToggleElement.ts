import isHotkey from "is-hotkey";
import { castArray } from "lodash";
import { Value } from "../slate/editor/TEditor";
import { toggleNodeType } from "../transforms/toggleNodeType";
import { ELEMENT_DEFAULT } from "../types/taze/node.types";
import { TazeEditor } from "../types/taze/TazeEditor";
import { HotkeyPlugin } from "../types/plugin/HotkeyPlugin";
import { KeyboardHandlerReturnType } from "../types/plugin/KeyboardHandler";
import { WithTazePlugin } from "../types/plugin/TazePlugin";
import { getPluginType } from "../utils/taze/getPluginType";

export const onKeyDownToggleElement = <
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
>(
  editor: E,
  { type, options }: WithTazePlugin<HotkeyPlugin, V, E>
): KeyboardHandlerReturnType => e => {
  const defaultType = getPluginType(editor, ELEMENT_DEFAULT);

  if (!options?.hotkey) return;

  const hotkeys = castArray(options?.hotkey);

  for (const _hotkey of hotkeys) {
    if (isHotkey(_hotkey, e as any)) {
      e.preventDefault();
      toggleNodeType(editor, {
        activeType: type,
        inactiveType: defaultType
      });
      return;
    }
  }
};
