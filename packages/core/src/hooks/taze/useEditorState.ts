import { useSlate as useSlateReact } from "slate-react";
import { Value } from "../../slate/editor/TEditor";
import { TazeEditor } from "../../types/taze/TazeEditor";

/**
 * Typed {@link useSlate} & TazeEditor.
 * Needs to be called in a child component of `Taze`.
 */

export const useEditorState = <
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
>() => (useSlateReact() as unknown) as E;
