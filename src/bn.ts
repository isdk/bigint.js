import BN from 'bn.js'

/**
 * The Big Integer implementation of basic operations
 * Extends the bn.js library (wwww.github.com/indutny/bn.js)
 */

BN.prototype.equal = BN.prototype.eq
BN.prototype.isNegative = BN.prototype.isNeg

BN.prototype.iinc = function (n = 1) {
  return this.iaddn(n)
}
BN.prototype.idec = function (n = 1) {
  return this.isubn(n)
}

BN.prototype.imod = function (b: BN) {
  const result = this.mod(b)
  result.copy(this)
  return this
}

BN.prototype.iumod = function (b: BN) {
  const result = this.umod(b)
  result.copy(this)
  return this
}

BN.prototype.inc = function (n = 1) {
  return this.addn(n)
}
BN.prototype.dec = function (n = 1) {
  return this.subn(n)
}

BN.prototype.modExp = function (e: BN, n: BN) {
  // We use either Montgomery or normal reduction context
  // Montgomery requires coprime n and R (montogmery multiplier)
  //  bn.js picks R as power of 2, so n must be odd
  const nRed = n.isEven() ? BN.red(n) : BN.mont(n)
  const result = this.toRed(nRed).redPow(e).fromRed()
  return result
}

BN.prototype.modInv = function (n: BN) {
  // invm returns a wrong result if the inverse does not exist
  if (!this.gcd(n).isOne()) {
    throw new Error('Inverse does not exist')
  }

  return this.invm(n)
}

BN.prototype.isOne = function () {
  return this.eqn(1)
}

BN.prototype.ileftShift = function (x: number | BN) {
  if (BN.isBN(x)) {
    x = x.toNumber()
  }
  this.ishln(x)
  return this
}

BN.prototype.leftShift = function (x: number | BN) {
  if (BN.isBN(x)) {
    x = x.toNumber()
  }
  return this.shln(x)
}

BN.prototype.irightShift = function (x: number | BN) {
  if (BN.isBN(x)) {
    x = x.toNumber()
  }
  this.ishrn(x)
  return this
}

BN.prototype.rightShift = function (x: number | BN) {
  if (BN.isBN(x)) {
    x = x.toNumber()
  }
  return this.shrn(x)
}

BN.prototype.getBit = function (i: number) {
  return this.testn(i) ? 1 : 0
}

BN.prototype.toUint8Array = function (
  endian: 'be' | 'le' = 'be',
  length: number
) {
  return this.toArrayLike(Uint8Array as any, endian, length)
}

class BNEx extends BN {
  constructor(num: number | string | Uint8Array | boolean | null) {
    let base = 10
    switch (typeof num) {
      case 'string':
        num = num.trim()
        if (num.startsWith('0x')) {
          num = num.slice(2)
          base = 16
        } else if (num.startsWith('0o')) {
          num = num.slice(2)
          base = 8
        } else if (num.startsWith('0b')) {
          num = num.slice(2)
          base = 2
        }
        break
      case 'boolean':
        num = Number(num)
        break
      default:
        break
    }
    super(num, base)
  }
}

export default BNEx
