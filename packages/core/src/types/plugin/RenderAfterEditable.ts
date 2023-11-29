import { TEditableProps } from "../../slate";
import { TazeEditor } from "../taze";

export type RenderAfterEditable = (
  editableProps: TEditableProps & { editor?: TazeEditor }
) => React.ReactElement | null;
