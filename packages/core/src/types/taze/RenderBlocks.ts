export const TAZE_LIST_BLOCK_ELEMENTS = [
  "numbered-list",
  "bulleted-list",
  "list-item"
] as const;

export const TAZE_TEXT_ALIGN_TYPES = [
  "left",
  "center",
  "right",
  "justify"
] as const;

export type TTextBlockElement =
  | "block-quote"
  | "heading-one"
  | "heading-two"
  | "heading-three"
  | "heading-four"
  | "heading-five"
  | "heading-six"
  | "paragraph";

export type TListBlockElement = typeof TAZE_LIST_BLOCK_ELEMENTS[number];

export type TTextBlockAlignment = typeof TAZE_TEXT_ALIGN_TYPES[number];

export type TBlockElement = TTextBlockElement | TListBlockElement;

export type BlockFormat =
  | TListBlockElement
  | TTextBlockAlignment
  | TBlockElement;
