import { HashRouter } from "./HashRouter";
import { sleep } from "../utils/utils";
import "../types/types";

it("HashRouter correct create root path", () => {
  const router = new HashRouter();
  expect(location.toString()).toBe("http://localhost/#/");
});

it("HashRouter correct go to next addres", async () => {
  const router = new HashRouter();
  await router.go("/main/article");
  expect(location.toString()).toBe("http://localhost/#/main/article");
});

it("Test HashRouter on: sync hook", async () => {
  const router = new HashRouter();
  const spy = jest.fn();
  function testHook() {
    spy();
  }

  router.on("/main/user", { hook: testHook as Hook });

  await router.go("/main");
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/user");
  expect(spy).toHaveBeenCalledTimes(2);

  await router.go("/main");
  expect(spy).toHaveBeenCalledTimes(3);
});

it("Test HashRouter on: sync onEnter", async () => {
  const router = new HashRouter();
  const spy = jest.fn();
  function testHook() {
    spy();
  }

  router.on("/main/pages", { onEnter: testHook as Hook });

  await router.go("/main/cost");
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/pages");
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main");
  expect(spy).toHaveBeenCalledTimes(1);
});

it("Test HashRouter on: sync onLeave", async () => {
  const router = new HashRouter();
  const spy = jest.fn();
  function testHook() {
    spy();
  }

  router.on("/main/article", { onLeave: testHook as Hook });

  await router.go("/main/calculator");
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/article");
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main");
  expect(spy).toHaveBeenCalledTimes(1);
});

it("Test HashRouter on: sync onBeforeLeave", async () => {
  const router = new HashRouter();
  const spy = jest.fn();
  function testHook() {
    spy();
  }

  router.on("/main/before", { onBeforeEnter: testHook as Hook });

  await router.go("/main/calculator");
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/before");
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/pages");
  expect(spy).toHaveBeenCalledTimes(1);
});

it("Test HashRouter on: sync regexp OnEnter", async () => {
  const router = new HashRouter();
  const spy = jest.fn();
  function testHook() {
    spy();
  }

  router.on(/\/main\/index\/[a-zA-Z0-9]{1,}/, { onEnter: testHook as Hook });

  await router.go("/main/school/cancellery");
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/index/director");
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/boss/contacts");
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/index/HR");
  expect(spy).toHaveBeenCalledTimes(2);
});

it("Test HashRouter on: sync regexp OnLeave", async () => {
  const router = new HashRouter();
  const spy = jest.fn();
  function testHook() {
    spy();
  }

  router.on(/\/main\/index\/[a-zA-Z0-9]{1,}/, { onLeave: testHook as Hook });

  await router.go("/main/school/cancellery");
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/index/director");
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/boss/contacts");
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/index/HR");
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/teachsoft/developers");
  expect(spy).toHaveBeenCalledTimes(2);
});

it("Test HashRouter on: sync regexp OnBeforeEnter", async () => {
  const router = new HashRouter();
  const spy = jest.fn();
  function testHook() {
    spy();
  }

  router.on(/\/main\/index\/[a-zA-Z0-9]{1,}/, {
    onBeforeEnter: testHook as Hook,
  });

  await router.go("/main/school/cancellery");
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/index/director");
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/boss/contacts");
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/index/HR");
  expect(spy).toHaveBeenCalledTimes(2);
});

it("Test HashRouter on: sync function onEnter", async () => {
  const router = new HashRouter();
  const spy = jest.fn();
  function testHook() {
    spy();
  }
  function definer(url: string) {
    if (url === "/main/pages" || url === "/main") {
      return true;
    }
    return false;
  }
  router.on(definer, { onEnter: testHook as Hook });

  await router.go("/main/cost");
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/pages");
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/cost");
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main");
  expect(spy).toHaveBeenCalledTimes(2);

  await router.go("/main/cost");
  expect(spy).toHaveBeenCalledTimes(2);
});

it("Test HashRouter on: sync function onLeave", async () => {
  const router = new HashRouter();
  const spy = jest.fn();
  function testHook() {
    spy();
  }
  function definer(url: string) {
    if (url === "/main/pages" || url === "/main/cost") {
      return true;
    }
    return false;
  }
  router.on(definer, { onLeave: testHook as Hook });

  await router.go("/main/cost");
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/pages");
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/cost");
  expect(spy).toHaveBeenCalledTimes(2);

  await router.go("/main");
  expect(spy).toHaveBeenCalledTimes(3);

  await router.go("/main/cost");
  expect(spy).toHaveBeenCalledTimes(3);
});

