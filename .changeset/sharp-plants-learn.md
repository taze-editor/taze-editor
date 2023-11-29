---
"@taze-editor/taze-core": major
"@taze-editor/taze": major
"@taze-editor/taze-plugin-basic-elements": major
"@taze-editor/taze-plugin-basic-marks": major
"@taze-editor/taze-plugin-exit-break": major
"@taze-editor/taze-plugin-node-id": major
"@taze-editor/taze-plugin-reset-node": major
"@taze-editor/taze-plugin-search-highlight": major
"@taze-editor/taze-ui-balloon-toolbar": major
---

In this major version, upgrades to the minimum required versions of `slate`,
`slate-react`, and `slate-history` have set up.

We introduce `renderAfterEditable` and `renderBeforeEditable` for the
`TazePlugin` type, providing flexibility for users to integrate plugins like
`@taze-editor/taze-plugin-search-highlight`.

Importantly, there's no longer a need to use `useSearchHighlightPluginStore`
unless its necessary (to make it work). This enhancement simplifies the
integration of the search highlight plugin for a smoother experience.
