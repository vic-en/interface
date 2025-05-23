/* eslint-disable max-lines */
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { CurrencyAmount, ChainId as UniswapSDKChainId } from '@uniswap/sdk-core/'
import {
  ETHEREUM_LOGO,
  ETH_LOGO,
  UNICHAIN_LOGO,
} from 'ui/src/assets'
import { config } from 'uniswap/src/config'
import {
  // DAI,
  // USDC,
  USDC_WONDER,
  // USDT,
} from 'uniswap/src/constants/tokens'
import { Chain as BackendChainId } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks'
import {
  GqlChainId,
  NetworkLayer,
  RPCType,
  RetryOptions,
  UniverseChainId,
  UniverseChainInfo,
} from 'uniswap/src/features/chains/types'
import { ElementName } from 'uniswap/src/features/telemetry/constants'
import { isPlaywrightEnv } from 'utilities/src/environment/env'
import { isInterface } from 'utilities/src/platform'
import { ONE_MINUTE_MS } from 'utilities/src/time/time'
import {
  mainnet,
} from 'wagmi/chains'

const LOCAL_MAINNET_PLAYWRIGHT_RPC_URL = 'http://127.0.0.1:8545'
const LOCAL_BASE_PLAYWRIGHT_RPC_URL = 'http://127.0.0.1:8546'

/** Address that represents native currencies on ETH, Arbitrum, etc. */
export const DEFAULT_NATIVE_ADDRESS_LEGACY = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
export const DEFAULT_NATIVE_ADDRESS = '0x0000000000000000000000000000000000000000'
export const DEFAULT_RETRY_OPTIONS: RetryOptions = { n: 10, minWait: 250, maxWait: 1000 }

export const DEFAULT_MS_BEFORE_WARNING = ONE_MINUTE_MS * 10

export function getChainInfo(chainId: UniverseChainId): UniverseChainInfo {
  console.log('Getting chain info for chainId:', chainId)
  const chainInfo = UNIVERSE_CHAIN_INFO[chainId]
  if (!chainInfo) {
    console.log(`Chain info not found for chainId: ${chainId}`)
    return UNIVERSE_CHAIN_INFO[UniverseChainId.Wonder]
  }
  return chainInfo
}

// Source: https://marketplace.quicknode.com/chains_and_networks
export function getQuicknodeChainId(chainId: UniverseChainId): string {
  switch (chainId) {
    case UniverseChainId.Wonder:
      return ''
    default:
      throw new Error(`Chain ${chainId} does not have a corresponding QuickNode chain ID`)
  }
}

// If chain requires a path suffix
export function getQuicknodeChainIdPathSuffix(chainId: UniverseChainId): string {
  switch (chainId) {
    default:
      return ''
  }
}

export function getQuicknodeEndpointUrl(chainId: UniverseChainId): string {
  const quicknodeChainId = getQuicknodeChainId(chainId)

  return `https://${config.quicknodeEndpointName}${quicknodeChainId ? `.${quicknodeChainId}` : ''}.quiknode.pro/${config.quicknodeEndpointToken}${getQuicknodeChainIdPathSuffix(chainId)}`
}

function getPlaywrightRpcUrls(url: string): { [key in RPCType]: { http: string[] } } {
  return {
    [RPCType.Public]: { http: [url] },
    [RPCType.Default]: { http: [url] },
    [RPCType.Fallback]: { http: [url] },
    [RPCType.Interface]: { http: [url] },
    [RPCType.Private]: { http: [url] },
    [RPCType.PublicAlt]: { http: [url] },
  }
}

