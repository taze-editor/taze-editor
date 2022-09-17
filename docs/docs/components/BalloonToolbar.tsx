import React from "react";
import { CommonSandpack } from "@site/components/sandpack";
import { tazeVersion } from "@site/tazeVersion";

const App = `import { useMemo } from "react";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";

import { 
  createTazeEditor, 
  Taze,
  TDescendant
} from "@taze-editor/taze-core";

import { 
  createBoldPlugin,
  createItalicPlugin,
  createUnderlinePlugin
} from "@taze-editor/taze-plugin-basic-marks";

import { styled, composeAll } from "@desygna/desygna";

import { BalloonToolbar } from "./BalloonToolbar";


const StyledDiv = styled.div(composeAll);

export default function App() {

  const editor = useMemo(() => 
    withReact(
      withHistory(
        createTazeEditor({
          plugins: [
            createBoldPlugin(),
            createItalicPlugin(),
            createUnderlinePlugin()
          ]
        })
      )
    ),
  []);

  const initialValue: TDescendant[] = [{
    type: "p",
    children: [
      { text: "Hello from " }, 
      { text: "Taze Editor!" },
      { text: " It's a good starting point for you to build your own highly ", },
      { text: "customizable", bold: true, italic: true },
      { text: " and " },
      { text: "extensible", bold: true, italic: true },
      { text: " editor. " }
    ],
  }]

  return (
    <StyledDiv mt="50px">
      <Taze
        editor={editor} 
        initialValue={initialValue}
        beforeEditable={<BalloonToolbar />} 
      />
    </StyledDiv>
  );
}`;

export const BalloonToolbar = () => {
  return (
    <CommonSandpack
      files={{
        "/App.tsx": App,
        "/BalloonToolbar.tsx": BalloonToolbarComponent,
        "/ToolbarButton.tsx": ToolbarButton,
        "/ToolbarMarkButton.tsx": ToolbarMarkButton
      }}
      deps={{
        "@taze-editor/taze-plugin-basic-marks": tazeVersion,
        "@taze-editor/taze-ui-balloon-toolbar": tazeVersion,
        "@desygna/desygna": "1.3.0",
        "@emotion/react": "^11.10.0",
        "@emotion/styled": "^11.10.0"
      }}
    />
  );
};

const BalloonToolbarComponent = `import { useEffect, useRef } from "react";
import { useEditorState } from "@taze-editor/taze-core";
import { Editor, Range } from "slate";
import { useFocused } from "slate-react";

import { 
  MARK_BOLD, 
  MARK_ITALIC, 
  MARK_UNDERLINE
} from "@taze-editor/taze-plugin-basic-marks";

import { styled, composeAll } from "@desygna/desygna";

import { ToolbarMarkButton } from "./ToolbarMarkButton";

import { useBalloonToolbar } from "@taze-editor/taze-ui-balloon-toolbar";

const StyledDiv = styled.div({  
  background: "#fff",
  display: "flex",
  gap: "1px",
  position: "absolute",
  zIndex: "1",
  marginTop: "-12px",
  opacity: "0",
  padding: "4px",
  boxShadow: "0px 0.25px 3px 0.1px #00000020",
  top: "-9999px",
  left: "-9999px",
  border: "1px solid #dfe3e6",
  borderRadius: "8px",
  transition: "opacity 0.4s"
}, composeAll);


export const BalloonToolbar = () => {

  const { ref } = useBalloonToolbar({ offset: 8});

  return (
    <StyledDiv
      ref={ref}
      onMouseDown={e => {
        e.preventDefault();
      }}
    >
      {/** \`BOLD\` mark button */}
      <ToolbarMarkButton mark={MARK_BOLD}>
        <b>B</b>
      </ToolbarMarkButton>

      {/** \`ITALIC\` mark button */}
      <ToolbarMarkButton mark={MARK_ITALIC}>
        <i>I</i>
      </ToolbarMarkButton>

      {/** \`UNDERLINE\` mark button */}
      <ToolbarMarkButton mark={MARK_UNDERLINE}>
        <u>U</u>
      </ToolbarMarkButton>
    </StyledDiv>
  )
}
`;

const useBalloonToolbar = `import {
  getEditorString,
  isCollapsed,
  useEditorState
} from "@taze-editor/taze-core";
import { useEffect, useRef } from "react";
import { useFocused } from "slate-react";

const asPx = (num: number) => num + "px";

export const useBalloonToolbar = () => {
  let offset = 8;
  const ref = useRef<HTMLElement | null>(null);
  const editor = useEditorState();
  const inFocus = useFocused();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !inFocus ||
      isCollapsed(selection) ||
      getEditorString(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();

    if (domSelection) {
      const domRange = domSelection.getRangeAt(0);
      const domSelectionRect = domRange.getBoundingClientRect();

      const topOffset =
        domSelectionRect.top + window.pageYOffset - el.offsetHeight + offset;

      const leftOffset =
        domSelectionRect.left +
        window.pageXOffset -
        el.offsetWidth / 2 +
        domSelectionRect.width / 2;

      const mayOverflowRight =
        leftOffset + offset + el.offsetWidth > window.innerWidth;

      const getTopOffset = () => {
        return topOffset - offset < 0 ? asPx(offset) : asPx(topOffset);
      };

      const getLeftOffset = () => {
        if (leftOffset - offset < 0) return asPx(offset);

        if (mayOverflowRight)
          return asPx(window.innerWidth - el.offsetWidth - offset);

        return asPx(leftOffset);
      };

      Object.assign(el.style, {
        opacity: "1",
        top: getTopOffset(),
        left: getLeftOffset()
      })
    }
  });

  return {
    ref
  };
};
`;

const ToolbarButton = `import { styled, composeAll } from "@desygna/desygna-core";
import { isMarkActive, toggleMark, useEditorState } from "@taze-editor/taze-core";
import { useCallback } from "react";

export type ToolbarButtonType = {
  isActive?: boolean;
};

export const ToolbarButton = styled.button<ToolbarButtonType>(
  ({ isActive }) => ({
    boxSizing: "border-box",
    transition: "all 0.1s",
    cursor: "pointer",
    userSelect: "none",
    width: "24px",
    height: "24px",
    fontSize: "12px",
    borderRadius: "6px",
    border: "none",
    marginRight: "2px",
    backgroundColor: isActive ? "#5bb98c" : "#f1f3f5",
    color: isActive ? "#fff" : "#11181c"
  })
);
`;

const ToolbarMarkButton = `import { useCallback } from "react"; 
import { isMarkActive, toggleMark, useEditorState } from "@taze-editor/taze-core";

import { ToolbarButton } from "./ToolbarButton";

export const ToolbarMarkButton = ({
  mark,
  clear,
  children
}: {
  mark: string;
  clear: string | string[],
  children: React.ReactNode;
}) => {
  const editor = useEditorState();

  const toggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      toggleMark(editor, { key: mark, clear });
    },
    [editor, mark]
  );

  const isActive = isMarkActive(editor, mark);

  return (
    <ToolbarButton isActive={isActive} onMouseDown={toggle}>
      {children}
    </ToolbarButton>
  );
};
`;
