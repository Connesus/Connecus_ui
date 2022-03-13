import React, {useState, useEffect} from 'react'
import './style.css'
import BountyCard from '@component/BuontyCard'

export default function DaoBounties() {
    return (
        <>
        <div className="dao-bounties">
            <div className="dao-bounties-header mt-5">
                Claim your bounties
            </div>
            <div className="dao-bounties-list d-flex flex-wrap justify-content-between">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(element => {
                    return <BountyCard key={element}/>
                })}
            </div>
        </div>
        </>
    )
}