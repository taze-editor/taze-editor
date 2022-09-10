import { createPluginStore } from "@taze-editor/taze-core";
import { Editor, Path, Text, Transforms } from "slate";
import { TSearchPluginStore } from "./types/store";
import { TDecoratedRange } from "./types/types";

export const useSearchHighlightPluginStore = createPluginStore<TSearchPluginStore>(
  (set, get) => ({
    searchParams: {
      query: "",
      caseSensitive: false
    },
    replaceQuery: "",
    searchMatchedRanges: [],
    searchStep: 0,
    setSearchParams: params =>
      set(state => ({ ...state, searchParams: params })),
    setReplaceQuery: value => set(state => ({ ...state, replaceQuery: value })),
    setSearchMatchedRanges: ranges =>
      set(state => ({ ...state, searchMatchedRanges: ranges })),
    setSearchStep: value => set(state => ({ ...state, searchStep: value })),
    moveNextSearchStep: () => {
      const { searchStep, searchMatchedRanges } = get();
      const nextStep =
        searchStep >= searchMatchedRanges.length - 1 ? 0 : searchStep + 1;

      set(state => ({
        ...state,
        searchStep: nextStep
      }));
    },
    movePrevSearchStep: () => {
      const { searchStep, searchMatchedRanges } = get();
      const prevStep =
        searchStep === 0 ? searchMatchedRanges.length - 1 : searchStep - 1;

      set(state => ({
        ...state,
        searchStep: prevStep
      }));
    },
    getSearchRanges: (node, path, searchParams, focusedRange) => {
      const ranges: TDecoratedRange[] = [];

      if (!Text.isText(node) || searchParams.query.length === 0) {
        return ranges;
      }

      let { text } = node;

      let search = searchParams.query;
      if (!searchParams.caseSensitive) {
        text = text.toLowerCase();
        search = searchParams.query.toLowerCase();
      }

      const parts: string[] = text.split(search);

      let offset = 0;
      parts.forEach((part, index) => {
        const isCurrent =
          focusedRange &&
          Path.equals(focusedRange.anchor.path, path) &&
          focusedRange.focus.offset === offset;

        if (index !== 0) {
          ranges.push({
            anchor: { path, offset: offset - search.length },
            focus: { path, offset },
            "search-highlight": true,
            "search-highlight-current": !!isCurrent
          });
        }

        offset = offset + part.length + search.length;
      });

      return ranges;
    },
    getAllSearchRanges: (editor, searchParams) => {
      const { getSearchRanges } = get();
      if (!editor.children.length || searchParams.query.length === 0) {
        return [];
      }

      const matchingNodes = Editor.nodes(editor, {
        at: [],
        match: node =>
          Text.isText(node) &&
          node.text.toLowerCase().includes(searchParams.query.toLowerCase())
      });
      let nodeMatch = matchingNodes.next();
      let ranges: TDecoratedRange[] = [];
      while (!nodeMatch.done) {
        const [node, path] = nodeMatch.value;
        ranges.push(...getSearchRanges(node, path, searchParams));
        nodeMatch = matchingNodes.next();
      }
      return ranges;
    },
    replaceOne: editor => {
      const {
        searchMatchedRanges,
        searchStep,
        replaceQuery,
        setSearchStep
      } = get();

      const focusedRange = searchMatchedRanges[searchStep];

      Transforms.insertText(editor, replaceQuery, {
        at: {
          anchor: focusedRange.anchor,
          focus: focusedRange.focus
        }
      });

      if (searchMatchedRanges.length >= searchStep) {
        setSearchStep(0);
      }
    },
    replaceAll: editor => {
      const { searchMatchedRanges, replaceQuery } = get();
      if (!searchMatchedRanges.length) {
        return;
      }

      const originalWordLength = Math.abs(
        searchMatchedRanges[0].anchor.offset -
          searchMatchedRanges[0].focus.offset
      );
      let sameNodeAdjustment = 0;
      let prevNodePath: Path | undefined;

      searchMatchedRanges.forEach(range => {
        const currentPath = range.anchor.path;
        if (prevNodePath && Path.equals(currentPath, prevNodePath)) {
          sameNodeAdjustment =
            sameNodeAdjustment + (replaceQuery.length - originalWordLength);
        } else {
          sameNodeAdjustment = 0;
        }
        Transforms.insertText(editor, replaceQuery, {
          at: {
            anchor: {
              ...range.anchor,
              offset: range.anchor.offset + sameNodeAdjustment
            },
            focus: {
              ...range.focus,
              offset: range.focus.offset + sameNodeAdjustment
            }
          }
        });

        prevNodePath = range.anchor.path;
      });
    },
    getNextSearchMatchStep: (editor, ranges) => {
      let step = 0;
      if (editor.selection) {
        const { anchor: selectionAnchor } = editor.selection;

        const found = ranges.some(r => {
          const pathCompare = Path.compare(r.anchor.path, selectionAnchor.path);
          if (pathCompare === -1) {
            ++step;
          } else if (pathCompare === 0) {
            if (r.anchor.offset <= selectionAnchor.offset) {
              ++step;
            } else {
              return true;
            }
          } else {
            return true;
          }
          return false;
        });
        if (!found) {
          step = 0;
        }
      }
      return step;
    }
  })
);
