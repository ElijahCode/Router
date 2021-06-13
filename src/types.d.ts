type CurrentPath = string;
type PreviousPath = string | null;
type PathsHistory = string[];

interface Hook {
  (): () => void;
  async(): () => void;
}

interface OnEnter {
  (): () => void;
  async(): () => void;
}

interface OnLeave {
  (): () => void;
  async(): () => void;
}

interface OnBeforeEnter {
  (): () => void;
  async(): () => void;
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
