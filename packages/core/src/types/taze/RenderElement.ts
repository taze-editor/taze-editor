import { Value } from "../../slate/editor/TEditor";
import { TazeRenderElementProps } from "./TazeRenderElementProps";

/**
 * Function used to render an element.
 * If the function returns undefined then the next RenderElement function is called.
 * If the function renders a JSX element then that JSX element is rendered.
 */
export type RenderElement = <V extends Value>(
  props: TazeRenderElementProps<V>
) => JSX.Element | undefined;
