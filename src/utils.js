import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import getConfig from './config'

const nearConfig = getConfig(process.env.NODE_ENV || 'development')

// Initialize contract & set global variables
export async function initContract() {
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near)

  window.accountId = window.walletConnection.getAccountId()
  window.account = window.walletConnection.account();

  const {tokenContract, factoryContract} = nearConfig

  window.FtContract = await new Contract(window.walletConnection.account(), tokenContract, {
    viewMethods: [
      'ft_balance_of',
      'ft_total_supply',
      'storage_balance_of'
    ],
    changeMethods: [
        'storage_deposit',
        'ft_transfer',
        'ft_transfer_call',
    ],
  })

  window.FactoryContract = await new Contract(window.walletConnection.account(), factoryContract, {
    viewMethods: [
      'get_min_attached_balance',
      'get_required_deposit',
      'get_number_of_daos',
      'get_daos',
      'get_dao',

    ],
    changeMethods: [
        'storage_deposit',
        'create_dao',
    ],
  })
}

export function logout() {
  window.walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName)
}
