import { HashRouter } from "../HashRouter/HashRouter";
import { HistoryRouter } from "../HistoryRouter/HistoryRouter";
import { createRouter } from "./createRouter";

describe("Testing createRouter", () => {
  it("Return hash router", () => {
    expect(createRouter("hash")).toBeInstanceOf(HashRouter);
  });
  it("Return history router", () => {
    expect(createRouter("history")).toBeInstanceOf(HistoryRouter);
  });
});
