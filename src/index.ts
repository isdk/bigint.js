import BigInteger from './native'
import type { IBigInt } from './IBigint'
export * from './IBigint'

const detectBigInt = () => typeof BigInt !== 'undefined'

async function getBigInteger() {
  if (detectBigInt()) {
    return BigInteger as unknown as IBigInt
  } else {
    const { default: BigInteger } = await import('./bn')
    return BigInteger as unknown as IBigInt
  }
}

export { getBigInteger }
