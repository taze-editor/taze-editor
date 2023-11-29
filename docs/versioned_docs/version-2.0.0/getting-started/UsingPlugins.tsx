import React from "react";
import { CommonSandpack } from "@site/components/sandpack-for-v2";
import { tazeVersion2 } from "@site/tazeVersion";

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

export const UsingPlugins = () => {
  return (
    <CommonSandpack
      files={{
        "/App.tsx": App
      }}
      deps={{
        "@taze-editor/taze-plugin-basic-marks": tazeVersion2
      }}
    />
  );
};
