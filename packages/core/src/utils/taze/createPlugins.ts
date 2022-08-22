import { cloneDeep } from "lodash";
import { Value } from "../../slate/editor/TEditor";
import { TazeEditor } from "../../types/taze/TazeEditor";
import { TazePlugin, PluginOptions } from "../../types/plugin/TazePlugin";
import { TazePluginComponent } from "../../types/plugin/TazePluginComponent";
import { OverrideByKey } from "../../types";
import { overridePluginsByKey } from "./overridePluginsByKey";

export const createPlugins = <
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
>(
  plugins: TazePlugin<PluginOptions, V, E>[],
  {
    components,
    overrideByKey
  }: {
    /**
     * Override plugin component by key.
     */
    components?: Record<string, TazePluginComponent>;

    /**
     * Override plugin by key.
     */
    overrideByKey?: OverrideByKey<V, E>;
  } = {}
): TazePlugin<PluginOptions, V, E>[] => {
  let allOverrideByKey: OverrideByKey<V, E> = {};

  if (overrideByKey) {
    allOverrideByKey = cloneDeep(overrideByKey);
  }

  if (components) {
    Object.keys(components).forEach(key => {
      if (!allOverrideByKey[key]) allOverrideByKey[key] = {};

      allOverrideByKey[key].component = components[key];
    });
  }

  if (Object.keys(allOverrideByKey).length) {
    return plugins.map(plugin => {
      return overridePluginsByKey<{}, V, E>(plugin, allOverrideByKey);
    });
  }

  return plugins;
};
