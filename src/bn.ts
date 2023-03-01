import BNum from 'bn.js'

/**
 * The Big Integer implementation of basic operations
 * Extends the bn.js library (wwww.github.com/indutny/bn.js)
 */

BNum.prototype.equal = BNum.prototype.eq
BNum.prototype.isNegative = BNum.prototype.isNeg

BNum.prototype.iinc = function (n = 1) {
  return this.iaddn(n)
}
BNum.prototype.idec = function (n = 1) {
  return this.isubn(n)
}

BNum.prototype.imod = function (b: BNum) {
  const result = this.mod(b)
  result.copy(this)
  return this
}

BNum.prototype.iumod = function (b: BNum) {
  const result = this.umod(b)
  result.copy(this)
  return this
}

BNum.prototype.inc = function (n = 1) {
  return this.addn(n)
}
BNum.prototype.dec = function (n = 1) {
  return this.subn(n)
}

BNum.prototype.modExp = function (e: BNum, n: BNum) {
  // We use either Montgomery or normal reduction context
  // Montgomery requires coprime n and R (montogmery multiplier)
  //  bn.js picks R as power of 2, so n must be odd
  const nRed = n.isEven() ? BNum.red(n) : BNum.mont(n)
  const result = this.toRed(nRed).redPow(e).fromRed()
  return result
}

BNum.prototype.modInv = function (n: BNum) {
  // invm returns a wrong result if the inverse does not exist
  if (!this.gcd(n).isOne()) {
    throw new Error('Inverse does not exist')
  }

  return this.invm(n)
}

BNum.prototype.isOne = function () {
  return this.eqn(1)
}

BNum.prototype.ileftShift = function (x: number | BNum) {
  if (BNum.isBN(x)) {
    x = x.toNumber()
  }
  this.ishln(x)
  return this
}

BNum.prototype.leftShift = function (x: number | BNum) {
  if (BNum.isBN(x)) {
    x = x.toNumber()
  }
  return this.shln(x)
}

BNum.prototype.irightShift = function (x: number | BNum) {
  if (BNum.isBN(x)) {
    x = x.toNumber()
  }
  this.ishrn(x)
  return this
}

BNum.prototype.rightShift = function (x: number | BNum) {
  if (BNum.isBN(x)) {
    x = x.toNumber()
  }
  return this.shrn(x)
}

BNum.prototype.getBit = function (i: number) {
  return this.testn(i) ? 1 : 0
}

BNum.prototype.toUint8Array = function (
  endian: 'be' | 'le' = 'be',
  length: number
) {
  return this.toArrayLike(Uint8Array as any, endian, length)
}

export class BN extends BNum {
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
