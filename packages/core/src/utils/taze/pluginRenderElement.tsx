import React from "react";
import { DefaultElement } from "slate-react";
import { Value } from "../../slate/editor/TEditor";
import { TazeEditor } from "../../types/taze/TazeEditor";
import { RenderElement } from "../../types/taze/RenderElement";
import { TazePlugin } from "../../types/plugin/TazePlugin";
import { getRenderNodeProps } from "./getRenderNodeProps";

/**
 * Get a `Editable.renderElement` handler for `options.type`.
 * If the type is equals to the slate element type, render `options.component`.
 * Else, return `undefined` so the pipeline can check the next plugin.
 */
export const pluginRenderElement =
  <V extends Value>(
    editor: TazeEditor<V>,
    { key, type, component: _component, props }: TazePlugin<{}, V>
  ): RenderElement =>
  nodeProps => {
    const { element, children: _children } = nodeProps;

    if (element.type === type) {
      const Element = _component ?? DefaultElement;

      nodeProps = getRenderNodeProps({
        attributes: element.attributes as any,
        nodeProps: nodeProps as any,
        props,
        type: type!
      }) as any;

      let children = _children;

      let component: JSX.Element | null = (
        <Element {...nodeProps}>{children}</Element>
      );

      return component;
    }
  };
