import { Router } from "../Router/Router";

export class HashRouter extends Router {
  constructor(rootPath: string) {
    super(rootPath);
    location.hash = rootPath;
  }

  public async go(
    path: string,
    optionalArguments?: GoOptionalArguments
  ): Promise<void> {
    if (optionalArguments && optionalArguments.onBeforeEnter) {
      await this.onBeforeEnter(path, optionalArguments.onBeforeEnter);
    } else {
      await this.onBeforeEnter(path);
    }

    this.previousPath = this.currentPath;
    this.currentPath = path;
    location.hash = path;

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
