import React from "react";
import { CommonSandpack } from "../components/sandpack";
import { tazeVersion } from "../tazeVersion";

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
  createUnderlinePlugin,
  createStrikethroughPlugin,
  createSuperscriptPlugin,
  createSubscriptPlugin,
  createCodePlugin,
} from "@taze-editor/taze-plugin-basic-marks";

import { Toolbar } from "./Toolbar";


export default function App() {

  const editor = useMemo(() => 
    withReact(
      withHistory(
        createTazeEditor({
          plugins: [
            createBoldPlugin(),
            createItalicPlugin(),
            createUnderlinePlugin(),
            createStrikethroughPlugin(),
            createSuperscriptPlugin(),
            createSubscriptPlugin(),
            createCodePlugin()
          ]
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

export const CreateToolbar = () => {
  return (
    <CommonSandpack
      files={{
        "/App.tsx": App,
        "/Toolbar.tsx": Toolbar,
        "/ToolbarButton.tsx": ToolbarButton,
        "/ToolbarMarkButton.tsx": ToolbarMarkButton
      }}
      deps={{
        "@taze-editor/taze-plugin-basic-marks": tazeVersion,
        "@desygna/desygna-core": "0.2.0",
        "@emotion/react": "^11.10.0",
        "@emotion/styled": "^11.10.0"
      }}
    />
  );
};

const ToolbarButton = `import { styled, composeAll } from "@desygna/desygna-core";
import { isMarkActive, toggleMark, useSlate } from "@taze-editor/taze-core";
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
    width: "32px",
    height: "32px",
    borderRadius: "6px",
    border: "none",
    marginRight: "2px",
    backgroundColor: isActive ? "#5bb98c" : "#f1f3f5",
    color: isActive ? "#fff" : "#11181c"
  })
);
`;

const ToolbarMarkButton = `import { useCallback } from "react"; 
import { isMarkActive, toggleMark, useSlate } from "@taze-editor/taze-core";

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
  const editor = useSlate();

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

const Toolbar = `import { 
  MARK_BOLD, 
  MARK_ITALIC, 
  MARK_UNDERLINE, 
  MARK_STRIKETHROUGH, 
  MARK_SUPERSCRIPT, 
  MARK_SUBSCRIPT, 
  MARK_CODE 
} from "@taze-editor/taze-plugin-basic-marks";
import { styled, composeAll } from "@desygna/desygna-core";
import { ToolbarMarkButton } from "./ToolbarMarkButton";

const Container = styled.div(composeAll);

export const Toolbar = () => {
  return (
    <Container display="flex" my="12px" border="1px solid #dfe3e6" borderRadius="6px" padding="2px">
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

      {/** \`STRIKETHROUGH\` mark button */}
      <ToolbarMarkButton mark={MARK_STRIKETHROUGH}>
        <s>S</s>
      </ToolbarMarkButton>

      {/** \`SUPERSCRIPT\` mark button */}
      <ToolbarMarkButton mark={MARK_SUPERSCRIPT} clear={MARK_SUBSCRIPT}>
        X<sup>2</sup>
      </ToolbarMarkButton>
      
      {/** \`SUBSCRIPT\` mark button */}
      <ToolbarMarkButton mark={MARK_SUBSCRIPT} clear={MARK_SUPERSCRIPT}>
        X<sub>2</sub>
      </ToolbarMarkButton>

      {/** \`CODE\` mark button */}
      <ToolbarMarkButton mark={MARK_CODE}>
        &lt;/&gt;
      </ToolbarMarkButton>
    </Container>
  );
};
`;
