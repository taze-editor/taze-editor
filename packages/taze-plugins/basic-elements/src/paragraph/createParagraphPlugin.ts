import {
  createPluginFactory,
  HotkeyPlugin,
  onKeyDownToggleElement
} from "@taze-editor/taze-core";
import { Paragraph } from "./Paragraph";

export const ELEMENT_PARAGRAPH = "p";

/**
 * Enables support for paragraphs.
 */
export const createParagraphPlugin = createPluginFactory<HotkeyPlugin>({
  key: ELEMENT_PARAGRAPH,
  type: ELEMENT_PARAGRAPH,
  isElement: true,
  handlers: {
    onKeyDown: onKeyDownToggleElement
  },
  component: Paragraph,
  options: {
    hotkey: ["mod+opt+0", "mod+shift+0"]
  }
});
