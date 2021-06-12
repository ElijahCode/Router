import { HashRouter } from "./HashRouter";

it("HashRouter correct create root path", () => {
  const router = new HashRouter("/main");
  expect(location.toString()).toBe("http://localhost/#/main");
});

it("HashRouter correct go to next addres", () => {
  const router = new HashRouter("/main");
  router.go("/main/article");
  expect(location.toString()).toBe("http://localhost/#/main/article");
});

it("Test HashRouter sync hook", () => {
  const router = new HashRouter("/main");
  const spy = jest.fn();

  router.on("/main/user", spy);

  router.go("/main");
  expect(spy).toHaveBeenCalledTimes(1);

  router.go("/main/user");
  expect(spy).toHaveBeenCalledTimes(2);

  router.go("/main");
  expect(spy).toHaveBeenCalledTimes(3);
});

it("Test HashRouter sync onEnter", () => {
  const router = new HashRouter("/main");
  const spy = jest.fn();
  router.on("/main/pages", undefined, spy);

  router.go("/main/cost");
  expect(spy).toHaveBeenCalledTimes(0);

  router.go("/main/pages");
  expect(spy).toHaveBeenCalledTimes(1);

  router.go("/main");
  expect(spy).toHaveBeenCalledTimes(1);
});

it("Test HashRouter sync onLeave", () => {
  const router = new HashRouter("/main");
  const spy = jest.fn();
  router.on("/main/article", undefined, undefined, spy);

  router.go("/main/calculator");
  expect(spy).toHaveBeenCalledTimes(0);

  router.go("/main/article");
  expect(spy).toHaveBeenCalledTimes(0);

  router.go("/main");
  expect(spy).toHaveBeenCalledTimes(1);
});

it("Test HashRouter sync onBeforeLeave", () => {
  const router = new HashRouter("/main");
  const spy = jest.fn();

  router.on("/main/before", undefined, undefined, undefined, spy);

  router.go("/main/calculator");
  expect(spy).toHaveBeenCalledTimes(0);

  router.go("/main/before");
  expect(spy).toHaveBeenCalledTimes(1);

  router.go("/main/pages");
  expect(spy).toHaveBeenCalledTimes(1);
});
