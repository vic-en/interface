import { Token } from '@unifinance/sdk-core'
import {
  // DAI,
  // USDC_MAINNET,
  // USDT,
  // WBTC,
  WRAPPED_NATIVE_CURRENCY,
} from 'uniswap/src/constants/tokens'
// import { UniverseChainId } from 'uniswap/src/features/chains/types'

type ChainTokenList = {
  readonly [chainId: number]: Token[]
}

const WRAPPED_NATIVE_CURRENCIES_ONLY: ChainTokenList = Object.fromEntries(
  Object.entries(WRAPPED_NATIVE_CURRENCY)
    .map(([key, value]) => [key, [value]])
    .filter(Boolean),
)

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WRAPPED_NATIVE_CURRENCIES_ONLY,
  // [UniverseChainId.Mainnet]: [
  //   ...WRAPPED_NATIVE_CURRENCIES_ONLY[UniverseChainId.Mainnet],
  //   DAI,
  //   USDC_MAINNET,
  //   USDT,
  //   WBTC,
  // ],
}

export const PINNED_PAIRS: { readonly [chainId: number]: [Token, Token][] } = {
  // [UniverseChainId.Mainnet]: [
  //   // [
  //   //   new Token(UniverseChainId.Mainnet, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'),
  //   //   new Token(UniverseChainId.Mainnet, '0x39AA39c021dfbaE8faC545936693aC917d5E7563', 8, 'cUSDC', 'Compound USD Coin'),
  //   // ],
  //   [USDC_MAINNET, USDT],
  //   [DAI, USDT],
  // ],
}
