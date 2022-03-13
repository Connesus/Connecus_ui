import React, {useState, useEffect} from 'react'
import hearts from '@assets/hearts.png'

import './style.css'

export default function BountyCard() {
    
    return (
        <>
        <div className="bounty-card">
            <div className="token-name">
                Connecus
            </div>
            <div className="token-logo">
                <img src={hearts} alt="" />
            </div>
            <div className="token-account-id">
                connecus.testnet
            </div>
            <div className="token-amount">
                <div>You can claim</div>
                <div>200 Connecus</div>
            </div>
            <div className="claim-button">
                <button type="button" className="btn btn-warning">
                    Claim
                </button>
            </div>
            <div className="token-claim-status">
                Opening, expired at 8:30 15/3/2022
            </div>
        </div>
        </>
    )
}