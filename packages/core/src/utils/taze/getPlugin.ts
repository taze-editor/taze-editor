import { Value } from "../../slate/editor/TEditor";
import { TazeEditor } from "../../types/taze/TazeEditor";
import { PluginOptions, WithTazePlugin } from "../../types/plugin/TazePlugin";
import { PluginKey } from "../../types/plugin/TazePluginKey";
import { getPluginsByKey } from "./getPluginsByKey";

/**
 * Get plugin options by plugin key.
 */
export const getPlugin = <
  P = PluginOptions,
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
>(
  editor: E,
  key: PluginKey
): WithTazePlugin<P, V, E> => getPluginsByKey<P, V, E>(editor)[key] ?? { key };
