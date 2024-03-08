import type { IBigInt } from './IBigint'

/**
 * The Big Integer implementation of basic operations
 * that wraps the native BigInt library.
 * Operations are not constant time,
 * but we try and limit timing leakage where we can
 */
export class BigIntNative implements IBigInt {
  value: bigint
  /**
   * Get a BigInteger (input must be big endian for strings and arrays)
   * @param {Number|String|Uint8Array} n - Value to convert
   * @throws {Error} on null or undefined input
   */
  constructor(n: number | string | Uint8Array | bigint | boolean) {
    if (n === undefined) {
      throw new Error('Invalid BigInteger input')
    }

    if (n instanceof Uint8Array) {
      const bytes = n
      const hex = Array(bytes.length)
      for (let i = 0; i < bytes.length; i++) {
        const hexByte = bytes[i].toString(16)
        hex[i] = bytes[i] <= 0xf ? `0${hexByte}` : hexByte
      }
      this.value = BigInt(`0x0${hex.join('')}`)
    } else {
      this.value = BigInt(n)
    }
  }

  clone() {
    return new BigIntNative(this.value)
  }

  iinc(n = 1) {
    if (n === 1) {
      this.value++
    } else {
      this.value += BigInt(n)
    }

    return this
  }

  inc(n?: number) {
    return this.clone().iinc(n)
  }

  idec(n = 1) {
    if (n === 1) {
      this.value--
    } else {
      this.value -= BigInt(n)
    }

    return this
  }

  dec(n?: number) {
    return this.clone().idec(n)
  }

  /**
   * BigInteger addition in place
   * @param {BigIntNative} x - Value to add
   */
  iadd(x: BigIntNative) {
    this.value += x.value
    return this
  }

  /**
   * BigInteger addition
   * @param {BigIntNative} x - Value to add
   * @returns {BigIntNative} this + x.
   */
  add(x: BigIntNative) {
    return this.clone().iadd(x)
  }

  /**
   * BigInteger subtraction in place
   * @param {BigIntNative} x - Value to subtract
   */
  isub(x: BigIntNative) {
    this.value -= x.value
    return this
  }

  /**
   * BigInteger subtraction
   * @param {BigIntNative} x - Value to subtract
   * @returns {BigIntNative} this - x.
   */
  sub(x: BigIntNative) {
    return this.clone().isub(x)
  }

  /**
   * BigInteger multiplication in place
   * @param {BigIntNative} x - Value to multiply
   */
  imul(x: BigIntNative) {
    this.value *= x.value
    return this
  }

  /**
   * BigInteger multiplication
   * @param {BigIntNative} x - Value to multiply
   * @returns {BigIntNative} this * x.
   */
  mul(x: BigIntNative) {
    return this.clone().imul(x)
  }

  imod(m: BigIntNative) {
    this.value %= m.value
    return this
  }

  /**
   * Compute value modulo m, in place
   * @param {BigIntNative} m - Modulo
   */
  iumod(m: BigIntNative) {
    this.value %= m.value
    if (this.isNegative()) {
      this.iadd(m)
    }

    return this
  }

  /**
   * Compute value modulo m
   * @param {BigIntNative} m - Modulo
   * @returns {BigIntNative} this mod m.
   */
  umod(m: BigIntNative) {
    return this.clone().iumod(m)
  }

  /**
   * Compute value modulo m
   * @param {BigIntNative} m - Modulo
   * @returns {BigIntNative} this mod m.
   */
  mod(m: BigIntNative) {
    return this.clone().imod(m)
  }

  modExp(e: BigIntNative, n: BigIntNative) {
    if (n.isZero()) {
      throw new Error('Modulo cannot be zero')
    }
    if (n.isOne()) {
      return new BigIntNative(0)
    }
    if (e.isNegative()) {
      throw new Error('Unsupported negative exponent')
    }

    let exp = e.value
    let x = this.value

    x %= n.value
    let r = BigInt(1)
    while (exp > BigInt(0)) {
      const lsb = exp & BigInt(1)
      exp >>= BigInt(1) // e / 2
      // Always compute multiplication step, to reduce timing leakage
      const rx = (r * x) % n.value
      // Update r only if lsb is 1 (odd exponent)
      r = lsb ? rx : r
      x = (x * x) % n.value // Square
    }
    return new BigIntNative(r)
  }

  /**
   * Compute the inverse of this value modulo n
   * Note: this and and n must be relatively prime
   * @param {BigIntNative} n - Modulo
   * @returns {BigIntNative} x such that this*x = 1 mod n
   * @throws {Error} if the inverse does not exist
   */
  modInv(n: BigIntNative) {
    const _n = n.value
    const { gcd, x } = this.__egcd(_n)
    if (gcd !== BigInt(1)) {
      throw new Error('Inverse does not exist')
    }

    return new BigIntNative((x + _n) % _n)
  }

  __egcd(b: bigint) {
    let x = BigInt(0)
    let y = BigInt(1)
    let xPrev = BigInt(1)
    let yPrev = BigInt(0)
    let a = this.value
    while (b !== BigInt(0)) {
      const q = a / b
      let tmp = x
      x = xPrev - q * x
      xPrev = tmp

      tmp = y
      y = yPrev - q * y
      yPrev = tmp

      tmp = b
      b = a % b
      a = tmp
    }
    return {
      x: xPrev,
      y: yPrev,
      gcd: a,
    }
  }

