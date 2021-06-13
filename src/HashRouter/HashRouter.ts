import { Router } from "../Router/Router";

export class HashRouter extends Router {
  constructor(rootPath: string) {
    super(rootPath);
    location.hash = rootPath;
  }

  public async go(
    path: GoArgument,
    optionalArguments?: GoOptionalArguments
  ): Promise<void> {
    let normalizePath = "";
    if (typeof path === "string") {
      normalizePath = path;
    }
    this.history.push(normalizePath);

    if (optionalArguments && optionalArguments.onBeforeEnter) {
      await this.onBeforeEnter(normalizePath, optionalArguments.onBeforeEnter);
    } else {
      await this.onBeforeEnter(normalizePath);
    }

    this.previousPath = this.currentPath;
    this.currentPath = normalizePath;
    location.hash = normalizePath;

    if (optionalArguments && optionalArguments.onLeave) {
      await this.onLeave(this.previousPath, optionalArguments.onLeave);
    } else {
      await this.onLeave(this.previousPath);
    }
    if (optionalArguments && optionalArguments.onEnter) {
      await this.onEnter(normalizePath, optionalArguments.onEnter);
    } else {
      await this.onEnter(normalizePath);
    }

    await this.hookLIst.forEach(async (el) => {
      await el.toDo();
    });
  }
}
