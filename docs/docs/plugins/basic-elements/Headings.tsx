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
  createHeadingOnePlugin,
  createHeadingTwoPlugin,
  createHeadingThreePlugin,
} from "@taze-editor/taze-plugin-basic-elements";

import { Toolbar } from "./Toolbar";

export default function App() {

  const editor = useMemo(() => 
    withReact(
      withHistory(
        createTazeEditor({
          plugins: [
            createHeadingOnePlugin(),
            createHeadingTwoPlugin(),
            createHeadingThreePlugin(),
          ],
        })
      )
    ),
  []);

  const initialValue: TDescendant[] = [{
    type: "p",
    children: [{ text: "This is editable." }],
  }]

  return (
    <div>
      <Taze
        editor={editor} 
        initialValue={initialValue}
        beforeEditable={<Toolbar />}
      />
    </div>
  );
}`;

export const Headings = () => {
  return (
    <CommonSandpack
      files={{
        "/App.tsx": App,
        "/Toolbar.tsx": Toolbar,
        "/Styled.tsx": Styled
      }}
      deps={{
        "@taze-editor/taze-plugin-basic-elements": tazeVersion,
        "@desygna/desygna": "1.0.0",
        "@emotion/react": "^11.10.0",
        "@emotion/styled": "^11.10.0"
      }}
    />
  );
};

const Styled = `import { styled, composeAll } from "@desygna/desygna";

export const Div = styled.div(composeAll);

export type ToolbarButtonType = {
  isActive?: boolean;
};

export const Button = styled.button<ToolbarButtonType>(
  ({ isActive }) => ({
    backgroundColor: isActive ? "#5bb98c" : "#f1f3f5",
    color: isActive ? "#fff" : "#11181c",
    border: "none",
    cursor: "pointer",
    width: "max-content",
    height: "24px",
    borderRadius: "8px",
  }), 
  composeAll
);
`;

const Toolbar = `import { useCallback } from "react";

import { 
  useEditorState, 
  toggleNodeType, 
  someNode 
} from "@taze-editor/taze-core";

import { 
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3
} from "@taze-editor/taze-plugin-basic-elements";

import * as S from "./Styled";

export const Toolbar = () => {
  
  const editor = useEditorState();

  const toggleHeading = useCallback((type) => {
    toggleNodeType(editor, {
      activeType: type,
    })
  }, [editor])

  const isHeadingActive = useCallback((type) => {
    return !!editor?.selection && someNode(editor, { match: { type } })
  }, [editor])

  return (
    <S.Div display="flex" gap="4px" my="12px" border="1px solid #dfe3e6" borderRadius="6px" padding="8px">
      <S.Button 
        isActive={isHeadingActive(ELEMENT_H1)}
        onMouseDown={() => toggleHeading(ELEMENT_H1)}
      >
        H1
      </S.Button>
      <S.Button 
        isActive={isHeadingActive(ELEMENT_H2)}
        onMouseDown={() => toggleHeading(ELEMENT_H2)}
      >
        H2
      </S.Button>
      <S.Button 
        isActive={isHeadingActive(ELEMENT_H3)}
        onMouseDown={() => toggleHeading(ELEMENT_H3)}
      >
        H3
      </S.Button>
    </S.Div>
  );
};
`;
