import BigInteger from './native'
export * from './IBigint'

const detectBigInt = () => typeof BigInt !== 'undefined'

async function getBigInteger() {
  if (detectBigInt()) {
    return BigInteger
  } else {
    const { default: BigInteger } = await import('./bn')
    return BigInteger
  }
}

export { getBigInteger }
