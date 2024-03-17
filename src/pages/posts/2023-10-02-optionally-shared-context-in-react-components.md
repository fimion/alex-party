---
layout: ../../layouts/BlogPost.astro
title: Optionally Shared Context in React Components
pubDate: 2023-10-02T12:00:11.302-04:00
draft: false
rssOnly: false
---
Right, here's a weird one. I know what many of you are thinking:

> Alex, why the heck are you writing about React?

The answer is, I just solved an issue for someone and they said to write a blog post. So fine, I'm writing a blog post.

### Shared React Context

So my friend had a problem:

> I've not dealt with this before: I'm helping someone who has a React component that is reused across a codebase. It pulls variables from a Context to be used in a few functions. BUT, if it's in a different part of the app, those variables should come from a different Context. The component has a prop that tells you which context it should pull from, but you can't put the useContext hooks in an if statement

~~When I see an issue like this my gut instinct is to point out that in vue you can have optionally reactive data and/or throw this type of thing into a computed value and move on with your day.~~ _(Edit: I have been informed that the react linter will pitch a fit about this, but_`_useContext_` _can actually be accessed conditionally)_ But I bit my tongue, and made a minimal reproduction with a solution.

### Shared Context - Normal Brain Version

```js
import { createContext, useContext } from 'react';
import * as ReactDOM from 'react-dom'

const App1Context = createContext(null);

const App2Context = createContext(null);

const MyComponent = () => {
  const app1 = useContext(App1Context);
  const app2 = useContext(App2Context);

  return <h1>{app1?app1:app2}</h1>;
};

const Apps = [];

Apps.push(() => {
  return (
    <App1Context.Provider value="Hello App 1!">
      <MyComponent />
    </App1Context.Provider>
  );
});

Apps.push(() => {
  return (
    <App2Context.Provider value="Hello App 2!">
      <MyComponent />
    </App2Context.Provider>
  );
});

Apps.forEach((Component) => {
  const mount = document.createElement("div");
  document.body.append(mount);
  ReactDOM.createRoot(mount).render(<Component />);
});
```

