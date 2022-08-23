import {
  createPluginFactory,
  onKeyDownToggleMark,
  ToggleMarkPlugin
} from "@taze-editor/taze-core";
import { Superscript } from "./components/Superscript";

export const MARK_SUPERSCRIPT = "superscript";
const MARK_SUBSCRIPT = "subscript";

/**
 * Enables support for superscript formatting.
 */
export const createSuperscriptPlugin = createPluginFactory<ToggleMarkPlugin>({
  key: MARK_SUPERSCRIPT,
  type: MARK_SUPERSCRIPT,
  isLeaf: true,
  component: Superscript,
  handlers: {
    onKeyDown: onKeyDownToggleMark
  },
  options: {
    hotkey: "mod+.",
    clear: MARK_SUBSCRIPT
  }
});
