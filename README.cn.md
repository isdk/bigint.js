## @isdk/bigint

BigInt 包提供了一个统一的接口来执行大整数运算，这是实现密码算法的基础。 该库包装了`bn.js` 库和原生的`BigInt` 类。 如果本机 BigInt 可用，它将首先使用它。 这使用户能够利用其平台上可用的最佳实施来提高性能。

下面是这个类定义中的一些方法及其解释：

- `constructor(n)`：构造函数，用于创建一个新的 BigInteger 对象，输入参数 n 可以是一个数字、一个字符串（表示数字的字符串）或一个 Uint8Array（一个字节数组）。
- `clone()`：克隆函数，用于创建一个与当前 BigInteger 对象相同的新对象。
- `iinc()`：就地增加函数，将当前对象加 1。
- `inc()`：增加函数，返回一个新的 BigInteger 对象，其值为当前对象加 1。
- `idec()`：就地减少函数，将当前对象减 1。
- `dec()`：减少函数，返回一个新的 BigInteger 对象，其值为当前对象减 1。
- `iadd(x)`：就地加函数，将参数 x 的值加到当前对象上。
- `add(x)`：加函数，返回一个新的 BigInteger 对象，其值为当前对象加上参数 x。
- `isub(x)`：就地减函数，将参数 x 的值从当前对象中减去。
- `sub(x)`：减函数，返回一个新的 BigInteger 对象，其值为当前对象减去参数 x。
- `imul(x)`：就地乘函数，将参数 x 的值乘以当前对象的值。
- `mul(x)`：乘函数，返回一个新的 BigInteger 对象，其值为当前对象乘以参数 x。
- `iumod(m)`：就地取模函数(无符号)，将当前对象的值除以参数 m，将余数赋给当前对象。
- `imod(m)`：就地取模函数，将当前对象的值除以参数 m，将余数赋给当前对象。在`Openpgp.js`中的`imod`方法实际上是`iumod`,如果要在 Openpgp.js 中使用必须注意这点!
- `mod(m)`：取模函数，返回一个新的 BigInteger 对象，其值为当前对象除以参数 m 的余数。在`Openpgp.js`中的`mod`方法实际上是`umod`,如果要在 Openpgp.js 中使用必须注意这点!
- `modExp(e, n)`：模幂函数，返回一个新的 BigInteger 对象，其值为当前对象的参数 e 次方模参数 n 的结果。
- `modInv(n)`：模逆函数，返回一个新的 BigInteger 对象，其值为当前对象在模参数 n 意义下的乘法逆元（即一个数 x，使得当前对象乘以 x 的结果除以 n 的余数为 1）。
- `_egcd(b)`：扩展欧几里得算法，返回一个对象，其属性包括当前对象和参数 b 的最大公约数，以及计算最大公约数时所用的 x 和 y 的值。
- `gcd(b)`：最大公约数函数，返回一个新的 BigInteger 对象，其值为当前对象和参数 b 的最大公约数。
- `ileftShift(x)`：就地左移函数，将当前对象的二进制位向左移动 x 位。
- `leftShift(x)`：左移函数，返回一个新的 BigInteger 对象，其值为当前对象的二进制位向左移动 x 位。
- `irightShift(x)`：就地右移函数，将当前对象的二进制位向右移动 x 位。
- `rightShift(x)`：右移函数，返回一个新的 BigInteger 对象，其值为当前对象的二进制位向右移动 x 位。
- `equal(x)`：相等函数，返回一个布尔值，指示当前对象的值是否等于参数 x 的值。
- `lt(x)`：小于函数，返回一个布尔
- `lte(x)`：小于等于函数，返回一个布尔值表示输入是否小于等于给定参数 `x`。如果小于或等于，返回 `True`，否则返回 `False`。
- `equal(x)`：等于函数，返回一个布尔值表示输入是否等于给定参数 `x`。如果相等，返回 `True`，否则返回 `False`。
- `ne(x)`：不等于函数，返回一个布尔值表示输入是否不等于给定参数 `x`。如果不相等，返回 `True`，否则返回 `False`。
- `gte(x)`：大于等于函数，返回一个布尔值表示输入是否大于等于给定参数 `x`。如果大于或等于，返回 `True`，否则返回 `False`。
- `gt(x)`：大于函数，返回一个布尔值表示输入是否大于给定参数 `x`。如果大于，返回 `True`，否则返回 `False`。

`bn.js` 是一个 JavaScript 的大数库，提供了在 JavaScript 中处理大数的功能。其中，`Reduction` 是一个概念，而 `redAdd`、`redIAdd` 等则是对 `Reduction` 进行操作的函数。

在数论中，一个模数（`modulus`）是一个正整数，被用来定义同余关系（`congruence relation`）。如果两个整数在模数下除以模数得到的余数相同，那么它们被认为是同余的。例如，在模数 7 下，3 和 10 是同余的，因为它们除以 7 的余数都是 3。

`Reduction` 就是将一个大数（BigInt）对一个模数进行取模操作。在 `bn.js` 中，可以使用一个叫做 `Reducer` `的对象来表示一个模数和取模算法。Reducer` 可以通过调用 `bn.js` 的 `bn.red` 函数来创建。

具体来说，`Reduction` 操作在 `bn.js` 中有以下几种：

- `redAdd(a, b)`：将 a 和 b 相加并对模数取模，返回一个新的大数。
- `redIAdd(a, b)`：将 a 和 b 相加并对模数取模，将结果写回到 a 中。
- `redSub(a, b)`：将 a 和 b 相减并对模数取模，返回一个新的大数。
- `redISub(a, b)`：将 a 和 b 相减并对模数取模，将结果写回到 a 中。
- `redMul(a, b)`：将 a 和 b 相乘并对模数取模，返回一个新的大数。
- `redIMul(a, b)`：将 a 和 b 相乘并对模数取模，将结果写回到 a 中。
- `redSqr(a)`：将 a 自乘并对模数取模，返回一个新的大数。
- `redISqr(a)`：将 a 自乘并对模数取模，将结果写回到 a 中。

这些操作都是在模数下进行的，因此结果仍然是一个在模数下的同余类。使用 `Reducer` 可以让这些操作更高效，因为它们不需要每次都对模数进行取模，而是可以使用 `Reducer` 中提供的算法来实现。

## Credit

- [Openpgp.js: BigInteger](https://github.com/openpgpjs/openpgpjs/tree/main/src/biginteger)
- [bn.js](https://github.com/indutny/bn.js)
