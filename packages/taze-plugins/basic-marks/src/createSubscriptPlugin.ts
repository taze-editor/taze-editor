import {
  createPluginFactory,
  onKeyDownToggleMark,
  ToggleMarkPlugin
} from "@taze-editor/taze-core";
import { Subscript } from "./components/Subscript";

export const MARK_SUBSCRIPT = "subscript";
const MARK_SUPERSCRIPT = "superscript";

/**
 * Enables support for subscript formatting.
 */
export const createSubscriptPlugin = createPluginFactory<ToggleMarkPlugin>({
  key: MARK_SUBSCRIPT,
  type: MARK_SUBSCRIPT,
  isLeaf: true,
  component: Subscript,
  handlers: {
    onKeyDown: onKeyDownToggleMark
  },
  options: {
    hotkey: "mod+,",
    clear: MARK_SUPERSCRIPT
  }
});
