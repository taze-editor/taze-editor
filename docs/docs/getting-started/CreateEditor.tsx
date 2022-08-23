import React from "react";
import { CommonSandpack } from "../components/sandpack";

const App = `import { useMemo } from "react";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";

import { 
  createTazeEditor, 
  Taze,
  TDescendant
} from "@taze-editor/taze-core";


export default function App() {

  const editor = useMemo(() => 
    withReact(
      withHistory(
        createTazeEditor()
      )
    ),
  []);

  const initialValue: TDescendant[] = [{
    type: "p",
    children: [{ text: "This is editable " }],
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

export const CreateEditor = () => {
  return (
    <CommonSandpack
      files={{
        "/App.tsx": App
      }}
    />
  );
};
