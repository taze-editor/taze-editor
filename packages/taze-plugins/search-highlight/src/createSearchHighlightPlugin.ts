import { createPluginFactory, TazeEditor, Value } from "@taze-editor/taze-core";
import { decorateSearchHighlight } from "./decorateSearchHighlight";
import { useSearchHighlightPluginStore } from "./useSearchHighlightPluginStore";
import { TSearchPluginStore } from "./types/store";
import { SearchHighlightComponent } from "./SearchHighlightComponent";
import { SearchHighlightEffect } from "./SearchHighlightEffect";

export const MARK_SEARCH_HIGHLIGHT = "search-highlight";

export const createSearchHighlightPlugin = createPluginFactory<
  {},
  Value,
  TazeEditor<Value>,
  TSearchPluginStore
>({
  key: MARK_SEARCH_HIGHLIGHT,
  type: MARK_SEARCH_HIGHLIGHT,
  isLeaf: true,
  renderAfterEditable: SearchHighlightEffect,
  component: SearchHighlightComponent,
  store: useSearchHighlightPluginStore,
  decorate: decorateSearchHighlight
});
