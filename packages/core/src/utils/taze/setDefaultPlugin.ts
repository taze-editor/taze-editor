import { Value } from "../../slate/editor/TEditor";
import { TazeEditor } from "../../types/taze/TazeEditor";
import {
  TazePlugin,
  PluginOptions,
  WithTazePlugin
} from "../../types/plugin/TazePlugin";

export const setDefaultPlugin = <
  P = PluginOptions,
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
>(
  plugin: TazePlugin<P, V, E>
): WithTazePlugin<P, V, E> => {
  if (plugin.type === undefined) plugin.type = plugin.key;
  if (!plugin.options) plugin.options = {} as any;

  return plugin as WithTazePlugin<P, V, E>;
};
