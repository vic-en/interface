/* eslint-disable max-lines */
import { Currency, NativeCurrency, Token, UNI_ADDRESSES, WETH9 } from '@unifinance/sdk-core'
import invariant from 'tiny-invariant'
import { UniverseChainId } from 'uniswap/src/features/chains/types'
import { BigNumber } from '@ethersproject/bignumber'

export const USDC_WONDER = new Token(
  UniverseChainId.Wonder,
  '0x5B3a8e694765Ef08304034ce2283aE31684ba6C2',
  6,
  'USDC',
  'USD Coin',
)

// export const DAI = new Token(
//   UniverseChainId.Mainnet,
//   '0x6B175474E89094C44Da98b954EedeAC495271d0F',
//   18,
//   'DAI',
//   'Dai Stablecoin',
// )

// export const USDT = new Token(
//   UniverseChainId.Mainnet,
//   '0xdAC17F958D2ee523a2206206994597C13D831ec7',
//   6,
//   'USDT',
//   'Tether USD',
// )

// export const USDC_MAINNET = new Token(
//   UniverseChainId.Mainnet,
//   '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
//   6,
//   'USDC',
//   'USD Coin',
// )

// export const USDC = new Token(
//   UniverseChainId.Mainnet,
//   '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
//   6,
//   'USDC',
//   'USD Coin',
// )

// export const WBTC = new Token(
//   UniverseChainId.Mainnet,
//   '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
//   8,
//   'WBTC',
//   'Wrapped BTC',
// )

// export const MATIC_MAINNET = new Token(
//   UniverseChainId.Mainnet,
//   '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
//   18,
//   'MATIC',
//   'Polygon Matic',
// )

// export const UNI = {
//   [UniverseChainId.Mainnet]: new Token(
//     UniverseChainId.Mainnet,
//     UNI_ADDRESSES[UniverseChainId.Mainnet] as string,
//     18,
//     'UNI',
//     'Uniswap',
//   ),
// }

// export const LDO = new Token(
//   UniverseChainId.Mainnet,
//   '0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32',
//   18,
//   'LDO',
//   'Lido DAO Token',
// )
// export const NMR = new Token(
//   UniverseChainId.Mainnet,
//   '0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671',
//   18,
//   'NMR',
//   'Numeraire',
// )
// export const MNW = new Token(
//   UniverseChainId.Mainnet,
//   '0xd3E4Ba569045546D09CF021ECC5dFe42b1d7f6E4',
//   18,
//   'MNW',
//   'Morpheus.Network',
// )

export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token } = {
  ...(WETH9 as Record<UniverseChainId, Token>),
  [UniverseChainId.Wonder]: new Token(
    UniverseChainId.Wonder,
    '0x1E347256309B4764EDD8d7Bdf4aa4ecB62B58320',
    18,
    'WETH',
    'Wrapped Ether',
  ),
}

class ExtendedEther extends NativeCurrency {
  public get wrapped(): Token {
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    if (wrapped) {
      return wrapped
    }
    throw new Error(`Unsupported chain ID: ${this.chainId}`)
  }

  protected constructor(chainId: number) {
    super(chainId, 18, 'ETH', 'Ethereum')
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } = {}

  public static onChain(chainId: number): ExtendedEther {
    return this._cachedExtendedEther[chainId] ?? (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency | Token } = {}
export function nativeOnChain(chainId: number): NativeCurrency | Token {
  if (cachedNativeCurrency[chainId]) {
    return cachedNativeCurrency[chainId] as NativeCurrency
  }
  let nativeCurrency: NativeCurrency | Token
  nativeCurrency = ExtendedEther.onChain(chainId)
  return (cachedNativeCurrency[chainId] = nativeCurrency)
}
