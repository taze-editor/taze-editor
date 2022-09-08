import { StoreApi, UseBoundStore } from "zustand";

export type TazePluginStore<T> = UseBoundStore<StoreApi<T>>;
