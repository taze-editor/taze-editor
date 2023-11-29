import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";
import { monokaiPro } from "@codesandbox/sandpack-themes";
import { rootCode } from "./rootCode";
import { tazeVersion2 } from "@site/tazeVersion";

export interface CommonSandpackProps {
  files?: Record<string, string>;
  deps?: Record<string, string>;
  editorHeight?: number;
}

export const CommonSandpack = ({
  files,
  deps,
  editorHeight = 800
}: CommonSandpackProps) => {
  return (
    <Sandpack
      theme={monokaiPro}
      template="react-ts"
      files={{
        "/index.tsx": rootCode,
        ...files
      }}
      customSetup={{
        dependencies: {
          react: "17.0.2",
          "react-dom": "17.0.2",
          "react-scripts": "4.0.3",
          slate: "0.93.0",
          "slate-history": "0.93.0",
          "slate-react": "0.93.0",
          "@taze-editor/taze-core": tazeVersion2,
          ...deps
        }
      }}
      options={{
        showLineNumbers: true,
        showInlineErrors: true,
        editorHeight
      }}
    />
  );
};
