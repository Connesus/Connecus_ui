import React, {useState, useEffect} from "react";
import getConfig from '@config'
const { contractName } = getConfig(process.env.NODE_ENV || 'development')
import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'

const FT_TOKEN_CONTRACT = "connecus-token.manhndev.testnet"

export default function useFtContract(accountId) {
    const [contract, setContract] = useState(null)

    const initContract = async () => {
        const contract = await new Contract(window.walletConnection.account(), FT_TOKEN_CONTRACT, {
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
        setContract(contract)
    }

    useEffect(() => {
        if (window.walletConnection.account()) {
            initContract()
        }
    }, [])

    return {
        contract,
    }
}