export const UNIVERSE_CHAIN_INFO: Record<UniverseChainId, UniverseChainInfo> = {
  // [UniverseChainId.Mainnet]: {
  //   ...mainnet,
  //   id: UniverseChainId.Mainnet,
  //   sdkId: UniswapSDKChainId.MAINNET,
  //   assetRepoNetworkName: 'ethereum',
  //   backendChain: {
  //     chain: BackendChainId.Ethereum as GqlChainId,
  //     backendSupported: true,
  //     isSecondaryChain: false,
  //     nativeTokenBackendAddress: undefined,
  //   },
  //   blockPerMainnetEpochForChainId: 1,
  //   blockWaitMsBeforeWarning: isInterface ? DEFAULT_MS_BEFORE_WARNING : ONE_MINUTE_MS,
  //   bridge: undefined,
  //   docs: 'https://docs.uniswap.org/',
  //   elementName: ElementName.ChainEthereum,
  //   explorer: {
  //     name: 'Etherscan',
  //     url: 'https://etherscan.io/',
  //     apiURL: 'https://api.etherscan.io',
  //   },
  //   helpCenterUrl: undefined,
  //   infoLink: 'https://app.uniswap.org/explore',
  //   infuraPrefix: 'mainnet',
  //   interfaceName: 'mainnet',
  //   label: 'Ethereum',
  //   logo: ETHEREUM_LOGO,
  //   nativeCurrency: {
  //     name: 'Ethereum',
  //     symbol: 'ETH',
  //     decimals: 18,
  //     address: DEFAULT_NATIVE_ADDRESS_LEGACY,
  //     explorerLink: 'https://etherscan.io/chart/etherprice',
  //     logo: ETH_LOGO,
  //   },
  //   networkLayer: NetworkLayer.L1,
  //   pendingTransactionsRetryOptions: undefined,
  //   rpcUrls: isPlaywrightEnv()
  //     ? getPlaywrightRpcUrls(LOCAL_MAINNET_PLAYWRIGHT_RPC_URL)
  //     : {
  //         [RPCType.Private]: {
  //           http: ['https://rpc.mevblocker.io/?referrer=uniswapwallet'],
  //         },
  //         [RPCType.Public]: {
  //           http: [getQuicknodeEndpointUrl(UniverseChainId.Mainnet)],
  //         },
  //         [RPCType.Default]: {
  //           http: [getQuicknodeEndpointUrl(UniverseChainId.Mainnet)],
  //         },
  //         [RPCType.Fallback]: {
  //           http: ['https://rpc.ankr.com/eth', 'https://eth-mainnet.public.blastapi.io'],
  //         },
  //         [RPCType.Interface]: {
  //           http: [
  //             `https://mainnet.infura.io/v3/${config.infuraKey}`,
  //             getQuicknodeEndpointUrl(UniverseChainId.Mainnet),
  //           ],
  //         },
  //       },
  //   urlParam: 'ethereum',
  //   statusPage: undefined,
  //   spotPriceStablecoinAmount: CurrencyAmount.fromRawAmount(USDC, 100_000e6),
  //   stablecoins: [USDC, DAI, USDT],
  //   supportsInterfaceClientSideRouting: true,
  //   supportsGasEstimates: true,
  //   supportsV4: true,
  //   wrappedNativeCurrency: {
  //     name: 'Wrapped Ether',
  //     symbol: 'WETH',
  //     decimals: 18,
  //     address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  //   },
  // } as const satisfies UniverseChainInfo,
  [UniverseChainId.Wonder]: {
    // ...Wonder, // TODO update once available from viem
    name: 'Wonder',
    id: UniverseChainId.Wonder,
    sdkId: UniswapSDKChainId.WONDER,
    assetRepoNetworkName: 'wonder',
    backendChain: {
      chain: BackendChainId.Wonder as GqlChainId,
      backendSupported: false,
      isSecondaryChain: false,
      nativeTokenBackendAddress: undefined,
    },
    blockPerMainnetEpochForChainId: 9637,
    blockWaitMsBeforeWarning: undefined,
    bridge: 'https://portal.wonderchain.org/bridge',
    docs: 'https://docs.wonderchain.org',
    elementName: ElementName.ChainUnichain,
    explorer: {
      name: 'Wonder Explorer',
      url: 'https://explorer.mainnet.wonderchain.org/',
    },
    helpCenterUrl: undefined,
    infoLink: 'https://app.uniswap.org/explore/tokens/wonder',
    infuraPrefix: 'wonder',
    interfaceName: 'wonder',
    label: 'Wonder',
    logo: UNICHAIN_LOGO,
    nativeCurrency: {
      name: 'Wonder ETH',
      symbol: 'ETH',
      decimals: 18,
      address: '0x000000000000000000000000000000000000800A',
      logo: ETHEREUM_LOGO,
    },
    networkLayer: NetworkLayer.L2,
    pendingTransactionsRetryOptions: undefined,
    rpcUrls: {
      [RPCType.Public]: { http: ['https://rpc.mainnet.wonderchain.org'] },
      [RPCType.Default]: { http: ['https://rpc.mainnet.wonderchain.org'] },
      [RPCType.Interface]: { http: ['https://rpc.mainnet.wonderchain.org'] },
    },
    spotPriceStablecoinAmount: CurrencyAmount.fromRawAmount(USDC_WONDER, 10_000e6),
    stablecoins: [USDC_WONDER],
    statusPage: undefined,
    supportsInterfaceClientSideRouting: false,
    supportsGasEstimates: false,
    supportsV4: false,
    urlParam: 'wonder',
    wrappedNativeCurrency: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      address: '0x000000000000000000000000000000000000800A',
    },
  } as const satisfies UniverseChainInfo,
}
// Add this after UNIVERSE_CHAIN_INFO definition
const allChainIds = Object.values(UniverseChainId).filter(x => typeof x === 'number')
const missingChainIds = allChainIds.filter(id => !UNIVERSE_CHAIN_INFO[id as UniverseChainId])
if (missingChainIds.length > 0) {
  console.warn('Missing chain info for chains:', missingChainIds)
}
export const GQL_MAINNET_CHAINS = Object.values(UNIVERSE_CHAIN_INFO)
  .filter((chain) => !chain.testnet && !chain.backendChain.isSecondaryChain)
  .map((chain) => chain.backendChain.chain)
  .filter((backendChain) => !!backendChain)

export const GQL_TESTNET_CHAINS = Object.values(UNIVERSE_CHAIN_INFO)
  .filter((chain) => chain.testnet && !chain.backendChain.isSecondaryChain)
  .map((chain) => chain.backendChain.chain)
  .filter((backendChain) => !!backendChain)

export const ALL_GQL_CHAINS: GqlChainId[] = [...GQL_MAINNET_CHAINS, ...GQL_TESTNET_CHAINS]
