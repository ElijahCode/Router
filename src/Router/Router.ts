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
    inputUrl: UrlArgument,
    optionalArguments: OnOptionalArguments
  ): void {
    if (optionalArguments.hook) {
      this.hookLIst.push({
        url: inputUrl,
        toDo: optionalArguments.hook,
      });
    }
    if (optionalArguments.onEnter) {
      this.onEnterList.push({
        url: inputUrl,
        toDo: optionalArguments.onEnter,
      });
    }
    if (optionalArguments.onLeave) {
      this.onLeaveList.push({
        url: inputUrl,
        toDo: optionalArguments.onLeave,
      });
    }
    if (optionalArguments.onBeforeEnter) {
      this.onBeforeEnterList.push({
        url: inputUrl,
        toDo: optionalArguments.onBeforeEnter,
      });
    }
  }

  protected async onEnter(url: string): Promise<void> {
    const onEnterThatWillRun = this.onEnterList.filter((el) => {
      switch (typeof el.url) {
        case "string":
          return el.url === url;
        case "object":
          return el.url.test(url);
        default:
          return false;
      }
    });
    onEnterThatWillRun.forEach(async (el) => {
      await el.toDo();
    });
  }

  protected async onLeave(url: string): Promise<void> {
    const onLeaveThatWillRun = this.onLeaveList.filter((el) => {
      switch (typeof el.url) {
        case "string":
          return el.url === url;
        case "object":
          return el.url.test(url);
        default:
          return false;
      }
    });
    onLeaveThatWillRun.forEach(async (el) => {
      await el.toDo();
    });
  }

  protected async onBeforeEnter(url: string): Promise<void> {
    const onBeforeEnterThatWillRun = this.onBeforeEnterList.filter((el) => {
      switch (typeof el.url) {
        case "string":
          return el.url === url;
        case "object":
          return el.url.test(url);
        default:
          return false;
      }
    });
    onBeforeEnterThatWillRun.forEach(async (el) => {
      await el.toDo();
    });
  }
}
