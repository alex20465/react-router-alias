# React Router Alias

Router Alias is a lightweight utility designed to manage route aliases in React applications. It provides an easy-to-use, enum-based registry for mapping route aliases to actual routes.

## Features

- Zero dependencies
- Written in TypeScript
- Enum-based registry (autocomplete)
- Taking params seriously by throwing errors.

## Installation

To install this package, run:

```bash
npm install react-router-alias
```

Or with Yarn:

```bash
yarn add react-router-alias
```

## Usage

Below is an example showcasing basic usage of the React-Route-Alias.

```javascript
import { RouteAliasManager } from 'react-router-alias';


enum RouteAliases {
    HOME = "/",
    ORDER = "/order/:orderId"
    ORDER_ITEM = "/order/:orderId/item/:itemId"
}

const aliases = new RouteAliasManager(RouteAliases);

// ... you can continue using `RouteAliases` in your actual router.

aliases.withoutParams().HOME                // OUTPUT: "/"
aliases.withParams({orderId: 1}).ORDER      // OUTPUT: "/order/1"
aliases.withParams({}).ORDER                // OUTPUT:  THROWS ERROR, MISSING PARAM

const contextual = aliases.withParams({ orderId: 1, itemId: 1 }) // a Magic Enum of RouteAliases

contextual.ORDER        // OUTPUT: "/order/1"
contextual.ORDER_ITEM   // OUTPUT: "/order/1/item/1"

```