declare type CurrentPath = string;
declare type PreviousPath = string | null;
declare type PathsHistory = string[];

declare interface Hook {
  (...args: any[]): () => void;
}

declare interface AsyncHook {
  (...args: any[]): Promise<() => void> | Promise<void>;
}

declare interface UrlArgumentFunction {
  (url?: string): boolean;
}

declare type UrlArgument = string | RegExp | UrlArgumentFunction;

declare interface HookListMember {
  url: UrlArgument;
  toDo: Hook | AsyncHook;
}

declare type HookList = HookListMember[];

declare type GoArgument = string;

declare interface OnOptionalArguments {
  hook?: Hook | AsyncHook;
  onEnter?: Hook | AsyncHook;
  onLeave?: Hook | AsyncHook;
  onBeforeEnter?: Hook | AsyncHook;
}

declare interface GoOptionalArguments {
  onEnter?: any[];
  onLeave?: any[];
  onBeforeEnter?: any[];
}
