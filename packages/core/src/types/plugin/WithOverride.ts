import { Value } from "../../slate/editor/TEditor";
import { TazeEditor } from "../taze/TazeEditor";
import { PluginOptions, WithTazePlugin } from "./TazePlugin";

/**
 * Plate plugin overriding the `editor` methods.
 * Naming convention is `with*`.
 */
export type WithOverride<
  P = PluginOptions,
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>,
  EE extends E = E
> = (editor: E, plugin: WithTazePlugin<P, V, E>) => EE;
