import { Value } from "../../slate/editor/TEditor";
import { AnyObject } from "../../types/misc/AnyObject";
import { TazeRenderNodeProps } from "../../types/taze/TazeRenderNodeProps";
import { WithTazePlugin } from "../../types/plugin/TazePlugin";

/**
 * Override node props with plugin props.
 * `props.element.attributes` are passed as `nodeProps`.
 * Extend the class name with the node type.
 */
export const getRenderNodeProps = <V extends Value>({
  attributes,
  nodeProps,
  props,
  type
}: Pick<WithTazePlugin<V>, "type" | "props"> & {
  attributes?: AnyObject;
  nodeProps: TazeRenderNodeProps<V>;
}): TazeRenderNodeProps<V> => {
  let newProps: AnyObject = {};

  if (props) {
    newProps =
      (typeof props === "function" ? props(nodeProps as any) : props) ?? {};
  }

  if (!newProps.nodeProps && attributes) {
    newProps.nodeProps = attributes;
  }

  nodeProps = { ...nodeProps, ...newProps };

  const { className } = nodeProps;

  return { ...nodeProps, className };
};