  /**
   * Extended Eucleadian algorithm (http://anh.cs.luc.edu/331/notes/xgcd.pdf)
   * Given a = this and b, compute (x, y) such that ax + by = gdc(a, b)
   * @param {BigIntNative} b - Second operand
   * @returns {{ gcd, x, y: BigIntNative }}
   */
  _egcd(b: any) {
    const { x, y, gcd } = this.__egcd(b.value)

    return {
      x: new BigIntNative(x),
      y: new BigIntNative(y),
      gcd: new BigIntNative(gcd),
    }
  }

  /**
   * Compute greatest common divisor between this and n
   * @param {BigIntNative} b - Operand
   * @returns {BigIntNative} gcd
   */
  gcd(b: any) {
    let a = this.value
    b = b.value as any
    while (b !== BigInt(0)) {
      const tmp = b
      b = a % b
      a = tmp
    }
    return new BigIntNative(a)
  }

  /**
   * Shift this to the left by x, in place
   * @param {BigIntNative} x - Shift value
   */
  ileftShift(x: BigIntNative) {
    this.value <<= x.value
    return this
  }

  /**
   * Shift this to the left by x
   * @param {BigIntNative} x - Shift value
   * @returns {BigIntNative} this << x.
   */
  leftShift(x: BigIntNative) {
    return this.clone().ileftShift(x)
  }

  /**
   * Shift this to the right by x, in place
   * @param {BigIntNative} x - Shift value
   */
  irightShift(x: BigIntNative) {
    this.value >>= x.value
    return this
  }

  /**
   * Shift this to the right by x
   * @param {BigIntNative} x - Shift value
   * @returns {BigIntNative} this >> x.
   */
  rightShift(x: BigIntNative) {
    return this.clone().irightShift(x)
  }

  /**
   * Whether this value is equal to x
   * @param {BigIntNative} x
   * @returns {Boolean}
   */
  equal(x: BigIntNative) {
    return this.value === x.value
  }

  /**
   * Whether this value is less than x
   * @param {BigIntNative} x
   * @returns {Boolean}
   */
  lt(x: BigIntNative) {
    return this.value < x.value
  }

  /**
   * Whether this value is less than or equal to x
   * @param {BigIntNative} x
   * @returns {Boolean}
   */
  lte(x: BigIntNative) {
    return this.value <= x.value
  }

  /**
   * Whether this value is greater than x
   * @param {BigIntNative} x
   * @returns {Boolean}
   */
  gt(x: BigIntNative) {
    return this.value > x.value
  }

  /**
   * Whether this value is greater than or equal to x
   * @param {BigIntNative} x
   * @returns {Boolean}
   */
  gte(x: BigIntNative) {
    return this.value >= x.value
  }

  isZero() {
    return this.value === BigInt(0)
  }

  isOne() {
    return this.value === BigInt(1)
  }

  isNegative() {
    return this.value < BigInt(0)
  }

  isEven() {
    return !(this.value & BigInt(1))
  }

  abs() {
    const res = this.clone()
    if (this.isNegative()) {
      res.value = -res.value
    }

    return res
  }

  /**
   * Get this value as a string
   * @returns {String} this value.
   */
  toString() {
    return this.value.toString()
  }

  /**
   * Get this value as an exact Number (max 53 bits)
   * Fails if this value is too large
   * @returns {Number}
   */
  toNumber() {
    const number = Number(this.value)
    if (number > Number.MAX_SAFE_INTEGER) {
      // We throw and error to conform with the bn.js implementation
      throw new Error('Number can only safely store up to 53 bits')
    }

    return number
  }

  /**
   * Get value of i-th bit
   * @param {Number} i - Bit index
   * @returns {Number} Bit value.
   */
  getBit(i: number) {
    const bit = (this.value >> BigInt(i)) & BigInt(1)
    return bit === BigInt(0) ? 0 : 1
  }

  /**
   * Compute bit length
   * @returns {Number} Bit length.
   */
  bitLength() {
    const zero = BigInt(0)
    const one = BigInt(1)
    const negOne = BigInt(-1)

    // -1n >> -1n is -1n
    // 1n >> 1n is 0n
    const target = this.value < 0 ? negOne : zero
    let result = 1
    let tmp = this.value
    while ((tmp >>= one) !== target) {
      result++
    }

    return result
  }

  /**
   * Compute byte length
   * @returns {Number} Byte length.
   */
  byteLength() {
    const zero = new BigIntNative(0)
    const negOne = new BigIntNative(-1)

    const target = this.isNegative() ? negOne : zero
    const eight = new BigIntNative(8)
    let len = 1
    const tmp = this.clone()
    while (!tmp.irightShift(eight).equal(target)) {
      len++
    }

    return len
  }

  /**
   * Get Uint8Array representation of this number
   * @param {String} endian - Endianess of output array (defaults to 'be')
   * @param {Number} length - Of output array
   * @returns {Uint8Array}
   */
  toUint8Array(endian = 'be', length?: number) {
    // we get and parse the hex string (https://coolaj86.com/articles/convert-js-bigints-to-typedarrays/)
    // this is faster than shift+mod iterations
    let hex = this.value.toString(16)
    if (hex.length % 2 === 1) {
      hex = `0${hex}`
    }

    const rawLength = hex.length / 2
    const bytes = new Uint8Array(length || rawLength)
    // parse hex
    const offset = length ? length - rawLength : 0
    let i = 0
    while (i < rawLength) {
      bytes[i + offset] = parseInt(hex.slice(2 * i, 2 * i + 2), 16)
      i++
    }

    if (endian !== 'be') {
      bytes.reverse()
    }

    return bytes
  }
}
