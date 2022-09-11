import {
  createPluginFactory,
  onKeyDownToggleElement
} from "@taze-editor/taze-core";
import { H3 } from "./components/H3";
import { ELEMENT_H3 } from "./constants";

export const createHeadingOnePlugin = createPluginFactory({
  key: ELEMENT_H3,
  type: ELEMENT_H3,
  isElement: true,
  handlers: {
    onKeyDown: onKeyDownToggleElement
  },
  component: H3,
  options: {
    hotkey: [`mod+opt+3`, `mod+shift+3`]
  }
});
