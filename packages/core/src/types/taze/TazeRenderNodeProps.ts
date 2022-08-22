import { Value } from "../../slate/editor/TEditor";
import { AnyObject } from "../misc/AnyObject";
import { TazeEditor } from "./TazeEditor";

/**
 * Node props passed by Taze
 */
export interface TazeRenderNodeProps<
  V extends Value,
  E extends TazeEditor<V> = TazeEditor<V>
> {
  className?: string;

  editor: E;

  /**
   * @see {@link NodeProps}
   */
  nodeProps?: AnyObject;
}
