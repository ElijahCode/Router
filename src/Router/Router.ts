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

  abstract go(url: string): Promise<void>;

  public on(
    inputUrl: string,
    hook?: Hook | undefined,
    onEnter?: OnEnter | undefined,
    onLeave?: OnLeave | undefined,
    onBeforeEnter?: OnBeforeEnter
  ): void {
    if (hook) {
      this.hookLIst.push({
        url: inputUrl,
        toDo: hook,
      });
    }
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

  protected async onEnter(url: string): Promise<void> {
    const onEnterThatWillRun = this.onEnterList.filter((el) => el.url === url);
    onEnterThatWillRun.forEach(async (el) => {
      await el.toDo();
    });
  }

  protected async onLeave(url: string): Promise<void> {
    const onLeaveThatWillRun = this.onLeaveList.filter((el) => el.url === url);
    onLeaveThatWillRun.forEach(async (el) => {
      await el.toDo();
    });
  }

  protected async onBeforeEnter(url: string): Promise<void> {
    const onBeforeEnterThatWillRun = this.onBeforeEnterList.filter(
      (el) => el.url === url
    );
    onBeforeEnterThatWillRun.forEach(async (el) => {
      await el.toDo();
    });
  }
}
