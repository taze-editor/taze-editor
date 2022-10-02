import { TEditor, Value } from "../../slate/editor/TEditor";
import { THistoryEditor } from "../../slate/history-editor/THistoryEditor";
import { TReactEditor } from "../../slate/react-editor/TReactEditor";
import { PluginKey } from "../plugin";
import { WithTazePlugin } from "../plugin/TazePlugin";

export type TazeEditor<V extends Value = Value> = TEditor<V> &
  THistoryEditor<V> &
  TReactEditor<V> & {
    key: any;
    id: string;
    plugins: WithTazePlugin<{}, V>[];
    pluginsByKey: Record<PluginKey, WithTazePlugin<{}, V>>;
  };