[Here's a working demo](https://codepen.io/fimion/pen/GRPXWrd)

The way this works is by requesting both context values. If the 1st one exists, we use that. if the second one exists, then we use that instead.

Bada-bing, Bada-boom, **solved**.

### Mostly solved

So, someone commented that really only works if you always want it to default to using the first context, but what if you wanted to use the 2nd context first?

Well, you'd need to be able to allow to specify the context order that we pick from, so let's make a slightly more complex version.

### Shared Context - Big Brain Version

```js
import { createContext, useContext } from 'react';
import * as ReactDOM from 'react-dom'

const App1Context = createContext(null);
const App2Context = createContext(null);

const MyComponent = ({ context }) => {
  const chooseContext = {
    app1: useContext(App1Context),
    app2: useContext(App2Context)
  };

  if (!context) {
    context = ["app1", "app2"];
  }

  if (Array.isArray(context)) {
    for (const app of context) {
      if (chooseContext[app]) {
        return <h1>{chooseContext[app]}</h1>;
      }
    }
  }

  if (typeof context === "string") {
    if (chooseContext[context]) {
      return <h1>{chooseContext[context]}</h1>;
    }
  }

  return <h1>YOU PROVIDED NOTHING!!</h1>;
};

const Apps = [];

Apps.push(() => {
  return (
    <App1Context.Provider value="Hello App 1!">
      <MyComponent />
    </App1Context.Provider>
  );
});

Apps.push(() => {
  return (
    <App2Context.Provider value="Hello App 2!">
      <MyComponent />
    </App2Context.Provider>
  );
});

Apps.push(() => {
  return <MyComponent />;
});

Apps.push(() => {
  return (
    <App1Context.Provider value="Hello App 4!">
      <App2Context.Provider value="This will not display.">
        <MyComponent />
      </App2Context.Provider>
    </App1Context.Provider>
  );
});

Apps.push(() => {
  return (
    <App1Context.Provider value="This will not display.">
      <App2Context.Provider value="Hello App 5!">
        <MyComponent context="app2" />
      </App2Context.Provider>
    </App1Context.Provider>
  );
});

Apps.forEach((Component) => {
  const mount = document.createElement("div");
  document.body.append(mount);
  ReactDOM.createRoot(mount).render(<Component />);
});
```

[Working demo here](https://codepen.io/fimion/pen/ZEVMOER)

This version allows you to pass a `context` prop that can be an array of strings or just a string, and specify which context order you want, or which context specifically you want.

People said this looked good.

Bada-bing, Bada-boom, **done**.

I was hungry so I started to go make lunch. My brain however started to do loop-de-loops in my head, because my brain **LOVES** patterns. Like way too much. But it saw one. it saw something that could be refactored into an easier use case.

Fine, brain. Let's go.

Let's start with the generic thing we can use to make this better.

### SharedContext - Galaxy Brain Mode

```js
// shared-context.js
import { useContext } from 'react';

export class SharedContext {
  /**
   * shhhh, our secret registry
   */
  static #registry = new Map();

  /**
   * register a shared context
   * @param {string} sharedName - the shared name for the context group.
   * @param {ReactContext} Context - the context object from `createContext`;
   * @return {Symbol} - The identifier used to specify the exact context you would like.
   */
  static register(sharedName, Context) {
    if (!SharedContext.#registry.has(sharedName)) {
      SharedContext.#registry.set(sharedName, new Map());
    }

    const ctx = SharedContext.get(sharedName);
    const identifier = Symbol(sharedName + ctx.size);
    ctx.set(identifier, Context);
    return identifier;
  }

  /**
   * Get a shared context map
   * @param {string} sharedName - the shared name for the context group.
   * @returns {Map<Symbol, ReactContext>} returns a map of Idenitier/Context pairs.
   */
  static get(sharedName) {
    return SharedContext.#registry.get(sharedName);
  }

  /**
   * Get the correct context value based on your current component.
   * @param {string} sharedName - the shared name for the context group.
   * @param {*} [fallback] - The fallback value when no context is provided.
   * @param {Symbol|Symbol[]} [context] - The order of lookup for context based on ID symbols.
   * @returns {*} returns either the fallback or the found context.
   */
  static use(sharedName, fallback, context) {
    const ctxMap = SharedContext.get(sharedName);
    if (!ctxMap) {
      throw Error(`no such SharedContext: ${sharedName}`);
    }

    const ctx = new Map();

    ctxMap.forEach((Context, identifier) => {
      ctx.set(identifier, useContext(Context));
    });

    if (!context) {
      context = [...ctx.keys()];
    }

    if (Array.isArray(context)) {
      for (const id of context) {
        if (ctx.get(id)) {
          return ctx.get(id);
        }
      }
    }

    if (typeof context === "symbol") {
      if (ctx.has(context)) {
        return ctx.get(context);
      }
    }
    return fallback;
  }
}
```

This code gives us a generic way of creating “Shared Context” states that have a default order. You use `SharedContext.register` to register a context to a shared namespace, and it will return a unique Identifier Symbol that you can use to specify the context again when you want to use it. Otherwise it'll use the ones that are registered in the order they are registered. To use the Shared context you call the `SharedContext.use` hook, where you give it the shared namespace, and a fallback value as a default. you can also specify the specific context, or order of the context you would like to use.

The code to use this looks something like this:

```js
import { createContext} from 'react';
import * as ReactDOM from 'react-dom';
import {SharedContext} from './shared-context.js';

const App1Context = createContext(null);
const App2Context = createContext(null);

// The order is based on the order of registry...
const App1ContextId = SharedContext.register("App", App1Context);
const App2ContextId = SharedContext.register("App", App2Context);

// So in theory, with a code split code base, only the ones registered would be used...
const App2ContextIdAlt = SharedContext.register("Alt", App2Context);
const App1ContextIdAlt = SharedContext.register("Alt", App1Context);

const MyComponent = ({ context }) => {
  const ctx = SharedContext.use("App", "YOU PROVIDED NOTHING!!", context);

  return <h1>{ctx}</h1>;
};

const AltComponent = ({ context }) => {
  const ctx = SharedContext.use("Alt", "YOU PROVIDED NOTHING!!", context);

  return <h1>{ctx}</h1>;
};

const Apps = [];

Apps.push(() => {
  return (
    <App1Context.Provider value="Hello App 1!">
      <MyComponent />
    </App1Context.Provider>
  );
});

Apps.push(() => {
  return (
    <App2Context.Provider value="Hello App 2!">
      <MyComponent />
    </App2Context.Provider>
  );
});

Apps.push(() => {
  return <MyComponent />;
});

Apps.push(() => {
  return (
    <App1Context.Provider value="Hello App 4!">
      <App2Context.Provider value="This will not display.">
        <MyComponent />
      </App2Context.Provider>
    </App1Context.Provider>
  );
});

Apps.push(() => {
  return (
    <App1Context.Provider value="This will not display.">
      <App2Context.Provider value="Hello App 5!">
        <MyComponent context={App2ContextId} />
      </App2Context.Provider>
    </App1Context.Provider>
  );
});

Apps.push(() => {
  return <hr />;
});

Apps.push(() => {
  return (
    <App1Context.Provider value="Hello Alt 1!">
      <AltComponent />
    </App1Context.Provider>
  );
});

Apps.push(() => {
  return (
    <App2Context.Provider value="Hello Alt 2!">
      <AltComponent />
    </App2Context.Provider>
  );
});

Apps.push(() => {
  return <MyComponent />;
});

Apps.push(() => {
  return (
    <App1Context.Provider value="This will not display.">
      <App2Context.Provider value="Hello Alt 4!">
        <AltComponent />
      </App2Context.Provider>
    </App1Context.Provider>
  );
});

Apps.push(() => {
  return (
    <App1Context.Provider value="Hello Alt 5!">
      <App2Context.Provider value="This will not display.">
        <AltComponent context={App1ContextIdAlt} />
      </App2Context.Provider>
    </App1Context.Provider>
  );
});

Apps.forEach((Component) => {
  const mount = document.createElement("div");
  document.body.append(mount);
  ReactDOM.createRoot(mount).render(<Component />);
});
```

[Working demo here](https://codepen.io/fimion/pen/PoXdGGa)

This is probably the most flexible version. In theory we could also allow the fallback to be a function so if you wanted a fresh version of something you could do that, but ultimately, I don't want to be responsible for that, and lunch is ready.

After writing a React helper, I feel a strong need to go take a shower. Y'all take care!
