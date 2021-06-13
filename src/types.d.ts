type CurrentPath = string;
type PreviousPath = string | null;
type PathsHistory = string[];

interface Hook {
  (...args: any[]): () => void;
  async(...args: any[]): () => void;
}

interface OnEnter {
  (...args: any[]): () => void;
  async(...args: any[]): () => void;
}

interface OnLeave {
  (...args: any[]): () => void;
  async(...args: any[]): () => void;
}

interface OnBeforeEnter {
  (...args: any[]): () => void;
  async(...args: any[]): () => void;
}

interface UrlArgumentFunction {
  (url?: string): boolean;
}

type UrlArgument = string | RegExp | UrlArgumentFunction;

type HookList = {
  url: UrlArgument;
  toDo: Hook;
}[];

type OnEnterList = {
  url: UrlArgument;
  toDo: OnEnter;
}[];

type OnLeaveList = {
  url: UrlArgument;
  toDo: OnLeave;
}[];

type OnBeforeEnterList = {
  url: UrlArgument;
  toDo: OnBeforeEnter;
}[];

type GoArgument = string;

interface OnOptionalArguments {
  hook?: Hook;
  onEnter?: OnEnter;
  onLeave?: OnLeave;
  onBeforeEnter?: OnBeforeEnter;
}

interface GoOptionalArguments {
  onEnter?: any[];
  onLeave?: any[];
  onBeforeEnter?: any[];
}
