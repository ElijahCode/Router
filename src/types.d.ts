type CurrentPath = string;
type PreviousPath = string | null;
type PathsHistory = string[];

interface Hook {
  (): () => void;
}
interface OnEnter {
  (): () => void;
}
interface OnLeave {
  (): () => void;
}
interface OnBeforeEnter {
  (): () => void;
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
