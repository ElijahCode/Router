import { Router } from "../Router/Router";

export class HashRouter extends Router {
  constructor(rootPath: string) {
    super(rootPath);
    location.hash = rootPath;
  }

  public async go(path: GoArgument): Promise<void> {
    let normalizePath = "";
    if (typeof path === "string") {
      normalizePath = path;
    }
    this.history.push(normalizePath);
    await this.onBeforeEnter(normalizePath);
    this.previousPath = this.currentPath;
    this.currentPath = normalizePath;
    location.hash = normalizePath;
    await this.onLeave(this.previousPath);
    await this.onEnter(normalizePath);
    await this.hookLIst.forEach(async (el) => {
      await el.toDo();
    });
  }
}
