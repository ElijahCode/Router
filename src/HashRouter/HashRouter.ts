import { Router } from "../Router/Router";

export class HashRouter extends Router {
  constructor(rootPath: string) {
    super(rootPath);
    location.hash = rootPath;
  }

  go(path: GoArgument): void {
    let normalizePath = "";
    if (typeof path === "string") {
      normalizePath = path;
    }
    this.history.push(normalizePath);
    this.onBeforeEnter(normalizePath);
    this.previousPath = this.currentPath;
    this.currentPath = normalizePath;
    location.hash = normalizePath;
    this.onLeave(this.previousPath);
    this.onEnter(normalizePath);

    this.hookLIst.forEach((el) => el.toDo());
  }
}
