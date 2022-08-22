import { TazeProps } from "../components";
import { TEditor, Value } from "../slate/editor/TEditor";
import { PluginOptions, TazePlugin } from "../types/plugin/TazePlugin";
import { TazeEditor } from "../types/taze/TazeEditor";

export interface WithTazeOptions<
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
> extends Pick<TazeProps<V, E>, "plugins"> {}

export const withTaze = <
  V extends Value = Value,
  E extends TEditor<V> = TEditor<V>
>(
  editor: E,
  {
    plugins
  }: {
    plugins?: TazePlugin<PluginOptions, V>[];
  } = {}
): E & TazeEditor<V> => {
  let e = editor as any as E & TazeEditor<V>;

  if (!e.key) {
    e.key = Math.random();
  }

  if (plugins) {
    e.plugins = plugins;
  }

  return e;
};
