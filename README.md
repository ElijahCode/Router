[![Coverage Status](https://coveralls.io/repos/github/ElijahCode/Router/badge.svg?branch=development)](https://coveralls.io/github/ElijahCode/Router?branch=development)

# elijahCode/Router

## Description

In this package realised API that work with url in your browser. It' based on [Hash](https://developer.mozilla.org/en-US/docs/Web/API/Location/hash) (HashRouter) and [History](https://developer.mozilla.org/en-US/docs/Web/API/History) (HistoryRouter) API's.

Also that package support work next hook's: onEnter, onLeave, onBeforeEnter.

## Installation

You can installing package with using CLI. For it run next command in terminal:

>                   npm install @elijahCode/Router

## Usage

### Adding to module

For adding packge to module, put next code in this:

```ts
import { HashRouter, HistoryRouter } from "@elijahcode/router";
```

Note: if you want use only HashRouter or HistoryRouter, just write it in { } alone.

### Create new router

You can create a new router with using next code:

```ts
const hashRouter = new HashRouter("/main");
// or
const historyRouter = new HistoryRouter("/main");
```

Argument that we put in HashRouter and HistoryRouter is rootPath pf youre page.

### HashRouter.go and HistoryRouter.go

This methods let you go to url, that you define as first argument. In second argument you can pass a parameters for hooks, that run on this page. If you want to learn more about hooks, read section "HashRouter.on and HistoryRouter.on".

This method is asyncronic.

Arguments must satisfy next type's:

```ts
type firstArgumet = string;
interface secondArgument {
  onEnter?: any[];
  onLeave?: any[];
  onBeforeEnter?: any[];
}
```

This method call similar for routers, that you create with using HashRouter and HistoryRouter.

Example:

```ts
// without using arguments for hooks
await someRouter.go("/main/about");
// with using arguments for hooks
await someRouter.go("/main/contacts", {
  onEnter: [argument1, argument2, argument3],
});
```

### HashRouter.on and HistoryRouter.on

This method let you to set hooks, that will be run if conditions is satisfied.

Also as HashRouter.go and HistoryRouter.go, this methods call similar for all router.

Methods have next signatire:

```ts
someRouter.on(firstArgument, secondArgument);
```

Arguments have next type's:

```ts
type FirstArgument = string | RegExp | UrlFunction
interface UrlFunction = {
  (url?: string): boolean;
}

interface SecondArgument = {
  onEnter?: Hook | AsyncHook;
  onLeave?: Hook | AsyncHook;
  onBeforeEnter?: Hook | AsyncHook;
}
interface Hook {
  (...args: any[]): () => void;
}
interface AsyncHook {
  (...args: any[]): Promise<() => void> | Promise<void>;
}
```

How you can see, as addres of page you pass string, regular expression or function and as hooks yoy can pass synhronic or asynhronic function.

Now describe when every begin work:

1. onEnter - it's works then trunsition occurs on url, that pass as first argument;
2. onLeave - it's works then trunsition occurs from url, that pass as first argument;
3. onBeforeEnter - it's works before trunsition occurs to url, that pass as first argument;

Example:

```ts
someRouter.on("/main/contacts", {
  onEnter: () => console.log("It go to /main/contacts"),
  onLeave: () => console.log("It leave /main/contacts"),
  onBeforeEnter: () => console.log("It prepare go to /main/contacts"),
});

await someRouter.go("/main/contacts");
// -> It prepare go to /main/contacts
// -> It go to /main/contacts

await someRouter.go("/main/about");
// -> It leave /main/contacts
```

If you want watch more examples of using this package, you can go to github repository of this package and watch [tests](https://github.com/ElijahCode/Router/blob/development/src/HashRouter/HashRouter.ts)
