import { Router } from "../Router/Router";

export class HistoryRouter extends Router {
  constructor() {
    super();
    history.pushState({ type: "GO" }, document.title, location.pathname);
  }

  public async go(
    path: GoArgument,
    optionalArguments?: GoOptionalArguments
  ): Promise<void> {
    if (optionalArguments && optionalArguments.onBeforeEnter) {
      await this.onBeforeEnter(path, optionalArguments.onBeforeEnter);
    } else {
      await this.onBeforeEnter(path);
    }

    this.previousPath = this.currentPath;
    history.pushState(null, document.title, path);
    this.currentPath = path;

    if (optionalArguments && optionalArguments.onLeave) {
      await this.onLeave(this.previousPath, optionalArguments.onLeave);
    } else {
      await this.onLeave(this.previousPath);
    }
    if (optionalArguments && optionalArguments.onEnter) {
      await this.onEnter(path, optionalArguments.onEnter);
    } else {
      await this.onEnter(path);
    }

    await this.hookLIst.forEach(async (el) => {
      await el.toDo();
    });
  }
}
