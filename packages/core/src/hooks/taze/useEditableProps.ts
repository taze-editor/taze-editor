import { useMemo } from "react";
import { useDeepCompareMemo } from "use-deep-compare";
import { TEditableProps, Value } from "../../slate";
import { TazeEditor } from "../../types";
import { DOM_HANDLERS, pipeHandler } from "../../utils";
import { useDecorate } from "./useDecorate";
import { useRenderElement } from "./useRenderElement";
import { useRenderLeaf } from "./useRenderLeaf";

export const useEditableProps = <
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
>({
  editor
}: {
  editor: E;
}): TEditableProps<V> => {
  if (!editor) return {};

  const renderElement = useRenderElement<V>({ editor });
  const renderLeaf = useRenderLeaf<V>({ editor });
  const decorate = useDecorate<V>({ editor });

  const props: TEditableProps<V> = useDeepCompareMemo(() => {
    const _props: TEditableProps<V> = {
      renderElement,
      renderLeaf,
      decorate
    };

    DOM_HANDLERS.forEach(handlerKey => {
      const handler = pipeHandler(editor, {
        handlerKey
      }) as any;

      if (handler) {
        _props[handlerKey] = handler;
      }
    });

    return _props;
  }, [editor, renderElement, renderLeaf, decorate]);

  return props;
};
