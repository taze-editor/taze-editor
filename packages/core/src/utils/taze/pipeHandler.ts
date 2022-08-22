import { SyntheticEvent } from "react";
import { Value } from "../../slate/editor/TEditor";
import { TEditableProps } from "../../slate/types/TEditableProps";
import { TazeEditor } from "../../types/taze/TazeEditor";
import { DOMHandlers, HandlerReturnType } from "../../types/plugin/DOMHandlers";

/**
 * Check if an event is overrided by a handler.
 */
export const isEventHandled = <
  EventType extends SyntheticEvent<unknown, unknown>
>(
  event: EventType,
  handler?: (event: EventType) => void | boolean
) => {
  if (!handler) {
    return false;
  }
  // The custom event handler may return a boolean to specify whether the event
  // shall be treated as being handled or not.
  const shouldTreatEventAsHandled = handler(event);

  if (shouldTreatEventAsHandled != null) {
    return shouldTreatEventAsHandled;
  }

  return event.isPropagationStopped();
};

/**
 * Generic pipe for handlers.
 * - Get all the plugins handlers by `handlerKey`.
 * - If there is no plugin handler or editable prop handler for this key, return `undefined`.
 * - Return a handler calling all the plugins handlers then the prop handler.
 * - Any handler returning true will stop the next handlers to be called, including slate internal handler.
 */
export const pipeHandler = <V extends Value, K extends keyof DOMHandlers<V>>(
  editor: TazeEditor<V>,
  {
    editableProps,
    handlerKey
  }: { editableProps?: TEditableProps<V> | null; handlerKey: K }
): ((event: any) => void) | undefined => {
  if (!editor.plugins) {
    return;
  }
  let pluginsHandlers: ((event: any) => HandlerReturnType)[] = [];
  pluginsHandlers = editor.plugins.flatMap(
    plugin => plugin.handlers?.[handlerKey]?.(editor, plugin) ?? []
  );

  const propsHandler = editableProps?.[handlerKey] as (
    event: any
  ) => HandlerReturnType | undefined;

  if (!pluginsHandlers.length && !propsHandler) return;

  return (event: any) => {
    const eventIsHandled = pluginsHandlers.some(handler =>
      isEventHandled(event, handler)
    );
    if (eventIsHandled) return true;

    return isEventHandled(event, propsHandler);
  };
};
