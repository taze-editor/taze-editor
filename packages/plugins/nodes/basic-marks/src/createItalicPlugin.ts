import {
  createPluginFactory,
  onKeyDownToggleMark,
  ToggleMarkPlugin
} from "@taze-editor/taze-core";
import { Italic } from "./components/Italic";

export const MARK_ITALIC = "italic";

/**
 * Enables support for italic formatting.
 */
export const createItalicPlugin = createPluginFactory<ToggleMarkPlugin>({
  key: MARK_ITALIC,
  type: MARK_ITALIC,
  isLeaf: true,
  component: Italic,
  handlers: {
    onKeyDown: onKeyDownToggleMark
  },
  options: {
    hotkey: "mod+i"
  }
});
