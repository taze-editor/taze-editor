import {
  createPluginFactory,
  onKeyDownToggleMark,
  ToggleMarkPlugin
} from "@taze-editor/core";
import { Underline } from "./components/Underline";

export const MARK_UNDERLINE = "underline";

/**
 * Enables support for underline formatting.
 */
export const createUnderlinePlugin = createPluginFactory<ToggleMarkPlugin>({
  key: MARK_UNDERLINE,
  type: MARK_UNDERLINE,
  isLeaf: true,
  component: Underline,
  handlers: {
    onKeyDown: onKeyDownToggleMark
  },
  options: {
    hotkey: "mod+u"
  }
});
