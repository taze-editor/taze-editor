import React from "react";
import { DefaultLeaf } from "../../components/taze/DefaultLeaf";
import { Value } from "../../slate/editor/TEditor";
import { TazeEditor } from "../../types/taze/TazeEditor";
import { RenderLeaf } from "../../types/taze/RenderLeaf";
import { TazePlugin } from "../../types/plugin/TazePlugin";
import { getRenderNodeProps } from "./getRenderNodeProps";

/**
 * Get a `Editable.renderLeaf` handler for `options.type`.
 * If the type is equals to the slate leaf type, render `options.component`.
 * Else, return `children`.
 */
export const pluginRenderLeaf =
  <V extends Value>(
    editor: TazeEditor<V>,
    { key, type = key, component, props }: TazePlugin<{}, V>
  ): RenderLeaf =>
  nodeProps => {
    const { leaf, children } = nodeProps;

    if (leaf[type]) {
      const Leaf = component ?? DefaultLeaf;

      nodeProps = getRenderNodeProps({
        attributes: leaf.attributes as any,
        props,
        nodeProps: nodeProps as any,
        type
      }) as any;

      return <Leaf {...nodeProps}>{children}</Leaf>;
    }

    return children;
  };
