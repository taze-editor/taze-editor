import React from "react";
import { DefaultLeaf } from "../../components/taze/DefaultLeaf";
import { Value } from "../../slate/editor/TEditor";
import { TEditableProps } from "../../slate/types/TEditableProps";
import { TazeEditor } from "../../types/taze/TazeEditor";
import { RenderLeaf } from "../../types/taze/RenderLeaf";
import { pluginRenderLeaf } from "./pluginRenderLeaf";

/**
 * @see {@link RenderLeaf}
 */
export const pipeRenderLeaf = <V extends Value>(
  editor: TazeEditor<V>,
  renderLeafProp?: TEditableProps<V>["renderLeaf"]
): TEditableProps<V>["renderLeaf"] => {
  const renderLeafs: RenderLeaf[] = [];

  editor.plugins.forEach(plugin => {
    if (plugin.isLeaf && plugin.key) {
      renderLeafs.push(pluginRenderLeaf(editor, plugin));
    }
  });

  return nodeProps => {
    const { attributes, children, leaf, text } = nodeProps;
    const dataAttrs =
      leaf && typeof leaf === "object"
        ? Object.keys(leaf).reduce((acc, key) => {
            return {
              ...acc,
              ...(typeof leaf[key] === "boolean" && {
                [`data-taze-leaf-${key}`]: leaf[key]
              })
            };
          }, {})
        : {};

    const props = {
      editor,
      attributes,
      children,
      leaf,
      text,
      ...dataAttrs
    };

    renderLeafs.forEach(renderLeaf => {
      const newChildren = renderLeaf(props as any);

      if (newChildren !== undefined) {
        props.children = newChildren;
      }
    });

    if (renderLeafProp) {
      return renderLeafProp(props);
    }

    return <DefaultLeaf {...props} />;
  };
};
