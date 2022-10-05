import { HotkeyPlugin, TazeEditor, Value } from "@taze-editor/taze-core";

export interface ResetNodePluginRule<
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
> extends HotkeyPlugin {
  defaultType?: string;

  /**
   * Node types where the rule applies.
   */
  types: string[];

  /**
   * Additional condition to the rule.
   */
  predicate: (editor: E) => boolean;

  /**
   * Callback called when resetting.
   */
  onReset?: (editor: E) => void;
}

export interface ResetNodePlugin<
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
> {
  rules?: ResetNodePluginRule<V, E>[];
}
