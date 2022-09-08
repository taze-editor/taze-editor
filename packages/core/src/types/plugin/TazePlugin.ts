import { Value } from "../../slate/editor/TEditor";
import { AnyObject } from "../misc/AnyObject";
import { TazeEditor } from "../taze/TazeEditor";
import { Decorate } from "./Decorate";
import { DOMHandlers } from "./DOMHandlers";
import { TazePluginComponent } from "./TazePluginComponent";
import { TazePluginKey } from "./TazePluginKey";
import { TazePluginStore } from "./TazePluginStore";
import { TazePluginProps } from "./TazePluginProps";

/**
 * The `TazePlugin` interface is a base interface for all plugins.
 */
export type TazePlugin<
  P = PluginOptions,
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>,
  S extends object = any
> = Required<TazePluginKey> & {
  /**
   * Plugin store api that stores plugin related context
   */
  store?: TazePluginStore<S>;
  /**
   *
   */
  onChange?: (editor: E, store?: TazePluginStore<S>) => (value: V) => void;
  /**
   * Handlers called whenever the corresponding event occurs in the editor.
   * Event handlers can return a boolean flag to specify whether the event can be treated as being handled.
   * If it returns `true`, the next handlers will not be called.
   */
  handlers?: DOMHandlers<P, V, E, S>;
  /**
   * React component rendering a slate element or leaf.
   * @default DefaultElement | DefaultLeaf
   */
  component?: TazePluginComponent;
  /**
   * @see {@link Decorate}
   */
  decorate?: Decorate<P, V, E>;
  /**
   * Property used by Taze to render nodes of this `type` as elements, i.e. `renderElement`.
   */
  isElement?: boolean;

  /**
   * Property used by `inlineVoid` core plugin to set elements of this `type` as inline.
   */
  isInline?: boolean;

  /**
   * Property used by Taze to render nodes of this `type` as leaves, i.e. `renderLeaf`.
   */
  isLeaf?: boolean;

  /**
   * Property used by `inlineVoid` core plugin to set elements of this `type` as void.
   */
  isVoid?: boolean;
  /**
   * Extended properties used by any plugin as options.
   */
  options?: P;
  /**
   * Recursive plugin support to allow having multiple plugins in a single plugin.
   * Taze eventually flattens all the plugins into the editor.
   */
  plugins?: TazePlugin<PluginOptions, V, E>[];
  /**
   * Property used by Taze to override node `component` props.
   * If function, its returning value will be shallow merged to the old props, with the old props as parameter.
   * If object, its value will be shallow merged to the old props.
   */
  props?: TazePluginProps<V>;
  /**
   * Recursive plugin merging.
   * Can be used to derive plugin fields from `editor` and `plugin`.
   * The returned value will be deeply merged to the plugin.
   */
  then?: (
    editor: E,
    plugin: WithTazePlugin<P, V, E>
  ) => Partial<TazePlugin<P, V, E>> | void;
  /**
   * Property used by Taze to render a node by type.
   * It requires slate node properties to have a `type` property.
   * @default key
   */
  type?: string;
};

export type PluginOptions = AnyObject;

export type WithTazePlugin<
  P = PluginOptions,
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>,
  S extends object = any
> = TazePlugin<P, V, E, S>;
