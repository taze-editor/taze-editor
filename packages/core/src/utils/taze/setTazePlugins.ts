import { TazeProps } from "../../components/taze/Taze";
import { createHistoryPlugin } from "../../plugins/createHistoryPlugin";
import { createReactPlugin } from "../../plugins/createReactPlugin";
import {
  createInlineVoidPlugin,
  KEY_INLINE_VOID
} from "../../plugins/createInlineVoidPlugin";
import { Value } from "../../slate/editor/TEditor";
import { TazeEditor } from "../../types/taze/TazeEditor";
import { TazePlugin } from "../../types/plugin/TazePlugin";
import { flattenDeepPlugins } from "./flattenDeepPlugins";
import { overridePluginsByKey } from "./overridePluginsByKey";

/**
 * Flatten deep plugins then set editor.plugins and editor.pluginsByKey
 */
export const setTazePlugins = <
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
>(
  editor: E,
  {
    disableCorePlugins,
    plugins: _plugins = []
  }: Pick<TazeProps<V, E>, "plugins" | "disableCorePlugins">
) => {
  let plugins: TazePlugin<{}, V, TazeEditor<V>>[] = [];

  if (disableCorePlugins !== true) {
    const dcp = disableCorePlugins;

    if (typeof dcp !== "object" || !dcp?.react) {
      plugins.push((editor?.pluginsByKey?.react as any) ?? createReactPlugin());
    }
    if (typeof dcp !== "object" || !dcp?.history) {
      plugins.push(
        (editor?.pluginsByKey?.history as any) ?? createHistoryPlugin()
      );
    }
    if (typeof dcp !== "object" || !dcp?.inlineVoid) {
      plugins.push(
        (editor?.pluginsByKey?.[KEY_INLINE_VOID] as any) ??
          createInlineVoidPlugin()
      );
    }
  }

  plugins = [...plugins, ..._plugins] as any;

  editor.plugins = [];
  editor.pluginsByKey = {};

  flattenDeepPlugins(editor, plugins);

  // override all the plugins one by one, so plugin.overrideByKey effects can be overridden by the next plugin
  editor.plugins.forEach(plugin => {
    if (plugin.overrideByKey) {
      const newPlugins = editor.plugins.map(p => {
        return overridePluginsByKey<V>(p as any, plugin.overrideByKey as any);
      });

      editor.plugins = [];
      editor.pluginsByKey = {};

      // flatten again the overrides
      flattenDeepPlugins<V>(editor, newPlugins as any);
    }
  });
};
