import { Value } from "../../slate/editor/TEditor";
import { TazeEditor } from "../../types/taze/TazeEditor";

export const pipeOnChange = <V extends Value>(editor: TazeEditor<V>) => {
  const onChanges = editor.plugins.flatMap(
    plugin => plugin?.onChange?.(editor, plugin.store) ?? []
  );

  return (nodes: V) => {
    return onChanges.some(handler => {
      if (!handler) {
        return false;
      }
      // The custom event handler may return a boolean to specify whether the event
      // shall be treated as being handled or not.
      const shouldTreatEventAsHandled = handler(nodes);

      if (shouldTreatEventAsHandled != null) {
        return shouldTreatEventAsHandled;
      }

      return false;
    });
  };
};
