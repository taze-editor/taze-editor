import {
  createPluginFactory,
  onKeyDownToggleElement
} from "@taze-editor/taze-core";
import { H1 } from "./components/H1";
import { ELEMENT_H1 } from "./constants";

export const createHeadingOnePlugin = createPluginFactory({
  key: ELEMENT_H1,
  type: ELEMENT_H1,
  isElement: true,
  handlers: {
    onKeyDown: onKeyDownToggleElement
  },
  component: H1,
  options: {
    hotkey: [`mod+opt+1`, `mod+shift+1`]
  }
});
