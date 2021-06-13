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

type HookList = {
  url: string;
  toDo: Hook;
}[];

type OnEnterList = {
  url: string;
  toDo: OnEnter;
}[];

type OnLeaveList = {
  url: string;
  toDo: OnLeave;
}[];

type OnBeforeEnterList = {
  url: string;
  toDo: OnBeforeEnter;
}[];

type GoArgument = string;

interface OnOptionalArguments {
  hook?: Hook;
  onEnter?: OnEnter;
  onLeave?: OnLeave;
  onBeforeEnter?: OnBeforeEnter;
}
