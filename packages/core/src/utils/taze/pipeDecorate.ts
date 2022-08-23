import { Range } from "slate";
import { Value } from "../../slate/editor/TEditor";
import { TEditableProps } from "../../slate/types/TEditableProps";
import { TazeEditor } from "../../types/taze/TazeEditor";

/**
 * @see {@link Decorate}.
 * Optimization: return undefined if empty list so Editable uses a memo.
 */
export const pipeDecorate = <V extends Value>(
  editor: TazeEditor<V>,
  decorateProp?: TEditableProps<V>["decorate"]
): TEditableProps<V>["decorate"] => {
  const decorates = editor.plugins.flatMap(
    plugin => plugin.decorate?.(editor, plugin) ?? []
  );
  if (decorateProp) {
    decorates.push(decorateProp);
  }
  if (!decorates.length) return;

  return entry => {
    let ranges: Range[] = [];

    const addRanges = (newRanges?: Range[]) => {
      if (newRanges?.length) ranges = [...ranges, ...newRanges];
    };

    decorates.forEach(decorate => {
      addRanges(decorate(entry));
    });

    return ranges;
  };
};
