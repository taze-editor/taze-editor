import { Value } from "../../slate/editor/TEditor";
import { EElement, TElement } from "../../slate/element/TElement";
import { TRenderElementProps } from "../../slate/types/TRenderElementProps";
import { TazeRenderNodeProps } from "./TazeRenderNodeProps";

/**
 * Element props passed by Taze
 */
export type TazeRenderElementProps<
  V extends Value = Value,
  N extends TElement = EElement<V>
> = TazeRenderNodeProps<V> & TRenderElementProps<V, N>;
