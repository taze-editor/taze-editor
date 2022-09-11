import { Value } from "../../slate/editor/TEditor";
import { TazeEditor } from "../../types/taze/TazeEditor";
import { PluginOptions, WithTazePlugin } from "../../types/plugin/TazePlugin";
import { PluginKey } from "../../types/plugin/TazePluginKey";

/**
 * Get `editor.pluginsByKey`
 */
export const getPluginsByKey = <
  P = PluginOptions,
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
>(
  editor?: E
): Record<PluginKey, WithTazePlugin<P, V, E>> => {
  return (
    (editor?.pluginsByKey as Record<PluginKey, WithTazePlugin<P, V, E>>) ?? {}
  );
};
