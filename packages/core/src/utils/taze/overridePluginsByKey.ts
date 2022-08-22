import defaultsDeep from "lodash/defaultsDeep";
import { Value } from "../../slate/editor/TEditor";
import { NoInfer } from "../../types/misc/NoInfer";
import { OverrideByKey } from "../../types/taze/OverrideByKey";
import { TazeEditor } from "../../types/taze/TazeEditor";
import { TazePlugin, PluginOptions } from "../../types/plugin/TazePlugin";

/**
 * Recursive deep merge of each plugin from `overrideByKey`
 * into plugin with same key (plugin > plugin.plugins).
 */
export const overridePluginsByKey = <
  P = PluginOptions,
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
>(
  plugin: TazePlugin<NoInfer<P>, V, E>,
  overrideByKey: OverrideByKey<V, E> = {},
  nested?: boolean
): TazePlugin<NoInfer<P>, V, E> => {
  if (overrideByKey[plugin.key]) {
    const {
      plugins: pluginOverridesPlugins,
      then: pluginOverridesThen,
      ...pluginOverrides
    } = overrideByKey[plugin.key];

    // override plugin
    plugin = defaultsDeep(pluginOverrides, plugin);

    if (!nested) {
      // concat new pluginOverrides.plugins to plugin.plugins
      pluginOverridesPlugins?.forEach(pOverrides => {
        if (!plugin.plugins) plugin.plugins = [];

        const found = plugin.plugins.find(p => p.key === pOverrides.key);
        if (!found) plugin.plugins.push(pOverrides);
      });
    }
  }

  if (plugin.plugins) {
    // override plugin.plugins
    plugin.plugins = plugin.plugins.map(p =>
      overridePluginsByKey<{}, V, E>(p, overrideByKey, true)
    );
  }

  const { then } = plugin;

  if (then) {
    // override plugin.then
    plugin.then = (editor, p) => {
      const pluginThen = { key: plugin.key, ...then(editor, p) };

      return defaultsDeep(
        overridePluginsByKey(pluginThen as any, overrideByKey),
        pluginThen
      );
    };
  } else if (overrideByKey[plugin.key]?.then) {
    // TODO: recursvie
    plugin.then = overrideByKey[plugin.key].then as any;
  }

  return plugin;
};
