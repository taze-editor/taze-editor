import { Value } from "../../slate/editor/TEditor";
import { AnyObject } from "../misc/AnyObject";
import { TazeRenderElementProps } from "../taze/TazeRenderElementProps";
import { TazeRenderLeafProps } from "../taze/TazeRenderLeafProps";

/**
 * Props object or function returning props object.
 */
export type TazePluginProps<V extends Value = Value> =
  | AnyObject
  | ((
      props: TazeRenderElementProps<V> & TazeRenderLeafProps<V>
    ) => AnyObject | undefined);
