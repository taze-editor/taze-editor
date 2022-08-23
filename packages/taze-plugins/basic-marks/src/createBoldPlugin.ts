import {
  createPluginFactory,
  onKeyDownToggleMark,
  ToggleMarkPlugin
} from "@taze-editor/taze-core";
import { Bold } from "./components/Bold";

export const MARK_BOLD = "bold";

/**
 * Enables support for bold formatting
 */
export const createBoldPlugin = createPluginFactory<ToggleMarkPlugin>({
  key: MARK_BOLD,
  type: MARK_BOLD,
  isLeaf: true,
  component: Bold,
  handlers: {
    onKeyDown: onKeyDownToggleMark
  },
  options: {
    hotkey: "mod+b"
  }
});
