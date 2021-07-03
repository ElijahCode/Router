import { HashRouter } from "../HashRouter/HashRouter";
import { HistoryRouter } from "../HistoryRouter/HistoryRouter";

export function createRouter(
  routerType: "hash" | "history"
): HashRouter | HistoryRouter | null {
  switch (routerType) {
    case "hash":
      return new HashRouter();
    case "history":
      return new HistoryRouter();
    default:
      return null;
  }
}
