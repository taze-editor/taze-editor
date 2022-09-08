import {
  DecorateEntry,
  TazeEditor,
  TNodeEntry,
  Value,
  WithTazePlugin
} from "@taze-editor/taze-core";
import { TSearchPluginStore } from "./types/store";

export const decorateSearchHighlight = <
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
>(
  editor: E,
  plugin: WithTazePlugin<{}, V, E, TSearchPluginStore>
): DecorateEntry => ([node, path]: TNodeEntry) => {
  const { store } = plugin;

  if (!store) return;

  const {
    getSearchRanges,
    searchParams,
    searchMatchedRanges,
    searchStep
  } = store.getState();

  return getSearchRanges(
    node,
    path,
    searchParams,
    searchMatchedRanges[searchStep]
  );
};
