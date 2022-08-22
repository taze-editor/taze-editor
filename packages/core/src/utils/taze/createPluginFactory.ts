import { Value } from "../../slate/editor/TEditor";
import { NoInfer } from "../../types/misc/NoInfer";
import { TazeEditor } from "../../types/taze/TazeEditor";
import { TazePlugin, PluginOptions } from "../../types/plugin/TazePlugin";
import { overridePluginsByKey } from "./overridePluginsByKey";
import { OverrideByKey } from "../../types/taze/OverrideByKey";

/**
 * Create plugin factory with a default plugin.
 * - first param is the default plugin.
 * - the only required property of the default plugin is `key`.
 * - returns a plugin factory:
 *   - first param `override` can be used to (deeply) override the default plugin.
 *   - second param `overrideByKey` can be used to (deeply) override by key a nested plugin (in plugin.plugins).
 */
export const createPluginFactory =
  <
    P = PluginOptions,
    V extends Value = Value,
    E extends TazeEditor<V> = TazeEditor<V>,
    S extends object = any
  >(
    defaultPlugin: TazePlugin<NoInfer<P>, V, E, S>
  ) =>
  <OP = P, OV extends Value = V, OE extends TazeEditor<OV> = TazeEditor<OV>>(
    override?: Partial<TazePlugin<NoInfer<OP>, OV, OE>>,
    overrideByKey: OverrideByKey<OV, OE> = {}
  ): TazePlugin<NoInfer<OP>, OV, OE> => {
    overrideByKey[defaultPlugin.key] = override as any;

    return overridePluginsByKey<OP, OV, OE>(
      { ...defaultPlugin } as any,
      overrideByKey
    );
  };
