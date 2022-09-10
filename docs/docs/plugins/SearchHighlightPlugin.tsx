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
  createSearchHighlightPlugin,
  useSearchHighlightPluginStore
} from "@taze-editor/taze-plugin-search-highlight";

import { Toolbar } from "./Toolbar";

export default function App() {

  // NOTE: \`useSearchHighlightPluginStore\` 
  // Must be used for the search highlight plugin to work properly
  // This is a workaround for the fact that the plugin store does not
  // reflect the changes in the store to the editor
  const storeSearchHighlight = useSearchHighlightPluginStore();

  const editor = useMemo(() => 
    withReact(
      withHistory(
        createTazeEditor({
          plugins: [
            createSearchHighlightPlugin()
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

export const SearchHighlightPlugin = () => {
  return (
    <CommonSandpack
      files={{
        "/App.tsx": App,
        "/Toolbar.tsx": Toolbar,
        "/Styled.tsx": Styled
      }}
      deps={{
        "@taze-editor/taze-plugin-search-highlight": tazeVersion,
        "@desygna/desygna": "1.0.0",
        "@emotion/react": "^11.10.0",
        "@emotion/styled": "^11.10.0"
      }}
    />
  );
};

const Styled = `import { styled, composeAll } from "@desygna/desygna";

export const Div = styled.div(composeAll);

export const Input = styled.input({
  width: "100%",
  height: "24px",
  border: "1px solid #f1f3f5",
  borderRadius: "8px",
  padding: "0px 4px",
  "&:focus": {
    outline: "none"
  },
  "&::placeholder": {
    color: "#d7dbdf"
  }
}, composeAll);

export const Button = styled.button({
  backgroundColor: "#5bb98c",
  color: "white",
  border: "none",
  cursor: "pointer",
  width: "max-content",
  height: "24px",
  borderRadius: "8px",
}, composeAll);
`;

const Toolbar = `import { useEffect } from "react";

import { useEditorState } from "@taze-editor/taze-core";

import { 
  useSearchHighlightPluginStore,
  useSearchHighlightEffect
} from "@taze-editor/taze-plugin-search-highlight";

import * as S from "./Styled";

export const Toolbar = () => {

  const store = useSearchHighlightPluginStore();

  const {
    searchParams,
    setSearchParams,
    replaceQuery,
    setReplaceQuery,
    replaceOne,
    replaceAll,
    moveNextSearchStep,
    movePrevSearchStep,
    searchStep,
    setSearchStep,
    getAllSearchRanges,
    searchMatchedRanges,
    setSearchMatchedRanges,
    getNextSearchMatchStep
  } = store;

  const editor = useEditorState();

  // NOTE: \`useSearchHighlightEffect\`
  // Must be used for the reflect the changes in the store to the editor
  useSearchHighlightEffect({ editor });

  return (
    <S.Div display="flex" flexDirection="column" gap="8px" my="12px" border="1px solid #dfe3e6" borderRadius="6px" padding="8px">
      <S.Div display="flex" gap="8px" width="100%">
        <S.Input
          placeholder="Search..."
          value={searchParams.query} 
          onChange={(e) => {
            setSearchParams({
              ...searchParams,
              query: e.target.value
            })
          }} 
        />
         <S.Input
          placeholder="Replace with"
          value={replaceQuery} 
          onChange={(e) => setReplaceQuery(e.target.value)} 
        />
      </S.Div>
      
      <S.Div w="100%" display="flex" justifyContent="space-between" gap="4px">
        <S.Div display="flex" gap="4px" justifyContent="center">
          <S.Button onMouseDown={() => movePrevSearchStep()}>
            &lt; Prev
          </S.Button>
          <S.Button onMouseDown={() => moveNextSearchStep()}>
            Next &gt;
          </S.Button>
        </S.Div>

        <S.Div pt="8px" color="#ccc" fontSize="12px">
          {searchMatchedRanges.length ? searchStep + 1 : 0} of {searchMatchedRanges.length}
        </S.Div>

        <S.Div display="flex" gap="4px">
          <S.Button onMouseDown={() => replaceOne(editor)}>
            Replace
          </S.Button>
          <S.Button onMouseDown={() => replaceAll(editor)}>
            Replace All
          </S.Button>
        </S.Div>
      </S.Div>
    </S.Div>
  );
};
`;
