import { Range } from "slate";
import { Value } from "../../slate/editor/TEditor";
import { ENodeEntry } from "../../slate/node/TNodeEntry";
import { TazeEditor } from "../taze/TazeEditor";
import { PluginOptions, WithTazePlugin } from "./TazePlugin";

export type DecorateEntry<V extends Value = Value> = (
  entry: ENodeEntry<V>
) => Range[] | undefined;

/**
 * Property used by Taze to decorate editor ranges.
 * If the function returns undefined then no ranges are modified.
 * If the function returns an array the returned ranges are merged with the ranges called by other plugins.
 */
export type Decorate<
  P = PluginOptions,
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>,
  S extends object = any
> = (
  editor: TazeEditor<V>,
  plugin: WithTazePlugin<P, V, E, S>
) => DecorateEntry<V>;
