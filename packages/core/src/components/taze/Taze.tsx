import React from "react";
import { Slate, Editable } from "slate-react";
import { useTaze } from "../../hooks";
import { TDescendant, TEditableProps, Value } from "../../slate";
import { TazeEditor } from "../../types/taze/TazeEditor";

export type TazeProps<
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>
> = {
  editor: E;
  plugins?: E["plugins"];
  children?: React.ReactNode;
  /**
   * Initial value of the editor.
   * @default [{ children: [{ text: '' }]}]
   */
  initialValue?: TDescendant[];
  /**
   * When `true`, it will normalize the initial value passed to the `editor` once it gets created.
   * This is useful when adding normalization rules on already existing content.
   * @default false
   */
  normalizeInitialValue?: boolean;
  /**
   * Ref to the `Editable` component.
   */
  editableRef?: React.Ref<HTMLDivElement>;
  /**
   * Custom `Editable` node.
   */
  renderEditable?: (props: TEditableProps) => React.ReactNode;
  /**
   * `Editable` placeholder.
   */
  placeholder?: string;
  /**
   * A component which placed before `Editable`
   */
  beforeEditable?: React.ReactNode;
  /**
   * A component which placed after `Editable`
   */
  afterEditable?: React.ReactNode;
  /**
   * If `true`, disable all the core plugins.
   * If an object, disable the core plugin properties that are `true` in the object.
   */
  disableCorePlugins?:
    | {
        inlineVoid?: boolean;
        history?: boolean;
        react?: boolean;
      }
    | boolean;
};

export const Taze = ({
  editor,
  children,
  initialValue = [{ type: "p", children: [{ text: "" }] }],
  editableRef,
  renderEditable,
  placeholder,
  beforeEditable,
  afterEditable,
  ...options
}: TazeProps) => {
  const { slateProps, editableProps } = useTaze({ editor, initialValue });
  return (
    <Slate editor={editor} {...(slateProps as any)}>
      {beforeEditable}
      {renderEditable ? (
        renderEditable({ ...(editableProps as any), ref: editableRef })
      ) : (
        <Editable
          ref={editableRef}
          placeholder={placeholder}
          {...(editableProps as any)}
        />
      )}
      {children}
      {afterEditable}
    </Slate>
  );
};