it("Test HashRouter on: sync function onEnter", async () => {
  const router = new HashRouter();
  const spy = jest.fn();
  function testHook() {
    spy();
  }
  function definer(url: string) {
    if (url === "/main/pages" || url === "/main") {
      return true;
    }
    return false;
  }
  router.on(definer, { onEnter: testHook as Hook });

  await router.go("/main/cost");
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/pages");
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/cost");
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main");
  expect(spy).toHaveBeenCalledTimes(2);

  await router.go("/main/cost");
  expect(spy).toHaveBeenCalledTimes(2);
});

it("Test HashRouter on: async hook", async () => {
  const router = new HashRouter();
  const spy = jest.fn();
  async function hookFun() {
    setTimeout(spy, 10);
  }

  router.on("/main/hook", { hook: hookFun as AsyncHook });

  await router.go("/main/users");
  expect(spy).toBeCalledTimes(0);
  await sleep(15);
  expect(spy).toBeCalledTimes(1);

  await router.go("/main/hook");
  expect(spy).toBeCalledTimes(1);
  await sleep(15);
  expect(spy).toBeCalledTimes(2);
});

it("Test HashRouter on: async onEnter", async () => {
  const router = new HashRouter();
  const spy = jest.fn();
  async function hook() {
    setTimeout(spy, 10);
  }
  router.on("/main/onEnter", { onEnter: hook as AsyncHook });

  await router.go("/main/users");
  expect(spy).toBeCalledTimes(0);
  await sleep(20);
  expect(spy).toBeCalledTimes(0);

  await router.go("/main/onEnter");
  expect(spy).toBeCalledTimes(0);
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(1);
});

