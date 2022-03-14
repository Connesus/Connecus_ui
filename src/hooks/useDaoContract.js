import React, {useState, useEffect} from "react";
import getConfig from '@config'
const { contractName } = getConfig(process.env.NODE_ENV || 'development')
import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import { useParams } from 'react-router-dom'

export default function useDaoContract() {
    const [contract, setContract] = useState(null)
    const {id} = useParams()

    const daoContractId = `${id.toLowerCase()}.${window.FactoryContract.contractId}`

    const initContract = async () => {
        const contract = await new Contract(window.walletConnection.account(), daoContractId, {
            viewMethods: [
                'version',
                'get_metadata',
                'token_account',
                'get_locked_storage_amount',
                'get_available_amount',
                'delegation_total_supply',
                'delegation_balance_of',
                'delegation_balance_ratio',
                'get_last_proposal_id',
                'get_proposals',
                'get_proposal',
                'get_proposal_donation',
                'get_bounties',
                'get_bounty',
                'get_owner'
            ],
            changeMethods: [
                'add_proposal',
                'act_proposal',
                'with_draw_bounty_rest',
                'claim_bounty',
                'register_delegation',
                'withdraw',
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
        daoContractId,
        contract,
    }
}
