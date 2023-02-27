/**
 * The unified interface for Big Integer
 *
 * @remarks
 *
 * The operator method prefix
 *
 * * `i`: perform operation in-place, storing the result in the host object (on which the method was invoked). Might be used to avoid number allocation costs
 *
 * @example
 *
 * ```typescript
 * import BigInteger from '@isdk/bigint'
 * const a = new BigInteger(9)
 * const b = new BigInteger(6)
 * // perform addition on `a` and `b`, storing the result in `a`
 * a.iadd(b)
 * console.log(a.toString()) // prints "15"
 * ```
 */
export interface IBigInt {
  /**
   * return a new IBigInteger object with the same value
   */
  clone(): IBigInt

  /**
   * IBigInteger increment number n in place
   * @param n - (optional) Value to increment, defaults to 1
   */
  iinc(n?: number): this

  /**
   * IBigInteger decrement number n in place
   * @param n - (optional) Value to decrement, defaults to 1
   */
  idec(n?: number): this

  /**
   * IBigInteger addition in place
   * @param  x - Value to add
   */
  iadd(x: IBigInt): this

  /**
   * IBigInteger subtraction in place
   * @param x - Value to subtract
   */
  isub(x: IBigInt): this

  /**
   * IBigInteger multiplication in place
   * @param x - Value to multiply
   */
  imul(x: IBigInt): this

  /**
   * Compute value modulo m, in place
   * @param m - Modulo
   */
  imod(m: IBigInt): this

  /**
   * Shift this to the left by x, in place
   * @param x - Shift value
   */
  ileftShift(x: IBigInt): this

  /**
   * Shift this to the right by x, in place
   * @param x - Shift value
   */
  irightShift(x: this): this

  /**
   * IBigInteger increment
   * @param n - (optional) Value to increment, defaults to 1
   * @returns this + 1.
   */
  inc(n?: number): IBigInt

  /**
   * IBigInteger decrement
   * @param n - (optional) Value to decrement, defaults to 1
   * @returns  this - 1.
   */
  dec(n?: number): IBigInt

  /**
   * IBigInteger addition
   * @param  x - Value to add
   * @returns  this + x.
   */
  add(x: IBigInt): IBigInt

  /**
   * IBigInteger subtraction
   * @param  x - Value to subtract
   * @returns  this - x.
   */
  sub(x: IBigInt): IBigInt

  /**
   * IBigInteger multiplication
   * @param  x - Value to multiply
   * @returns  this * x.
   */
  mul(x: IBigInt): IBigInt

  /**
   * Compute value modulo m
   * @param  m - Modulo
   * @returns  this mod m.
   */
  mod(m: IBigInt): IBigInt

  /**
   * Compute modular exponentiation
   * Much faster than this.exp(e).mod(n)
   * @param  e - Exponent
   * @param  n - Modulo
   * @returns  this ** e mod n.
   */
  modExp(e: IBigInt, n: IBigInt): IBigInt

  /**
   * Compute the inverse of this value modulo n
   * Note: this and and n must be relatively prime
   * @param  n - Modulo
   * @returns x such that this*x = 1 mod n
   * @throws {Error} if the inverse does not exist
   */
  modInv(n: IBigInt): IBigInt

  /**
   * Compute greatest common divisor between this and n
   * @param  n - Operand
   * @returns  gcd
   */
  gcd(n: IBigInt): IBigInt

  /**
   * Shift this to the left by x
   * @param  x - Shift value
   * @returns  this << x.
   */
  leftShift(x: IBigInt): IBigInt

  /**
   * Shift this to the right by x
   * @param  x - Shift value
   * @returns  this >> x.
   */
  rightShift(x: IBigInt): IBigInt

  /**
   * Whether this value is equal to x
   * @param  x
   * @returns {Boolean}
   */
  equal(x: IBigInt): boolean

  /**
   * Whether this value is less than x
   * @param  x
   * @returns {Boolean}
   */
  lt(x: IBigInt): boolean

  /**
   * Whether this value is less than or equal to x
   * @param  x
   * @returns {Boolean}
   */
  lte(x: IBigInt): boolean

  /**
   * Whether this value is greater than x
   * @param  x
   * @returns {Boolean}
   */
  gt(x: IBigInt): boolean

  /**
   * Whether this value is greater than or equal to x
   * @param  x
   * @returns {Boolean}
   */
  gte(x: IBigInt): boolean

  isZero(): boolean
  isOne(): boolean
  isNegative(): boolean
  isEven(): boolean
  abs(): IBigInt

  /**
   * Get this value as a string
   * @returns {String} this value.
   */
  toString(): string

  /**
   * Get this value as an exact Number (max 53 bits)
   * Fails if this value is too large
   * @returns the number value
   */
  toNumber(): number

  /**
   * Get value of i-th bit
   * @param i - Bit index
   * @returns Bit value.
   */
  getBit(i: number): number

  /**
   * Compute bit length
   * @returns Bit length.
   */
  bitLength(): number

  /**
   * Compute byte length
   * @returns Byte length.
   */
  byteLength(): number

  /**
   * Get Uint8Array representation of this number
   * @param {"le"|"be"} endian - Endianess of output array (defaults to 'be')
   * @param length - Of output array
   * @returns {Uint8Array}
   */
  toUint8Array(endian?: string, length?: number): Uint8Array
}
