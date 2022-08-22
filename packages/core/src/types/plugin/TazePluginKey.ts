/**
 * Unique key to store the plugins by key.
 */
export type PluginKey = string;

export interface TazePluginKey {
  /**
   * Property used by Taze to store the plugins by key in `editor.pluginsByKey`.
   */
  key?: PluginKey;
}
