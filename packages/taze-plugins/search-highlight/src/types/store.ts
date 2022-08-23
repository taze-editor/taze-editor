import { Editor, Node, Path } from "slate";
import { TDecoratedRange, TSearchParams } from "./types";

export type TSearchPluginStore = {
  searchParams: TSearchParams;
  replaceQuery: string;
  searchMatchedRanges: TDecoratedRange[];
  searchStep: number;
  setSearchParams: (params: TSearchParams) => void;
  setReplaceQuery: (value: string) => void;
  moveNextSearchStep: () => void;
  movePrevSearchStep: () => void;
  setSearchMatchedRanges: (ranges: TDecoratedRange[]) => void;
  setSearchStep: (value: number) => void;
  getSearchRanges: (
    node: Node,
    path: Path,
    searchParams: TSearchParams,
    focusedRange?: TDecoratedRange
  ) => TDecoratedRange[];
  getAllSearchRanges: (
    editor: Editor,
    searchParams: TSearchParams
  ) => TDecoratedRange[];
  replaceOne: (editor: Editor) => void;
  replaceAll: (editor: Editor) => void;
  getNextSearchMatchStep: (editor: Editor, ranges: TDecoratedRange[]) => number;
};