it("Test HashRouter on: async onLeave", async () => {
  const router = new HashRouter();
  const spy = jest.fn();
  async function hook() {
    setTimeout(spy, 10);
  }
  router.on("/main/onLeave", { onLeave: hook as AsyncHook });

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

it("Test HashRouter on: async onBeforeEnter", async () => {
  const router = new HashRouter();
  const spy = jest.fn();
  async function hook() {
    setTimeout(spy, 10);
  }
  router.on("/main/onBeforeEnter", { onBeforeEnter: hook as AsyncHook });

  await router.go("/main/users");
  expect(spy).toBeCalledTimes(0);
  await sleep(20);
  expect(spy).toBeCalledTimes(0);

  await router.go("/main/onBeforeEnter");
  expect(spy).toBeCalledTimes(0);
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(1);
});

it("Test HashRouter on: async regexp OnEnter", async () => {
  const router = new HashRouter();
  const spy = jest.fn();

  async function hook() {
    setTimeout(spy, 10);
  }
  router.on(/\/main\/index\/[a-zA-Z0-9]{1,}/, { onEnter: hook as AsyncHook });

  await router.go("/main/school/cancellery");
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/index/director");
  expect(spy).toHaveBeenCalledTimes(0);
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/boss/contacts");
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/index/HR");
  expect(spy).toHaveBeenCalledTimes(1);
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(2);
});

it("Test HashRouter on: async regexp OnLeave", async () => {
  const router = new HashRouter();
  const spy = jest.fn();

  async function hook() {
    setTimeout(spy, 10);
  }
  router.on(/\/main\/index\/[a-zA-Z0-9]{1,}/, { onLeave: hook as AsyncHook });

  await router.go("/main/school/cancellery");
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/index/director");
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/boss/contacts");
  expect(spy).toHaveBeenCalledTimes(0);
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/index/HR");
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/teachsoft/developers");
  expect(spy).toHaveBeenCalledTimes(1);
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(2);
});

it("Test HashRouter on: async regexp OnBeforeEnter", async () => {
  const router = new HashRouter();
  const spy = jest.fn();

  async function hook() {
    setTimeout(spy, 10);
  }
  router.on(/\/main\/index\/[a-zA-Z0-9]{1,}/, {
    onBeforeEnter: hook as AsyncHook,
  });

  await router.go("/main/school/cancellery");
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/index/director");
  expect(spy).toHaveBeenCalledTimes(0);
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/boss/contacts");
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/index/HR");
  expect(spy).toHaveBeenCalledTimes(1);
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(2);
});

it("Test HashRouter on: async function onEnter", async () => {
  const router = new HashRouter();
  const spy = jest.fn();
  async function hook() {
    setTimeout(spy, 10);
  }
  function definer(url: string) {
    if (url === "/main/pages" || url === "/main") {
      return true;
    }
    return false;
  }
  router.on(definer, { onEnter: hook as AsyncHook });

  await router.go("/main/cost");
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/pages");
  expect(spy).toHaveBeenCalledTimes(0);
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/cost");
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main");
  expect(spy).toHaveBeenCalledTimes(1);
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(2);

  await router.go("/main/cost");
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(2);
});

it("Test HashRouter on: async function onLeave", async () => {
  const router = new HashRouter();
  const spy = jest.fn();
  function definer(url: string) {
    if (url === "/main/pages" || url === "/main/users") {
      return true;
    }
    return false;
  }
  async function hook() {
    setTimeout(spy, 10);
  }
  router.on(definer, { onLeave: hook as AsyncHook });

  await router.go("/main/cost");
  await sleep(20);
  expect(spy).toBeCalledTimes(0);

  await router.go("/main");
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/users");
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/pages");
  expect(spy).toHaveBeenCalledTimes(0);
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/cost");
  expect(spy).toHaveBeenCalledTimes(1);
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(2);
});

it("Test HashRouter on: async function onBeforeEnter", async () => {
  const router = new HashRouter();
  const spy = jest.fn();
  async function hook() {
    setTimeout(spy, 10);
  }
  function definer(url: string) {
    if (url === "/main/pages" || url === "/main") {
      return true;
    }
    return false;
  }
  router.on(definer, { onBeforeEnter: hook as AsyncHook });

  await router.go("/main/cost");
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(0);

  await router.go("/main/pages");
  expect(spy).toHaveBeenCalledTimes(0);
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main/cost");
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(1);

  await router.go("/main");
  expect(spy).toHaveBeenCalledTimes(1);
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(2);

  await router.go("/main/cost");
  await sleep(20);
  expect(spy).toHaveBeenCalledTimes(2);
});

it("Test HashRouter go with args: onEnter", async () => {
  const router = new HashRouter();
  const spy = jest.fn();
  function testHook(...args) {
    spy(...args);
  }
  router.on("/main/pages", { onEnter: testHook as Hook });

  const argumets = {
    onEnter: [1],
  };

  await router.go("/main/pages", argumets);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(1);

  argumets.onEnter = [1, 2];
  await router.go("/main/pages", argumets);
  expect(spy).toHaveBeenCalledTimes(2);
  expect(spy).toHaveBeenCalledWith(1, 2);

  argumets.onEnter = [1, 2, 3];
  await router.go("/main/pages", argumets);
  expect(spy).toHaveBeenCalledTimes(3);
  expect(spy).toHaveBeenCalledWith(1, 2, 3);
});

it("Test HashRouter go with args: onLeave", async () => {
  const router = new HashRouter();
  const spy = jest.fn();
  function testHook(...args) {
    spy(...args);
  }
  router.on("/main/pages", { onLeave: testHook as Hook });

  const argumets = {
    onLeave: [1],
  };

  await router.go("/main/pages");
  await router.go("/main/pages", argumets);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(1);

  argumets.onLeave = [1, 2];
  await router.go("/main/pages", argumets);
  expect(spy).toHaveBeenCalledTimes(2);
  expect(spy).toHaveBeenCalledWith(1, 2);

  argumets.onLeave = [1, 2, 3];
  await router.go("/main/pages", argumets);
  expect(spy).toHaveBeenCalledTimes(3);
  expect(spy).toHaveBeenCalledWith(1, 2, 3);
});

it("Test HashRouter go with args: onBeforeEnter", async () => {
  const router = new HashRouter();
  const spy = jest.fn();
  function testHook(...args) {
    spy(...args);
  }
  router.on("/main/pages", { onBeforeEnter: testHook as Hook });

  const argumets = {
    onBeforeEnter: [1],
  };

  await router.go("/main/pages", argumets);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(1);

  argumets.onBeforeEnter = [1, 2];
  await router.go("/main/pages", argumets);
  expect(spy).toHaveBeenCalledTimes(2);
  expect(spy).toHaveBeenCalledWith(1, 2);

  argumets.onBeforeEnter = [1, 2, 3];
  await router.go("/main/pages", argumets);
  expect(spy).toHaveBeenCalledTimes(3);
  expect(spy).toHaveBeenCalledWith(1, 2, 3);
});
