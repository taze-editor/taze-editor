import {
  createPluginFactory,
  onKeyDownToggleElement
} from "@taze-editor/taze-core";
import { H2 } from "./components/H2";
import { ELEMENT_H2 } from "./constants";

export const createHeadingTwoPlugin = createPluginFactory({
  key: ELEMENT_H2,
  type: ELEMENT_H2,
  isElement: true,
  handlers: {
    onKeyDown: onKeyDownToggleElement
  },
  component: H2,
  options: {
    hotkey: [`mod+opt+2`, `mod+shift+2`]
  }
});
