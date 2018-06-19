# vue-feature-flipping

[Vue.js](https://vuejs.org) plugin providing a set of components used to introduce ["feature flipping"](https://en.wikipedia.org/wiki/Feature_toggle) into your project.

## Why use this plugin?

The **build** of the application packaged **into bundle** the *configuration file* (`config/*.env.js` constants) and *environment variables* (`process.env.*` usages).
So to modify any value, you have to re-build the application.

When you have to enable or disable a feature, the update must be *easy* and *instantaneous*.

This plugin solve this problem.

## Usage

Install NPM dependency:
```shell
npm install --save vue-feature-flipping
```

### Conditional feature

#### Service

A **function** is defined to check a feature.  
If the feature is not enabled, the function returns `false`.

```javascript
import { isEnabled } from 'vue-feature-flipping'

if (isEnabled('XXX')) {
    // ...
}
```
