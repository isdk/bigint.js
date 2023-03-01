// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { BN } from '../src/bn'
import { BigIntNative } from '../src/native'

describe('BigInteger', () => {
  it('should umod', () => {
    const sBigInt = '-7'
    const bn = new BN(sBigInt)
    const nativeBN = new BigIntNative(sBigInt)
    const rBN = bn.umod(new BN(3))
    const rNative = nativeBN.umod(new BigIntNative(3))
    expect(rBN.toString()).toEqual(rNative.toString())
    expect(rBN.toString()).toEqual('2')
  })
  it('should mod', () => {
    const sBigInt = '-7'
    const bn = new BN(sBigInt)
    const nativeBN = new BigIntNative(sBigInt)
    const rBN = bn.mod(new BN(3))
    const rNative = nativeBN.mod(new BigIntNative(3))
    expect(rBN.toString()).toEqual(rNative.toString())
    expect(rBN.toString()).toEqual('-1')
  })
  it('should convert string to bigint', () => {
    let sBigInt = '0b1010'
    let bn = new BN(sBigInt)
    let nativeBN = new BigIntNative(sBigInt)
    expect(bn.toString()).toBe('10')
    expect(nativeBN.toString()).toBe('10')
    sBigInt = '0xF0F0F0'
    bn = new BN(sBigInt)
    nativeBN = new BigIntNative(sBigInt)
    expect(bn.toString()).toBe('15790320')
    expect(nativeBN.toString()).toBe('15790320')
    sBigInt = '0o742130'
    bn = new BN(sBigInt)
    nativeBN = new BigIntNative(sBigInt)
    expect(bn.toString()).toBe('246872')
    expect(nativeBN.toString()).toBe('246872')
  })
  it('should bitLength', () => {
    const sBigInt = '-129702930990239203992093290290230923923'
    const bn = new BN(sBigInt)
    const nativeBN = new BigIntNative(sBigInt)
    const bitLen = bn.bitLength()
    expect(bitLen).toStrictEqual(nativeBN.bitLength())
    expect(nativeBN.toString()).toStrictEqual(sBigInt)
  })
  it('should getBit', () => {
    const sBigInt = '0b10100011110011010111'
    const bn = new BN(sBigInt)
    const nativeBN = new BigIntNative(sBigInt)
    const bitLen = bn.bitLength()
    expect(bitLen).toBe(nativeBN.bitLength())
    for (let i = 0; i < bitLen; i++) {
      expect(bn.getBit(i)).toStrictEqual(nativeBN.getBit(i))
    }

    expect(bn.byteLength()).toStrictEqual(nativeBN.byteLength())
  })
  it('should toUint8Array', () => {
    const sBigInt = '12345678901234567890'
    const bn = new BN(sBigInt)
    const nativeBN = new BigIntNative(sBigInt)
    const uint8Array = bn.toUint8Array()
    const nativeUint8Array = nativeBN.toUint8Array()
    expect(uint8Array).toEqual(nativeUint8Array)
  })
  it('should inc 1', () => {
    const sBigInt = '12345678901234567890'
    const sResult = '12345678901234567891'
    const bn = new BN(sBigInt)
    const nativeBN = new BigIntNative(sBigInt)
    expect(bn.inc().toString()).toEqual(sResult)
    expect(nativeBN.inc().toString()).toEqual(sResult)
  })
  it('should inc n', () => {
    const sBigInt = '12345678901234567890'
    const sResult = '12345678901234567898'
    const bn = new BN(sBigInt)
    const nativeBN = new BigIntNative(sBigInt)
    expect(bn.inc(8).toString()).toEqual(sResult)
    expect(nativeBN.inc(8).toString()).toEqual(sResult)
  })
  it('should dec 1', () => {
    const sBigInt = '12345678901234567891'
    const sResult = '12345678901234567890'
    const bn = new BN(sBigInt)
    const nativeBN = new BigIntNative(sBigInt)
    expect(bn.dec().toString()).toEqual(sResult)
    expect(nativeBN.dec().toString()).toEqual(sResult)
  })
  it('should dec n', () => {
    const sBigInt = '12345678901234567897'
    const sResult = '12345678901234567890'
    const bn = new BN(sBigInt)
    const nativeBN = new BigIntNative(sBigInt)
    expect(bn.dec(7).toString()).toEqual(sResult)
    expect(nativeBN.dec(7).toString()).toEqual(sResult)
  })
})
