export abstract class Router {
  protected currentPath: CurrentPath;

  protected previousPath: PreviousPath;

  protected history: PathsHistory;

  protected hookLIst: HookList;

  protected onEnterList: OnEnterList;

  protected onLeaveList: OnLeaveList;

  protected onBeforeEnterList: OnBeforeEnterList;

  constructor(rootPath: string) {
    this.currentPath = rootPath;
    this.previousPath = null;
    this.history = [this.currentPath];
    this.hookLIst = [];
    this.onEnterList = [];
    this.onLeaveList = [];
    this.onBeforeEnterList = [];
  }

  abstract go(url: string): void;

  public on(
    inputUrl: string,
    hook: Hook,
    onEnter?: OnEnter,
    onLeave?: OnLeave,
    onBeforeEnter?: OnBeforeEnter
  ): void {
    this.hookLIst.push({
      url: inputUrl,
      toDo: hook,
    });
    if (onEnter) {
      this.onEnterList.push({
        url: inputUrl,
        toDo: onEnter,
      });
    }
    if (onLeave) {
      this.onLeaveList.push({
        url: inputUrl,
        toDo: onLeave,
      });
    }
    if (onBeforeEnter) {
      this.onBeforeEnterList.push({
        url: inputUrl,
        toDo: onBeforeEnter,
      });
    }
  }

  protected onEnter(url: string): void {
    const onEnterThatWillRun = this.onEnterList.filter((el) => el.url === url);
    onEnterThatWillRun.forEach((el) => el.toDo());
  }

  protected onLeave(url: string): void {
    const onLeaveThatWillRun = this.onLeaveList.filter((el) => el.url === url);
    onLeaveThatWillRun.forEach((el) => el.toDo());
  }

  protected onBeforeEnter(url: string): void {
    const onBeforeEnterThatWillRun = this.onBeforeEnterList.filter(
      (el) => el.url === url
    );
    onBeforeEnterThatWillRun.forEach((el) => el.toDo());
  }
}
