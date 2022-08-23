import { BaseRange } from "slate";

export type TSearchParams = {
  query: string;
  caseSensitive: boolean;
};

export type TSearchReplaceParams = {
  text: string;
  all: boolean;
};

export type TSearchDecorations = {
  "search-highlight"?: boolean;
  "search-highlight-current"?: boolean;
};

export type TDecoratedRange = BaseRange & TSearchDecorations;
