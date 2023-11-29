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
  decorate: decorateSearchHighlight,
  onChange: (editor, store) => _value => {
    if (!store) {
      console.warn(
        "[@taze-editor/taze-plugin-search-highlight] store is not defined @onChange"
      );
      return;
    }

    const { operations } = editor;
    const firstOperation = operations[0];

    if (
      firstOperation &&
      (firstOperation.type === "insert_text" ||
        firstOperation.type === "remove_text")
    ) {
      const {
        getAllSearchRanges,
        setSearchMatchedRanges,
        searchParams
      } = store.getState();

      const ranges = getAllSearchRanges(editor, searchParams);
      setSearchMatchedRanges(ranges);
    }
  }
});
