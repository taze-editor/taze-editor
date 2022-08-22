import {
  AnimationEvent,
  ClipboardEvent,
  CompositionEvent,
  DragEvent,
  FocusEvent,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  SyntheticEvent,
  TouchEvent,
  TransitionEvent,
  UIEvent,
  WheelEvent
} from "react";
import { Value } from "../../slate/editor/TEditor";
import { TazeEditor } from "../taze/TazeEditor";
import { PluginOptions, WithTazePlugin } from "./TazePlugin";

/**
 * If true, the next handlers will be skipped.
 */
export type HandlerReturnType = boolean | void;

export type DOMHandlerReturnType<EV = {}> = (event: EV) => HandlerReturnType;

export type DOMHandler<
  P = PluginOptions,
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>,
  S extends object = any,
  EV = {}
> = (editor: E, plugin: WithTazePlugin<P, V, E, S>) => DOMHandlerReturnType<EV>;

export interface DOMHandlers<
  P = PluginOptions,
  V extends Value = Value,
  E extends TazeEditor<V> = TazeEditor<V>,
  S extends object = any
> {
  // Clipboard Events
  onCopy?: DOMHandler<P, V, E, S, ClipboardEvent>;
  onCopyCapture?: DOMHandler<P, V, E, S, ClipboardEvent>;
  onCut?: DOMHandler<P, V, E, S, ClipboardEvent>;
  onCutCapture?: DOMHandler<P, V, E, S, ClipboardEvent>;
  onPaste?: DOMHandler<P, V, E, S, ClipboardEvent>;
  onPasteCapture?: DOMHandler<P, V, E, S, ClipboardEvent>;

  // Composition Events
  onCompositionEnd?: DOMHandler<P, V, E, S, CompositionEvent>;
  onCompositionEndCapture?: DOMHandler<P, V, E, S, CompositionEvent>;
  onCompositionStart?: DOMHandler<P, V, E, S, CompositionEvent>;
  onCompositionStartCapture?: DOMHandler<P, V, E, S, CompositionEvent>;
  onCompositionUpdate?: DOMHandler<P, V, E, S, CompositionEvent>;
  onCompositionUpdateCapture?: DOMHandler<P, V, E, S, CompositionEvent>;

  // Focus Events
  onFocus?: DOMHandler<P, V, E, S, FocusEvent>;
  onFocusCapture?: DOMHandler<P, V, E, S, FocusEvent>;
  onBlur?: DOMHandler<P, V, E, S, FocusEvent>;
  onBlurCapture?: DOMHandler<P, V, E, S, FocusEvent>;

  // Form Events
  onDOMBeforeInput?: DOMHandler<P, V, E, S, Event>;
  onBeforeInput?: DOMHandler<P, V, E, S, FormEvent>;
  onBeforeInputCapture?: DOMHandler<P, V, E, S, FormEvent>;
  onInput?: DOMHandler<P, V, E, S, FormEvent>;
  onInputCapture?: DOMHandler<P, V, E, S, FormEvent>;
  onReset?: DOMHandler<P, V, E, S, FormEvent>;
  onResetCapture?: DOMHandler<P, V, E, S, FormEvent>;
  onSubmit?: DOMHandler<P, V, E, S, FormEvent>;
  onSubmitCapture?: DOMHandler<P, V, E, S, FormEvent>;
  onInvalid?: DOMHandler<P, V, E, S, FormEvent>;
  onInvalidCapture?: DOMHandler<P, V, E, S, FormEvent>;

  // Image Events
  onLoad?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onLoadCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;

  // Keyboard Events
  onKeyDown?: DOMHandler<P, V, E, S, KeyboardEvent>;
  onKeyDownCapture?: DOMHandler<P, V, E, S, KeyboardEvent>;
  onKeyPress?: DOMHandler<P, V, E, S, KeyboardEvent>;
  onKeyPressCapture?: DOMHandler<P, V, E, S, KeyboardEvent>;
  onKeyUp?: DOMHandler<P, V, E, S, KeyboardEvent>;
  onKeyUpCapture?: DOMHandler<P, V, E, S, KeyboardEvent>;

  // Media Events
  onAbort?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onAbortCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onCanPlay?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onCanPlayCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onCanPlayThrough?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onCanPlayThroughCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onDurationChange?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onDurationChangeCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onEmptied?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onEmptiedCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onEncrypted?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onEncryptedCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onEnded?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onEndedCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onLoadedData?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onLoadedDataCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onLoadedMetadata?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onLoadedMetadataCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onLoadStart?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onLoadStartCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onPause?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onPauseCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onPlay?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onPlayCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onPlaying?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onPlayingCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onProgress?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onProgressCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onRateChange?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onRateChangeCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onSeeked?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onSeekedCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onSeeking?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onSeekingCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onStalled?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onStalledCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onSuspend?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onSuspendCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onTimeUpdate?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onTimeUpdateCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onVolumeChange?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onVolumeChangeCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onWaiting?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onWaitingCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;

  // MouseEvents
  onAuxClick?: DOMHandler<P, V, E, S, MouseEvent>;
  onAuxClickCapture?: DOMHandler<P, V, E, S, MouseEvent>;
  onClick?: DOMHandler<P, V, E, S, MouseEvent>;
  onClickCapture?: DOMHandler<P, V, E, S, MouseEvent>;
  onContextMenu?: DOMHandler<P, V, E, S, MouseEvent>;
  onContextMenuCapture?: DOMHandler<P, V, E, S, MouseEvent>;
  onDoubleClick?: DOMHandler<P, V, E, S, MouseEvent>;
  onDoubleClickCapture?: DOMHandler<P, V, E, S, MouseEvent>;
  onDrag?: DOMHandler<P, V, E, S, DragEvent>;
  onDragCapture?: DOMHandler<P, V, E, S, DragEvent>;
  onDragEnd?: DOMHandler<P, V, E, S, DragEvent>;
  onDragEndCapture?: DOMHandler<P, V, E, S, DragEvent>;
  onDragEnter?: DOMHandler<P, V, E, S, DragEvent>;
  onDragEnterCapture?: DOMHandler<P, V, E, S, DragEvent>;
  onDragExit?: DOMHandler<P, V, E, S, DragEvent>;
  onDragExitCapture?: DOMHandler<P, V, E, S, DragEvent>;
  onDragLeave?: DOMHandler<P, V, E, S, DragEvent>;
  onDragLeaveCapture?: DOMHandler<P, V, E, S, DragEvent>;
  onDragOver?: DOMHandler<P, V, E, S, DragEvent>;
  onDragOverCapture?: DOMHandler<P, V, E, S, DragEvent>;
  onDragStart?: DOMHandler<P, V, E, S, DragEvent>;
  onDragStartCapture?: DOMHandler<P, V, E, S, DragEvent>;
  onDrop?: DOMHandler<P, V, E, S, DragEvent>;
  onDropCapture?: DOMHandler<P, V, E, S, DragEvent>;
  onMouseDown?: DOMHandler<P, V, E, S, MouseEvent>;
  onMouseDownCapture?: DOMHandler<P, V, E, S, MouseEvent>;
  onMouseEnter?: DOMHandler<P, V, E, S, MouseEvent>;
  onMouseLeave?: DOMHandler<P, V, E, S, MouseEvent>;
  onMouseMove?: DOMHandler<P, V, E, S, MouseEvent>;
  onMouseMoveCapture?: DOMHandler<P, V, E, S, MouseEvent>;
  onMouseOut?: DOMHandler<P, V, E, S, MouseEvent>;
  onMouseOutCapture?: DOMHandler<P, V, E, S, MouseEvent>;
  onMouseOver?: DOMHandler<P, V, E, S, MouseEvent>;
  onMouseOverCapture?: DOMHandler<P, V, E, S, MouseEvent>;
  onMouseUp?: DOMHandler<P, V, E, S, MouseEvent>;
  onMouseUpCapture?: DOMHandler<P, V, E, S, MouseEvent>;

  // Selection Events
  onSelect?: DOMHandler<P, V, E, S, SyntheticEvent>;
  onSelectCapture?: DOMHandler<P, V, E, S, SyntheticEvent>;

  // Touch Events
  onTouchCancel?: DOMHandler<P, V, E, S, TouchEvent>;
  onTouchCancelCapture?: DOMHandler<P, V, E, S, TouchEvent>;
  onTouchEnd?: DOMHandler<P, V, E, S, TouchEvent>;
  onTouchEndCapture?: DOMHandler<P, V, E, S, TouchEvent>;
  onTouchMove?: DOMHandler<P, V, E, S, TouchEvent>;
  onTouchMoveCapture?: DOMHandler<P, V, E, S, TouchEvent>;
  onTouchStart?: DOMHandler<P, V, E, S, TouchEvent>;
  onTouchStartCapture?: DOMHandler<P, V, E, S, TouchEvent>;

  // Pointer Events
  onPointerDown?: DOMHandler<P, V, E, S, PointerEvent>;
  onPointerDownCapture?: DOMHandler<P, V, E, S, PointerEvent>;
  onPointerMove?: DOMHandler<P, V, E, S, PointerEvent>;
  onPointerMoveCapture?: DOMHandler<P, V, E, S, PointerEvent>;
  onPointerUp?: DOMHandler<P, V, E, S, PointerEvent>;
  onPointerUpCapture?: DOMHandler<P, V, E, S, PointerEvent>;
  onPointerCancel?: DOMHandler<P, V, E, S, PointerEvent>;
  onPointerCancelCapture?: DOMHandler<P, V, E, S, PointerEvent>;
  onPointerEnter?: DOMHandler<P, V, E, S, PointerEvent>;
  onPointerEnterCapture?: DOMHandler<P, V, E, S, PointerEvent>;
  onPointerLeave?: DOMHandler<P, V, E, S, PointerEvent>;
  onPointerLeaveCapture?: DOMHandler<P, V, E, S, PointerEvent>;
  onPointerOver?: DOMHandler<P, V, E, S, PointerEvent>;
  onPointerOverCapture?: DOMHandler<P, V, E, S, PointerEvent>;
  onPointerOut?: DOMHandler<P, V, E, S, PointerEvent>;
  onPointerOutCapture?: DOMHandler<P, V, E, S, PointerEvent>;
  onGotPointerCapture?: DOMHandler<P, V, E, S, PointerEvent>;
  onGotPointerCaptureCapture?: DOMHandler<P, V, E, S, PointerEvent>;
  onLostPointerCapture?: DOMHandler<P, V, E, S, PointerEvent>;
  onLostPointerCaptureCapture?: DOMHandler<P, V, E, S, PointerEvent>;

  // UI Events
  onScroll?: DOMHandler<P, V, E, S, UIEvent>;
  onScrollCapture?: DOMHandler<P, V, E, S, UIEvent>;

  // Wheel Events
  onWheel?: DOMHandler<P, V, E, S, WheelEvent>;
  onWheelCapture?: DOMHandler<P, V, E, S, WheelEvent>;

  // Animation Events
  onAnimationStart?: DOMHandler<P, V, E, S, AnimationEvent>;
  onAnimationStartCapture?: DOMHandler<P, V, E, S, AnimationEvent>;
  onAnimationEnd?: DOMHandler<P, V, E, S, AnimationEvent>;
  onAnimationEndCapture?: DOMHandler<P, V, E, S, AnimationEvent>;
  onAnimationIteration?: DOMHandler<P, V, E, S, AnimationEvent>;
  onAnimationIterationCapture?: DOMHandler<P, V, E, S, AnimationEvent>;

  // Transition Events
  onTransitionEnd?: DOMHandler<P, V, E, S, TransitionEvent>;
  onTransitionEndCapture?: DOMHandler<P, V, E, S, TransitionEvent>;
}
