import React from "react";
import { DefaultElement } from "slate-react";
import { Value } from "../../slate/editor/TEditor";
import { TEditableProps } from "../../slate/types/TEditableProps";
import { TazeEditor } from "../../types/taze/TazeEditor";
import { RenderElement } from "../../types/taze/RenderElement";
import { pluginRenderElement } from "./pluginRenderElement";

/**
 * @see {@link RenderElement}
 */
export const pipeRenderElement = <V extends Value>(
  editor: TazeEditor<V>,
  renderElementProp?: TEditableProps<V>["renderElement"]
): TEditableProps<V>["renderElement"] => {
  const renderElements: RenderElement[] = [];

  editor.plugins.forEach(plugin => {
    if (plugin.isElement) {
      renderElements.push(pluginRenderElement(editor, plugin));
    }
  });

  return nodeProps => {
    const props = nodeProps;

    let element;

    renderElements.some(renderElement => {
      element = renderElement(props as any);
      return !!element;
    });

    if (element) return element;

    if (renderElementProp) {
      return renderElementProp(props);
    }

    return <DefaultElement {...props} />;
  };
};
