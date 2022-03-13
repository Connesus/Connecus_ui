import React, {useState, useEffect} from 'react'
import hearts from '@assets/hearts.png'
import {timestampToDateTime} from '@utils/time.utils';
import useDaoContract from '@hooks/useDaoContract'

import './style.css'

export default function BountyCard({bounty, ftStorageBalance}) {

    const {contract: DaoContract} = useDaoContract()

    const {id, claim_amount, duration, start_time, token} = bounty

    const [claimable, setClaimable] = useState(false)
    const [claimTooltip, setClaimTooltip] = useState("")

    let expired = timestampToDateTime(duration, start_time);

    const claimHandler = async () => {
        DaoContract.claim_bounty({
            bounty_id: id
        })
    }

    useEffect(() => {
        let allowClaim = ftStorageBalance ? claim_amount > 0 : false
        setClaimTooltip(ftStorageBalance ? "" : "Deposit for token storage is required")
        setClaimable(allowClaim)
    }, [ftStorageBalance])
    
    return (
        <>
        <div className="bounty-card">
            <div className="token-name">
                {token.slice(0, -8)}
            </div>
            <div className="token-logo">
                <img src={hearts} alt="" />
            </div>
            <div className="token-account-id">
                {token}
            </div>
            <div className="token-amount">
                <div>You can claim</div>
                <div>{claim_amount} Connecus</div>
            </div>
            <div className="claim-button">
                <button 
                    type="button" 
                    className="btn btn-warning" 
                    disabled={!claimable} 
                    onClick={claimHandler}
                    data-bs-toggle="tooltip" 
                    data-bs-placement="top" 
                    title={claimTooltip}
                >
                    Claim
                </button>
            </div>
            <div className="token-claim-status">
                Opening, expired at {expired.toLocaleTimeString()} {expired.toLocaleDateString()}
            </div>
        </div>
        </>
    )
}