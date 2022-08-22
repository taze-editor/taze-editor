import { Value } from "../../slate/editor/TEditor";
import { EText, TText } from "../../slate/text/TText";
import { TRenderLeafProps } from "../../slate/types/TRenderLeafProps";
import { TazeRenderNodeProps } from "./TazeRenderNodeProps";

/**
 * Leaf props passed by Taze
 */
export type TazeRenderLeafProps<
  V extends Value = Value,
  N extends TText = EText<V>
> = TazeRenderNodeProps<V> & TRenderLeafProps<V, N>;
