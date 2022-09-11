import { Value } from "../../slate/editor/TEditor";
import { TazeEditor } from "../../types/taze/TazeEditor";
import { getPlugin } from "./getPlugin";

/**
 * Get plugin type option by plugin key.
 */
export const getPluginType = <V extends Value>(
  editor: TazeEditor<V>,
  key: string
): string => getPlugin<{}, V>(editor, key).type ?? key ?? "";
