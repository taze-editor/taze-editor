import { Editor } from "slate";
import { UnknownObject } from "../../types/misc/AnyObject";
import { Modify } from "../../types/misc/types";
import { TElement } from "../element/TElement";
import { TDescendant } from "../node/TDescendant";
import { TNode } from "../node/TNode";
import { TNodeEntry } from "../node/TNodeEntry";
import { TOperation } from "../types/TOperation";

export type Value = TElement[];

/**
 * A helper type for getting the value of an editor.
 */
export type ValueOf<E extends TEditor> = E["children"];

export type TEditor<V extends Value = Value> = Modify<
  Editor,
  {
    children: V;
    operations: TOperation[];
    marks: Record<string, any> | null;

    // Schema-specific node behaviors.
    isInline: <N extends TElement>(element: N) => boolean;
    isVoid: <N extends TElement>(element: N) => boolean;
    normalizeNode: <N extends TNode>(entry: TNodeEntry<N>) => void;

    // Overrideable core actions.
    apply: <N extends TDescendant>(operation: TOperation<N>) => void;
    getFragment: <N extends TDescendant>() => N[];
    insertFragment: <N extends TDescendant>(fragment: N[]) => void;
    insertNode: <N extends TDescendant>(node: N | N[]) => void;
  }
> &
  UnknownObject;
