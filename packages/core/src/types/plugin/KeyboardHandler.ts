import { KeyboardEvent } from "react";
import { Value } from "../../slate/editor/TEditor";
import { TazeEditor } from "../taze/TazeEditor";
import { DOMHandler, DOMHandlerReturnType } from "./DOMHandlers";
import { PluginOptions } from "./TazePlugin";

export type KeyboardHandler<
  P = PluginOptions,
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>,
  S extends object = any
> = DOMHandler<P, V, E, S, KeyboardEvent>;

export type KeyboardHandlerReturnType = DOMHandlerReturnType<KeyboardEvent>;
