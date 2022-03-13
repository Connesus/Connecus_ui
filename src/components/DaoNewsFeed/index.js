import React, {useState, useEffect} from 'react'
import './style.css'
import PollingProposal from '@component/PollingProposal'
import DonateProposal from '@component/DonateProposal'

export default function DaoNewsFeed() {
    
    return (
        <>
        <div className="dao-news-feed">
            <PollingProposal />
            <DonateProposal />
        </div>
        </>
    )
}