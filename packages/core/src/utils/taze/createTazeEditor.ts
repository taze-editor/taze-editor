import { normalizeEditor } from "../../slate/editor/normalizeEditor";
import { TEditor, Value } from "../../slate/editor/TEditor";
import { TazeEditor } from "../../types/taze/TazeEditor";
import { createTEditor } from "../slate/createTEditor";
import { PluginOptions, TazePlugin } from "../../types/plugin/TazePlugin";
import { createPlugins } from "./createPlugins";
import { withTaze, WithTazeOptions } from "../../plugins/withTaze";
import { OverrideByKey, TazePluginComponent } from "../../types";

export interface CreateTazeEditorOptions<
  V extends Value = Value,
  E extends TEditor<V> = TEditor<V>
> extends Omit<WithTazeOptions<V, E & TazeEditor<V>>, "plugins"> {
  editor?: E;
  plugins?: TazePlugin<PluginOptions, V>[];
  components?: Record<string, TazePluginComponent>;
  overrideByKey?: OverrideByKey<V>;
  normalizeInitialValue?: boolean;
}

/**
 * Create a Taze editor with:
 * - `createTEditor` or custom `editor`
 * - `withTaze`
 * - custom `components`
 */
export const createTazeEditor = <
  V extends Value = Value,
  E extends TEditor<V> & TazeEditor<V> = TEditor<V> & TazeEditor<V>
>({
  editor = createTEditor() as E,
  plugins = [],
  components,
  overrideByKey,
  normalizeInitialValue,
  ...withTazeOptions
}: CreateTazeEditorOptions<V, E> = {}): E & TazeEditor<V> => {
  plugins = createPlugins<V>(plugins, {
    components,
    overrideByKey
  });

  const e = withTaze<V>(editor, {
    plugins,
    ...withTazeOptions
  }) as E & TazeEditor<V>;

  if (normalizeInitialValue) {
    normalizeEditor(e, { force: true });
  }

  return e;
};
