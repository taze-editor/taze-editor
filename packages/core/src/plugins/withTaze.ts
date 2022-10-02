import { TazeProps } from "../components";
import { TEditor, Value } from "../slate/editor/TEditor";
import { TazeEditor } from "../types/taze/TazeEditor";
import { setTazePlugins } from "../utils/taze/setTazePlugins";

export interface WithTazeOptions<
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
> extends Pick<TazeProps<V, E>, "plugins" | "disableCorePlugins"> {}

export const withTaze = <
  V extends Value = Value,
  E extends TEditor<V> = TEditor<V>
>(
  e: E,
  { plugins, disableCorePlugins }: WithTazeOptions<V, E & TazeEditor<V>> = {}
): E & TazeEditor<V> => {
  let editor = (e as any) as E & TazeEditor<V>;

  if (!editor.key) {
    editor.key = Math.random();
  }

  setTazePlugins<V>(editor, {
    plugins: plugins as any,
    disableCorePlugins
  });

  // withOverrides
  editor.plugins.forEach(plugin => {
    if (plugin.withOverrides) {
      editor = plugin.withOverrides(editor, plugin) as any;
    }
  });

  return editor;
};
