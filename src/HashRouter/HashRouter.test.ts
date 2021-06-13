import { HashRouter } from "./HashRouter";
import { sleep } from "../utils/utils";

it("HashRouter correct create root path", () => {
  const router = new HashRouter("/main");
  expect(location.toString()).toBe("http://localhost/#/main");
});

it("HashRouter correct go to next addres", async () => {
  const router = new HashRouter("/main");
  await router.go("/main/article");
  expect(location.toString()).toBe("http://localhost/#/main/article");
});

it("Test HashRouter sync hook", async () => {
  const router = new HashRouter("/main");
  const spy = jest.fn();

  router.on("/main/user", { hook: spy });

  await router.go("/main");
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/user");
  expect(spy).toHaveBeenCalledTimes(2);

  await router.go("/main");
  expect(spy).toHaveBeenCalledTimes(3);
});

it("Test HashRouter sync onEnter", async () => {
  const router = new HashRouter("/main");
  const spy = jest.fn();
  router.on("/main/pages", { onEnter: spy });

  await router.go("/main/cost");
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/pages");
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main");
  expect(spy).toHaveBeenCalledTimes(1);
});

it("Test HashRouter sync onLeave", async () => {
  const router = new HashRouter("/main");
  const spy = jest.fn();
  router.on("/main/article", { onLeave: spy });

  await router.go("/main/calculator");
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/article");
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main");
  expect(spy).toHaveBeenCalledTimes(1);
});

it("Test HashRouter sync onBeforeLeave", async () => {
  const router = new HashRouter("/main");
  const spy = jest.fn();

  router.on("/main/before", { onBeforeEnter: spy });

  await router.go("/main/calculator");
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/before");
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/pages");
  expect(spy).toHaveBeenCalledTimes(1);
});

it("Test HashRouter async hook", async () => {
  const router = new HashRouter("/main");
  const spy = jest.fn();
  async function hookFun() {
    return setTimeout(spy, 10);
  }

  router.on("/main/hook", { hook: hookFun });

  await router.go("/main/users");
  expect(spy).toBeCalledTimes(0);
  await sleep(15);
  expect(spy).toBeCalledTimes(1);

  await router.go("/main/hook");
  expect(spy).toBeCalledTimes(1);
  await sleep(15);
  expect(spy).toBeCalledTimes(2);
});

it("Test HasRouter async onEnter", async () => {
  const router = new HashRouter("/main");
  const spy = jest.fn();
  async function hook() {
    return setTimeout(spy, 10);
  }
  router.on("/main/onEnter", { onEnter: hook });

  await router.go("/main/users");
  expect(spy).toBeCalledTimes(0);
  await sleep(20);
  expect(spy).toBeCalledTimes(0);

  await router.go("/main/onEnter");
  expect(spy).toBeCalledTimes(0);
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(1);
});

it("Test HashRouter async onLeave", async () => {
  const router = new HashRouter("/main");
  const spy = jest.fn();
  async function hook() {
    return setTimeout(spy, 10);
  }
  router.on("/main/onLeave", { onLeave: hook });

  await router.go("/main/users");
  expect(spy).toBeCalledTimes(0);
  await sleep(20);
  expect(spy).toBeCalledTimes(0);

  await router.go("/main/onLeave");
  expect(spy).toBeCalledTimes(0);
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/users");
  expect(spy).toBeCalledTimes(0);
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(1);
});

it("Test HashRouter async onBeforeEnter", async () => {
  const router = new HashRouter("/main");
  const spy = jest.fn();
  async function hook() {
    return setTimeout(spy, 10);
  }
  router.on("/main/onBeforeEnter", { onBeforeEnter: hook });

  await router.go("/main/users");
  expect(spy).toBeCalledTimes(0);
  await sleep(20);
  expect(spy).toBeCalledTimes(0);

  await router.go("/main/onBeforeEnter");
  expect(spy).toBeCalledTimes(0);
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(1);
});
