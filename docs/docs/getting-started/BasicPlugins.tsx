import React from "react";
import { CommonSandpack } from "../components/sandpack";

const App = `import { useMemo } from "react";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";

import { 
  createTazeEditor, 
  Taze,
  TDescendant
} from "@taze-editor/core";

import { 
  createBoldPlugin,
  createItalicPlugin,
  createUnderlinePlugin,
  createStrikethroughPlugin,
  createSuperscriptPlugin,
  createSubscriptPlugin,
  createCodePlugin,
} from "@taze-editor/plugins";


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
            createCodePlugin(),
          ]
        })
      )
    ),
  []);

  const initialValue: TDescendant[] = [{
    type: "p",
    children: [{ text: "This is editable" }],
  }]

  return (
    <div>
      <Taze
        editor={editor} 
        initialValue={initialValue} 
      />
    </div>
  );
}`;

export const BasicPlugins = () => {
  return (
    <CommonSandpack
      files={{
        "/App.tsx": App
      }}
      deps={{
        "@taze-editor/plugins": "^1.0.0"
      }}
    />
  );
};
