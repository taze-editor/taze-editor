# @taze-editor/taze-plugin-exit-break

## 2.0.0

### Major Changes

- 4c0a147: In this major version, upgrades to the minimum required versions of `slate`,
  `slate-react`, and `slate-history` have set up.

  We introduce `renderAfterEditable` and `renderBeforeEditable` for the
  `TazePlugin` type, providing flexibility for users to integrate plugins like
  `@taze-editor/taze-plugin-search-highlight`.

  Importantly, there's no longer a need to use `useSearchHighlightPluginStore`
  unless its necessary (to make it work). This enhancement simplifies the
  integration of the search highlight plugin for a smoother experience.

### Patch Changes

- Updated dependencies [4c0a147]
  - @taze-editor/taze-core@2.0.0

## 1.14.0

### Minor Changes

- 57eff18: Provide controllable editor - controlled (value/setValue)

### Patch Changes

- Updated dependencies [57eff18]
  - @taze-editor/taze-core@1.14.0

## 1.13.0

### Minor Changes

- e83272f: Add `exit-break`, `node-id` and `reset-node` plugins into `@taze-editor/taze`

### Patch Changes

- Updated dependencies [e83272f]
  - @taze-editor/taze-core@1.13.0

## 1.12.0

### Minor Changes

- 67ceb82: Add core `is` checker helpers and queries

### Patch Changes

- Updated dependencies [67ceb82]
  - @taze-editor/taze-core@1.12.0

## 1.11.0

### Minor Changes

- 32aa1f1: Add `node-id` plugin

### Patch Changes

- Updated dependencies [32aa1f1]
  - @taze-editor/taze-core@1.11.0

## 1.10.1

### Patch Changes

- b9815bf: Add node matchers and recursive `apply` operation utils
- Updated dependencies [b9815bf]
  - @taze-editor/taze-core@1.10.1

## 1.10.0

### Minor Changes

- 7ca8b87: Add `exit-break` plugin

### Patch Changes

- Updated dependencies [7ca8b87]
  - @taze-editor/taze-core@1.10.0
