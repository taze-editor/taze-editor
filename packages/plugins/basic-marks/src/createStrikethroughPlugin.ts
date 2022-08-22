import {
  createPluginFactory,
  onKeyDownToggleMark,
  ToggleMarkPlugin
} from "@taze-editor/core";
import { Strikethrough } from "./components/Strikethrough";

export const MARK_STRIKETHROUGH = "strikethrough";

/**
 * Enables support for strikethrough formatting.
 */
export const createStrikethroughPlugin = createPluginFactory<ToggleMarkPlugin>({
  key: MARK_STRIKETHROUGH,
  type: MARK_STRIKETHROUGH,
  isLeaf: true,
  component: Strikethrough,
  handlers: {
    onKeyDown: onKeyDownToggleMark
  },
  options: {
    hotkey: "mod+shift+x"
  }
});
