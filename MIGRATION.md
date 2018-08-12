# Migration

## From 1.x.x to 2.0.0

### Directive `v-feature-flipping="..."`

`default` option: from *complex parameter* to *modifier*:
* from: `v-feature-flipping="{ key: 'XXXXX', default: true }"`  
* to: `v-feature-flipping.default="'XXXXX'"`

*Complex parameter*: removed  
* from: `v-feature-flipping="{ key: 'XXXXX' }"`  
* to: `v-feature-flipping="'XXXXX'"`
