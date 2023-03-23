## BigInt(@isdk/bigint)

The BigInt Package provides a unified interface for performing large integer operations, which are fundamental to implementing cryptographic algorithms. The library wraps the `bn.js` library and native `BigInt` class. If native `BigInt` is available, it'll use it first. This enables users to take advantage of the best available implementation on their platform for improved performance.

The Operator Method Prefixes

* `i`: perform operation in-place, storing the result in the host object (on which the method was invoked). Might be used to avoid number allocation costs. eg,

### Examples

```typescript
import BigInteger from '@isdk/bigint'
const a = new BigInteger(9)
const b = new BigInteger(6)
// perform addition on `a` and `b`, storing the result in `a`
a.iadd(b)
console.log(a.toString()) // prints "15"
```

### Installation

```bash
npm i @isdk/bigint
```

### API Reference

See Also: [isdk.github.io/bigint.js/](https://isdk.github.io/bigint.js/)

## Credit

- [Openpgp.js: BigInteger](https://github.com/openpgpjs/openpgpjs/tree/main/src/biginteger)
- [bn.js](https://github.com/indutny/bn.js)
