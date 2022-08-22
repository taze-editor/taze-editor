import { Value } from "../../slate/editor/TEditor";
import { TazePlugin } from "../plugin/TazePlugin";
import { PluginKey } from "../plugin/TazePluginKey";
import { TazeEditor } from "./TazeEditor";

export type OverrideByKey<
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
> = Record<PluginKey, Partial<TazePlugin<{}, V, E>>>;
