import React, { useState, useEffect } from "react";
import './style.css'
import Donate from '@component/Donate'
import ProposalHeader from '@component/ProposalHeader'
import ProposalAction from '@component/ProposalAction'

export default function DonateProposal({proposal, metadata}) {

    const {description, duration, id, total_donations, submission_time} = proposal

    return (
        <>
            <div className="proposal mt-4">
                <ProposalHeader metadata={metadata} created_at={submission_time}/>
                <div className="proposal-description">
                    {description}
                </div>
                <div className="proposal-kind">
                    <Donate 
                        proposal={proposal}
                    />
                </div>
                {/* <ProposalAction /> */}
            </div>
            
        </>
    )
}