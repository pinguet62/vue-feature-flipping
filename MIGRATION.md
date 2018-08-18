# Migration

## From 1.x.x to 2.0.0

### Features list registration

* from:
    ```javascript
    import FeatureFlipping from 'vue-feature-flipping'
    
    Vue.use(FeatureFlipping, {
        init: (consumer) => consumer(['FF1', 'FF2', 'FF3'])
    })
    ```
* to:
    ```javascript
    import FeatureFlipping, { setEnabledFeatures } from 'vue-feature-flipping'
    
    Vue.use(FeatureFlipping)
    setEnabledFeatures(['FF1', 'FF2', 'FF3'])
    ```

### Directive `v-feature-flipping="..."`

`default` option: from *complex parameter* to *modifier*:
* from: `v-feature-flipping="{ key: 'XXXXX', default: true }"`  
* to: `v-feature-flipping.default="'XXXXX'"`

*Complex parameter*: removed  
* from: `v-feature-flipping="{ key: 'XXXXX' }"`  
* to: `v-feature-flipping="'XXXXX'"`
