import {
  createPluginFactory,
  onKeyDownToggleMark,
  ToggleMarkPlugin
} from "@taze-editor/core";
import { Code } from "./components/Code";

export const MARK_CODE = "code";

/**
 * Enables support for code formatting
 */
export const createCodePlugin = createPluginFactory<ToggleMarkPlugin>({
  key: MARK_CODE,
  type: MARK_CODE,
  isLeaf: true,
  component: Code,
  handlers: {
    onKeyDown: onKeyDownToggleMark
  },
  options: {
    hotkey: "mod+e"
  }
});
