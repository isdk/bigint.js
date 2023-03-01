export * from './native'
export * from './IBigint'
export * from './bn'

import { BigIntNative } from './native'
import { BN } from './bn'
import type { IBigInt } from './IBigint'

/**
 * detect whether the native BigInt implementation exists
 */
export function detectBigInt() {
  return typeof BigInt !== 'undefined'
}

/**
 * return the native or pure js BigInt Class base on the platform
 * @returns the IBigInt Class
 */
export async function getBigInteger() {
  if (detectBigInt()) {
    return BigIntNative as unknown as IBigInt
  } else {
    // const { default: BigInteger } = await import('./bn')
    return BN as unknown as IBigInt
  }
}
