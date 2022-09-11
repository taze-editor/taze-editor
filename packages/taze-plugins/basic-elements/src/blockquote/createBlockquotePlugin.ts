import {
  createPluginFactory,
  HotkeyPlugin,
  onKeyDownToggleElement
} from "@taze-editor/taze-core";
import { Blockquote } from "./Blockquote";

export const ELEMENT_BLOCKQUOTE = "blockquote";

/**
 * Enables support for block quotes, useful for
 * quotations and passages.
 */
export const createBlockquotePlugin = createPluginFactory<HotkeyPlugin>({
  key: ELEMENT_BLOCKQUOTE,
  type: ELEMENT_BLOCKQUOTE,
  isElement: true,
  handlers: {
    onKeyDown: onKeyDownToggleElement
  },
  component: Blockquote,
  options: {
    hotkey: "mod+shift+."
  }
});
